import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

/**
 * Linear interpolation function for smooth animations.
 * @param {number} a - Starting value
 * @param {number} b - Target value
 * @param {number} t - Interpolation factor (0-1)
 * @returns {number} Interpolated value between a and b
 */
function lerp(a, b, t) {
    // If values are very close, just return the target to avoid tiny animations
    if (Math.abs(a - b) < 0.1) return b;
    return a + (b - a) * t;
}

/**
 * Helper function to determine appropriate grid spacing
 */
function determineGridStep(range) {
    if (range <= 1) return 0.1;
    if (range <= 5) return 0.5;
    if (range <= 20) return 1;
    if (range <= 50) return 5;
    if (range <= 100) return 10;
    if (range <= 500) return 50;
    return 100;
}

/**
 * Main chart visualization component.
 * Handles rendering, animations, and user interactions.
 * Now optimized to only animate the newest candle.
 */
function CandlestickChart({ historicalCandles, currentCandle }) {
    // =================== REFS ===================
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const offscreenCanvasRef = useRef(null);
    const sidebarRef = useRef(null);
    const animationFrameRef = useRef(null);
    const wheelTimeoutRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const resizeObserverRef = useRef(null);
    const previousCurrentCandleRef = useRef(null);
    const dragStartX = useRef(0);
    const dragStartOffset = useRef(0);
    const isWheelActiveRef = useRef(false);
    const lastPriceLinePosition = useRef(null);
    const lastRenderedRef = useRef({
        scrollLeft: 0,
        width: 0,
        height: 0,
        xScale: 1,
        yScale: 1,
        data: null
    });
    const backgroundCanvasRef = useRef(null);
    const xOffsetRef = useRef(0);
    const lastProcessedIndex = useRef(0);

    // =================== STATE ===================
    // Store animated version of the newest candle
    const [animatedCurrentCandle, setAnimatedCurrentCandle] = useState(null);
    const [xScale, setXScale] = useState(1);
    const [yScale, setYScale] = useState(1);
    const [hoveredCandle, setHoveredCandle] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAtRightEdge, setIsAtRightEdge] = useState(true);

    // Use refs for values that shouldn't trigger re-renders when they change
    const isZoomingRef = useRef(false);
    const lastRenderedScrollPositionRef = useRef(0);
    const lastRenderedDimensionsRef = useRef({ width: 0, height: 0 });

    // Cache frequently used calculations
    const calculationCacheRef = useRef({
        priceRange: { min: 0, max: 0 },
        visibleCandles: { start: 0, end: 0 },
        candleDimensions: { width: 10, gap: 3 }
    });

    // Constants
    const CONSTANTS = {
        BOTTOM_PADDING: 20,
        MIN_CANDLE_WIDTH: 4,
        BASE_CANDLE_WIDTH: 10,
        BASE_GAP: 3,
        RIGHT_MARGIN: 60,
        HORIZONTAL_EXTRA: 60,
        CONTAINER_W: 2000, // These values are now just defaults
        CONTAINER_H: 800,  // and will adapt to parent size
        WHEEL_DEBOUNCE_MS: 100,
        SCROLL_DEBOUNCE_MS: 100,
        SIDEBAR_WIDTH: 60
    };

    // =================== COMPUTED VALUES ===================
    // Combine historical candles with animated current candle for rendering
    const combinedCandles = useMemo(() => {
        const result = [...historicalCandles];
        if (animatedCurrentCandle) {
            result.push(animatedCurrentCandle);
        }
        return result;
    }, [historicalCandles, animatedCurrentCandle]);

    function getMaxOffset(viewportW, candleCount, scale) {
        const slot = (CONSTANTS.BASE_CANDLE_WIDTH + CONSTANTS.BASE_GAP) * scale;
        const fullWidth =
            candleCount * slot + CONSTANTS.RIGHT_MARGIN + CONSTANTS.HORIZONTAL_EXTRA;

        return Math.max(0, fullWidth - viewportW);
    }

    // =================== MEMOIZED VALUES ===================
    // Memoize canvas dimensions
    const canvasDimensions = useMemo(() => {
        const totalC = combinedCandles.length;
        const scaledCandleWidth = Math.max(CONSTANTS.MIN_CANDLE_WIDTH, CONSTANTS.BASE_CANDLE_WIDTH * xScale);
        const scaledGap = CONSTANTS.BASE_GAP * xScale;
        const neededWidth = totalC * (scaledCandleWidth + scaledGap) +
            CONSTANTS.RIGHT_MARGIN + CONSTANTS.HORIZONTAL_EXTRA;

        // Update cache for future calculations
        calculationCacheRef.current.candleDimensions = {
            width: scaledCandleWidth,
            gap: scaledGap
        };

        return {
            width: Math.max(CONSTANTS.CONTAINER_W, neededWidth),
            height: CONSTANTS.CONTAINER_H
        };
    }, [combinedCandles.length, xScale]);

    // =================== UTILITY FUNCTIONS ===================
    // Create and get offscreen canvas for improved performance
    const getOffscreenCanvas = useCallback(() => {
        if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement('canvas');
        }

        const canvas = offscreenCanvasRef.current;
        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;

        return canvas;
    }, [canvasDimensions.width, canvasDimensions.height]);

    // Check if we're at the right edge of the chart
    const checkIfAtRightEdge = useCallback(() => {
        const container = containerRef.current;
        if (!container) return false;

        const scrollLeft = xOffsetRef.current;
        const visibleWidth = container.clientWidth;
        const totalWidth = canvasDimensions.width;

        // Consider "at right edge" if within 5% of the right edge (stricter threshold)
        return scrollLeft + visibleWidth >= totalWidth - visibleWidth * 0.05;
    }, [canvasDimensions.width]);

    // Helper function to draw a rounded rectangle
    const drawRoundedRect = useCallback((ctx, x, y, width, height, radius) => {
        // Validate all parameters are finite before drawing
        if (!isFinite(x) || !isFinite(y) || !isFinite(width) ||
            !isFinite(height) || !isFinite(radius)) {
            return; // Skip drawing if any parameter is invalid
        }

        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }, []);

    // Calculate visible candles based on scroll position
    const calculateVisibleCandles = useCallback(() => {
        const container = containerRef.current;
        if (!container || combinedCandles.length === 0) return { start: 0, end: 0 };

        const scrollLeft = xOffsetRef.current;
        const visibleWidth = container.clientWidth;
        const scrollRight = scrollLeft + visibleWidth;

        const { width: candleWidth, gap } =
            calculationCacheRef.current.candleDimensions;
        const slot = candleWidth + gap;

        // Increase the buffer based on zoom level to ensure candles don't disappear at edges
        const BUFFER = Math.max(20, Math.ceil(30 / xScale));

        const startIndex = Math.max(
            0,
            Math.floor(scrollLeft / slot) - BUFFER
        );
        const endIndex = Math.min(
            combinedCandles.length - 1,
            Math.ceil(scrollRight / slot) + BUFFER
        );

        return { start: startIndex, end: endIndex };
    }, [combinedCandles.length, xScale]);

    // Calculate price range for the currently visible candles
    const calculateVisiblePriceRange = useCallback(() => {
        if (combinedCandles.length === 0) return { min: 0, max: 0 };

        const { start, end } = calculateVisibleCandles();

        // If no visible candles, use all candles
        if (start > end) {
            const allPrices = combinedCandles.flatMap(c => [c.open, c.high, c.low, c.close]);
            return {
                min: Math.min(...allPrices),
                max: Math.max(...allPrices)
            };
        }

        // Get min/max prices from visible candles only
        const visibleCandles = combinedCandles.slice(start, end + 1);
        const highPrices = visibleCandles.map(c => c.high);
        const lowPrices = visibleCandles.map(c => c.low);

        const minPrice = Math.min(...lowPrices);
        const maxPrice = Math.max(...highPrices);

        // If all prices are the same, create a small range around it
        if (maxPrice === minPrice) {
            const padding = maxPrice * 0.02 || 2; // 2% range or 2 units if price is 0
            return {
                min: minPrice - padding,
                max: maxPrice + padding
            };
        }

        return { min: minPrice, max: maxPrice };
    }, [combinedCandles, calculateVisibleCandles]);

    // Optimized vertical scale calculation with throttling
    const calculateVerticalScale = useCallback(() => {
        if (combinedCandles.length === 0 || isZoomingRef.current) return;

        // Calculate price range for visible candles
        const { min: minPrice, max: maxPrice } = calculateVisiblePriceRange();
        const visiblePriceRange = maxPrice - minPrice;

        // Calculate usable chart height
        const containerHeight = containerRef.current?.clientHeight || CONSTANTS.CONTAINER_H;
        const usableHeight = containerHeight - 100; // Account for padding

        // Simple linear calculation - add 15% padding above and below
        const paddingFactor = 0.15;
        const totalPaddedRange = visiblePriceRange * (1 + paddingFactor * 2);

        // Base scale calculation - how many pixels per price unit
        let pixelsPerUnit;
        if (visiblePriceRange === 0) {
            pixelsPerUnit = 50;
        } else if (visiblePriceRange < 1) {
            pixelsPerUnit = 150;
        } else if (visiblePriceRange < 10) {
            pixelsPerUnit = 50;
        } else if (visiblePriceRange < 50) {
            pixelsPerUnit = 20;
        } else {
            pixelsPerUnit = 10;
        }

        // Calculate optimal scale with dampening to avoid jumps
        const optimalYScale = totalPaddedRange * pixelsPerUnit / usableHeight;
        const newYScale = yScale * 0.85 + optimalYScale * 0.15; // More dampening for smoother transitions

        // Apply change only if it's significant enough to avoid constant tiny updates
        if (Math.abs(newYScale - yScale) > 0.01) {
            setYScale(Math.max(0.05, Math.min(10, newYScale)));
        }
    }, [combinedCandles, calculateVisiblePriceRange, yScale]);

    // Update the sidebar
    const updateSidebar = useCallback(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !container || combinedCandles.length === 0) return;

        // Get or create sidebar element
        let sidebar = sidebarRef.current;
        if (!sidebar) {
            sidebar = document.createElement('div');
            sidebar.className = 'price-sidebar';
            sidebar.style.position = 'absolute';
            sidebar.style.top = '0';
            sidebar.style.width = `${CONSTANTS.SIDEBAR_WIDTH}px`;
            sidebar.style.height = '100%';
            sidebar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            sidebar.style.zIndex = '10';
            sidebar.style.pointerEvents = 'none';
            sidebar.style.transition = 'transform 0.05s ease-out';
            sidebar.style.backdropFilter = 'blur(2px)';

            sidebarRef.current = sidebar;
            container.appendChild(sidebar);
        }

        // Position sidebar at the right edge of visible area
        const rightPosition = container.clientWidth - CONSTANTS.SIDEBAR_WIDTH;
        sidebar.style.transform = `translateX(${rightPosition}px)`;

        // Get price range from cached values
        const { min: minPrice, max: maxPrice } = calculateVisiblePriceRange();

        const dataRange = maxPrice - minPrice;
        // Increase padding for better spacing
        const paddingAmount = dataRange * 0.15;

        const paddedMinPrice = minPrice - paddingAmount;
        const paddedMaxPrice = maxPrice + paddingAmount;

        const paddedRange = paddedMaxPrice - paddedMinPrice;
        const midPoint = (paddedMaxPrice + paddedMinPrice) / 2;

        const priceTop = midPoint + paddedRange / 2;
        const priceBot = midPoint - paddedRange / 2;

        // Create price labels using document fragment for better performance
        const fragment = document.createDocumentFragment();

        // Simple linear mapping function
        const topPadding = 50;
        const bottomPadding = 50;
        const usableHeight = canvas.height - (topPadding + bottomPadding);

        const priceToY = (p) => {
            return topPadding + usableHeight * (1 - ((p - priceBot) / (priceTop - priceBot)));
        };

        // Add price labels efficiently
        const gridStep = determineGridStep(priceTop - priceBot);
        let startPrice = Math.floor(priceBot / gridStep) * gridStep;

        // Clear previous content
        sidebar.innerHTML = '';

        // Only add visible labels
        for (let p = startPrice; p <= priceTop; p += gridStep) {
            const y = priceToY(p);

            // Skip if outside visible area
            if (y < 0 || y > canvas.height) continue;

            const priceLabel = document.createElement('div');
            priceLabel.style.position = 'absolute';
            priceLabel.style.left = '4px';
            priceLabel.style.top = `${y}px`;
            priceLabel.style.transform = 'translateY(-50%)';
            priceLabel.style.fontSize = '12px';
            priceLabel.style.color = '#333';
            priceLabel.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            priceLabel.style.padding = '2px 4px';
            priceLabel.style.borderRadius = '3px';
            priceLabel.textContent = p.toFixed(dataRange < 5 ? 2 : 1);

            fragment.appendChild(priceLabel);
        }

        // Add current price indicator if last candle exists
        if (combinedCandles.length > 0) {
            const currentCandleData = combinedCandles[combinedCandles.length - 1];
            const currentClose = currentCandleData.close;
            const currentPriceY = priceToY(currentClose);

            if (currentPriceY >= 0 && currentPriceY <= canvas.height) {
                const currentLabel = document.createElement('div');
                currentLabel.style.position = 'absolute';
                currentLabel.style.left = '2px';
                currentLabel.style.top = `${currentPriceY}px`;
                currentLabel.style.transform = 'translateY(-50%)';
                currentLabel.style.fontSize = '12px';
                currentLabel.style.fontWeight = 'bold';
                currentLabel.style.color = '#fff';
                currentLabel.style.backgroundColor = 'rgba(16, 185, 129, 0.9)';
                currentLabel.style.padding = '2px 5px';
                currentLabel.style.borderRadius = '3px';
                currentLabel.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';
                currentLabel.textContent = currentClose.toFixed(2);

                fragment.appendChild(currentLabel);
            }
        }

        // Add all elements at once
        sidebar.appendChild(fragment);
    }, [combinedCandles, calculateVisiblePriceRange]);

    // =================== DRAWING FUNCTIONS ===================
    // Main draw function optimized for performance
    const drawChart = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || combinedCandles.length === 0) return;

        // Get current dimensions and scroll position
        const container = containerRef.current;
        if (!container) return;

        const scrollLeft = xOffsetRef.current;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        // Skip redraw if nothing significant has changed
        const last = lastRenderedRef.current ?? {};
        const scrollDelta = Math.abs(scrollLeft - (last.scrollLeft ?? 0));
        const scaleChanged =
            xScale !== (last.xScale ?? xScale) || yScale !== (last.yScale ?? yScale);
        const dimensionsChanged =
            containerWidth !== (last.width ?? containerWidth) ||
            containerHeight !== (last.height ?? containerHeight);
        const dataChanged = combinedCandles !== (last.data || combinedCandles);

        const shouldRedraw = dimensionsChanged ||
            scaleChanged ||
            dataChanged ||
            scrollDelta >= 2 ||
            isZoomingRef.current ||
            isDragging;

        if (!shouldRedraw) {
            return;
        }

        lastRenderedRef.current = {
            scrollLeft,
            width: containerWidth,
            height: containerHeight,
            xScale,
            yScale,
            data: combinedCandles
        };

        // Update last rendered values
        lastRenderedScrollPositionRef.current = scrollLeft;
        lastRenderedDimensionsRef.current = {
            width: containerWidth,
            height: containerHeight
        };

        // Use offscreen canvas for drawing
        const offscreenCanvas = getOffscreenCanvas();
        const ctx = offscreenCanvas.getContext('2d', { alpha: false });

        // Draw background directly on the offscreen canvas
        ctx.fillStyle = '#2b2b2b';
        ctx.fillRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

        const chartWidth = offscreenCanvas.width - CONSTANTS.SIDEBAR_WIDTH;
        const chartHeight = offscreenCanvas.height;

        // Define vertical layout
        const topPadding = chartHeight * 0.1;
        const usableHeight = chartHeight * 0.8;

        // Get current candle dimensions
        const { width: candleWidth, gap } = calculationCacheRef.current.candleDimensions;

        // Get visible candles
        const { start: startIndex, end: endIndex } = calculateVisibleCandles();

        // Skip if no visible candles
        if (startIndex > endIndex) return;

        // Get price range for visible candles
        const { min: minPrice, max: maxPrice } = calculateVisiblePriceRange();

        // Calculate price range with padding
        const visiblePriceRange = maxPrice - minPrice;
        const paddingAmount = visiblePriceRange * 0.15;
        const priceTop = maxPrice + paddingAmount;
        const priceBot = minPrice - paddingAmount;

        // Function to map price to Y coordinate
        const priceToY = (p) => {
            return topPadding + usableHeight * (1 - ((p - priceBot) / (priceTop - priceBot)));
        };

        // Draw grid lines with reduced opacity
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 0.5;

        // Determine consistent grid spacing
        const gridStep = determineGridStep(priceTop - priceBot);

        // Y grid lines - only draw visible ones
        for (let p = Math.floor(priceBot / gridStep) * gridStep; p <= priceTop; p += gridStep) {
            const y = priceToY(p);
            if (y >= 0 && y <= chartHeight) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(chartWidth, y);
                ctx.stroke();
            }
        }

        // X grid lines - only draw visible ones
        const visibleStartX = startIndex * (candleWidth + gap);
        const visibleEndX = (endIndex + 1) * (candleWidth + gap);

        const baseIndexStep = Math.max(1, Math.floor(10 / xScale));
        for (let i = Math.floor(startIndex / baseIndexStep) * baseIndexStep;
             i <= Math.ceil(endIndex / baseIndexStep) * baseIndexStep;
             i += baseIndexStep) {
            if (i >= 0 && i < combinedCandles.length) {
                const x = i * (candleWidth + gap);
                if (x >= visibleStartX && x <= visibleEndX) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, chartHeight);
                    ctx.stroke();
                }
            }
        }

        // Prepare for candlestick drawing
        ctx.lineWidth = 1;

        // Draw only visible candlesticks
        for (let idx = startIndex; idx <= endIndex; idx++) {
            if (idx < 0 || idx >= combinedCandles.length) continue;

            const c = combinedCandles[idx];
            const x = idx * (candleWidth + gap);

            // Skip if candle is far outside visible area
            if (x + candleWidth < scrollLeft - containerWidth || x > scrollLeft + containerWidth * 2) {
                continue;
            }

            const openY = priceToY(c.open);
            const closeY = priceToY(c.close);
            const highY = priceToY(c.high);
            const lowY = priceToY(c.low);

            const isBullish = c.close >= c.open;

            // Highlight the newest candle with a brighter color
            const isNewestCandle = idx === combinedCandles.length - 1 && animatedCurrentCandle;

            // Simplified colors for better performance
            const bullishColor = isNewestCandle ? '#14E29A' : '#10B981'; // Brighter green for newest
            const bearishColor = isNewestCandle ? '#FF5252' : '#F44336'; // Brighter red for newest

            // Wick
            ctx.strokeStyle = isBullish ? bullishColor : bearishColor;
            ctx.beginPath();
            ctx.moveTo(x + candleWidth / 2, highY);
            ctx.lineTo(x + candleWidth / 2, lowY);
            ctx.stroke();

            // Body
            const bodyTop = Math.min(openY, closeY);
            const bodyHeight = Math.max(2, Math.abs(closeY - openY));

            // Use solid colors instead of gradients for better performance
            ctx.fillStyle = isBullish ? bullishColor : bearishColor;

            // Calculate corner radius based on candle size
            const cornerRadius = Math.min(1.5, candleWidth / 6, bodyHeight / 6);

            // Draw rounded rectangle
            drawRoundedRect(ctx, x, bodyTop, candleWidth, bodyHeight, cornerRadius);

            // Add subtle pulsing effect for the newest candle
            if (isNewestCandle) {
                ctx.strokeStyle = isBullish ? 'rgba(20, 226, 154, 0.5)' : 'rgba(255, 82, 82, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(x - 1, bodyTop - 1, candleWidth + 2, bodyHeight + 2);
                ctx.stroke();
                ctx.lineWidth = 1;
            }
        }

        // Draw current price line only if the last candle is visible
        if (combinedCandles.length > 0) {
            const lastCandle = combinedCandles[combinedCandles.length - 1];
            const lastClose = lastCandle.close;

            const currentPriceY = priceToY(lastClose);

            if (currentPriceY >= 0 && currentPriceY <= chartHeight && isFinite(currentPriceY)) {
                lastPriceLinePosition.current = currentPriceY;

                ctx.strokeStyle = '#10B981';
                ctx.lineWidth = 1.5;

                ctx.setLineDash([5, 3]);
                ctx.beginPath();
                ctx.moveTo(0, currentPriceY);
                ctx.lineTo(chartWidth, currentPriceY);
                ctx.stroke();
                ctx.setLineDash([]);
            } else if (lastPriceLinePosition.current !== null) {
                ctx.strokeStyle = '#10B981';
                ctx.lineWidth = 1.5;

                ctx.setLineDash([5, 3]);
                ctx.beginPath();
                ctx.moveTo(0, lastPriceLinePosition.current);
                ctx.lineTo(chartWidth, lastPriceLinePosition.current);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }

        // Copy offscreen canvas to visible canvas
        const visibleCtx = canvas.getContext('2d');
        visibleCtx.clearRect(0, 0, canvas.width, canvas.height);
        visibleCtx.drawImage(offscreenCanvas, 0, 0);

        // Always update sidebar position
        updateSidebar();
    }, [
        combinedCandles,
        xScale,
        yScale,
        calculateVisibleCandles,
        calculateVisiblePriceRange,
        getOffscreenCanvas,
        drawRoundedRect,
        isDragging,
        updateSidebar,
        animatedCurrentCandle
    ]);

    // Function to schedule a chart redraw using requestAnimationFrame
    const scheduleChartRedraw = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            drawChart();
            animationFrameRef.current = null;

            // If at right edge, schedule next frame to ensure continuous rendering
            if (isAtRightEdge) {
                animationFrameRef.current = requestAnimationFrame(() => {
                    drawChart();
                    animationFrameRef.current = null;
                });
            }
        });
    }, [drawChart, isAtRightEdge]);

    const MAX_CANVAS = 16383;  // Chrome/WebKit safety limit
    const MIN_SCALE = 0.1;
    const MAX_SCALE = 10;

    const useZoomToCursor = (e) => !e.shiftKey;

    // =================== EVENT HANDLERS ===================
    // Improved wheel event handler for zooming with stability
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        // Zoom direction & factor (with smoother factor at extreme zoom levels)
        const zoomIn = e.deltaY < 0;

        // Use more gentle zoom factors at extreme scales
        let zoomFactor;
        if (xScale < 0.5) {
            // Gentler zoom at small scales
            zoomFactor = zoomIn ? 1.03 : 0.97;
        } else if (xScale > 5) {
            // Gentler zoom at large scales
            zoomFactor = zoomIn ? 1.03 : 0.97;
        } else {
            // Normal zoom in the middle range
            zoomFactor = zoomIn ? 1.05 : 0.95;
        }

        // Save cursor position relative to data BEFORE zoom
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const currentOffset = xOffsetRef.current;

        // Calculate candle index under cursor before zoom
        const { width: candleWidth, gap } = calculationCacheRef.current.candleDimensions;
        const candleWidthPlusGap = candleWidth + gap;
        const candleIndexAtCursor = (currentOffset + mouseX) / candleWidthPlusGap;

        // Calculate new scale with improved bounds checking
        const prevScale = xScale;
        let tentativeScale = xScale * zoomFactor;

        // Hard-cap so canvas never exceeds GPU limits
        const slot = CONSTANTS.BASE_CANDLE_WIDTH + CONSTANTS.BASE_GAP;
        const maxScaleSafe = MAX_CANVAS / (combinedCandles.length * slot || 1);
        const safeScale = Math.min(maxScaleSafe, MAX_SCALE);

        // Apply scale limits
        tentativeScale = Math.min(Math.max(tentativeScale, MIN_SCALE), safeScale);

        // Calculate new scaled dimensions
        const newCandleWidth = Math.max(CONSTANTS.MIN_CANDLE_WIDTH, CONSTANTS.BASE_CANDLE_WIDTH * tentativeScale);
        const newGap = CONSTANTS.BASE_GAP * tentativeScale;
        const newCandleWidthPlusGap = newCandleWidth + newGap;

        // Calculate new position to keep same candle under cursor
        let newOffset;

        if (useZoomToCursor(e)) {
            // Zoom to cursor - precisely maintain the candlestick under cursor
            newOffset = (candleIndexAtCursor * newCandleWidthPlusGap) - mouseX;
        } else {
            // Zoom centered on viewport midpoint
            const midView = container.clientWidth / 2;
            const canvasPointAtCenter = currentOffset + midView;
            const candleIndexAtCenter = canvasPointAtCenter / candleWidthPlusGap;
            newOffset = (candleIndexAtCenter * newCandleWidthPlusGap) - midView;
        }

        // Calculate max offset considering the new scale
        const viewportW = container.clientWidth;
        const maxOffset = getMaxOffset(viewportW, combinedCandles.length, tentativeScale);

        // Apply bounds and store result
        xOffsetRef.current = Math.min(Math.max(0, newOffset), maxOffset);

        // Update transform immediately for smoother visual feedback
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.transform = `translateX(-${xOffsetRef.current}px)`;
        }

        // Commit scale change and schedule proper redraw
        setXScale(tentativeScale);
        calculateVerticalScale();

        // Mark that we're zooming to avoid unnecessary calculations during zoom
        isZoomingRef.current = true;

        // Ensure we update the canvas dimensions properly
        calculationCacheRef.current.candleDimensions = {
            width: newCandleWidth,
            gap: newGap
        };

        // Schedule a redraw with the new scale
        scheduleChartRedraw();

        // Clear any existing timeout
        if (wheelTimeoutRef.current) {
            clearTimeout(wheelTimeoutRef.current);
        }

        // Set a timeout to mark zooming as complete
        wheelTimeoutRef.current = setTimeout(() => {
            isZoomingRef.current = false;
            // Check if we're at the right edge
            setIsAtRightEdge(checkIfAtRightEdge());
            // Force redraw after zooming finishes
            scheduleChartRedraw();
        }, CONSTANTS.WHEEL_DEBOUNCE_MS);
    }, [
        xScale,
        combinedCandles.length,
        calculateVerticalScale,
        scheduleChartRedraw,
        checkIfAtRightEdge
    ]);

    // Mouse down handler for dragging
    const handleMouseDown = useCallback((e) => {
        // Only respond to left mouse button
        if (e.button !== 0) return;

        // Set dragging state immediately
        setIsDragging(true);

        // Store initial values for drag calculation
        dragStartX.current = e.clientX;
        dragStartOffset.current = xOffsetRef.current;

        // When user starts dragging, we're no longer at the right edge
        setIsAtRightEdge(false);

        // Change cursor to indicate dragging
        document.body.style.cursor = 'grabbing';

        // Prevent text selection during drag
        e.preventDefault();
    }, []);

    // Mouse move handler for dragging and hover effects
    const handleMouseMove = useCallback((e) => {
        // Skip if we're zooming to avoid unnecessary work
        if (isWheelActiveRef.current) return;

        // For hover detection
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        // For dragging - process dragging with high priority
        if (isDragging) {
            const deltaX = e.clientX - dragStartX.current;

            // Use xOffsetRef directly instead of container.scrollLeft
            const newOffset = Math.max(0, dragStartOffset.current - deltaX);

            // Get the max offset based on current scale
            const container = containerRef.current;
            if (container) {
                const viewportW = container.clientWidth;
                const maxOffset = getMaxOffset(viewportW, combinedCandles.length, xScale);
                xOffsetRef.current = Math.min(newOffset, maxOffset);

                // Apply transform directly to the canvas for smoother dragging
                // This is more performant than redrawing the entire chart
                if (canvas) {
                    canvas.style.transform = `translateX(-${xOffsetRef.current}px)`;
                }

                // Use requestAnimationFrame for smoother updates
                if (!animationFrameRef.current) {
                    animationFrameRef.current = requestAnimationFrame(() => {
                        scheduleChartRedraw();
                        animationFrameRef.current = null;
                    });
                }
            }

            // Skip hover detection during drag for better performance
            return;
        }

        // Show hover info for candles - only check visible candles
        const { start, end } = calculateVisibleCandles();
        const { width: cw, gap: g } = calculationCacheRef.current.candleDimensions;

        let found = null;
        const container = containerRef.current;
        if (container) {
            const scrollOffset = xOffsetRef.current;

            // Only check candles that could be under the cursor
            for (let i = start; i <= end; i++) {
                if (i < 0 || i >= combinedCandles.length) continue;

                const xStart = i * (cw + g) - scrollOffset;
                // Skip candles far from cursor for performance
                if (Math.abs(xStart - mouseX) > cw * 2) continue;

                const xEnd = xStart + cw;
                if (mouseX >= xStart && mouseX <= xEnd) {
                    found = combinedCandles[i];
                    break;
                }
            }
        }

        setHoveredCandle(found);
    }, [isDragging, calculateVisibleCandles, combinedCandles, scheduleChartRedraw, xScale]);

    // Mouse up handler to end dragging
    const handleMouseUp = useCallback(() => {
        if (!isDragging) return;

        setIsDragging(false);
        document.body.style.cursor = 'default';

        // Check if we're at the right edge after drag ends
        setIsAtRightEdge(checkIfAtRightEdge());

        // Force redraw after drag ends
        scheduleChartRedraw();

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [isDragging, scheduleChartRedraw, checkIfAtRightEdge, handleMouseMove]);

    // Mouse leave handler to clear hover state
    const handleMouseLeave = useCallback(() => {
        // Just clear the tooltip; don't cancel a drag-in-progress
        setHoveredCandle(null);
    }, []);

    // Function to auto-center on newest candle
    const maybeCenterNewCandle = useCallback(() => {
        if (!isAtRightEdge || combinedCandles.length === 0) return;

        const container = containerRef.current;
        if (!container) return;

        // Calculate position of newest candle
        const newestIndex = combinedCandles.length - 1;
        const { width: candleWidth, gap } = calculationCacheRef.current.candleDimensions;

        const newCandleX = newestIndex * (candleWidth + gap) + candleWidth / 2;

        // Center the container on this candle
        const containerCenter = container.clientWidth / 2;

        // Just update xOffsetRef directly - no scrolling involved
        xOffsetRef.current = Math.max(0, newCandleX - containerCenter);

        // Trigger redraw to apply the new position
        scheduleChartRedraw();
    }, [isAtRightEdge, combinedCandles, scheduleChartRedraw]);

    // =================== ANIMATIONS ===================
    // Animate ONLY the newest candle when it changes
    useEffect(() => {
        // Skip animation if there's no current candle
        if (!currentCandle) {
            setAnimatedCurrentCandle(null);
            previousCurrentCandleRef.current = null;
            return;
        }

        // Get previous version of the current candle
        const prevCandle = previousCurrentCandleRef.current;

        // If no previous candle, just use the current one directly
        if (!prevCandle) {
            setAnimatedCurrentCandle(currentCandle);
            previousCurrentCandleRef.current = { ...currentCandle };
            return;
        }

        // Only animate if there are actual changes to the candle
        if (
            prevCandle.high === currentCandle.high &&
            prevCandle.low === currentCandle.low &&
            prevCandle.close === currentCandle.close
        ) {
            // No changes, just use current candle directly
            setAnimatedCurrentCandle(currentCandle);
            previousCurrentCandleRef.current = { ...currentCandle };
            return;
        }

        // Start the animation
        let startTime = null;
        const duration = 150; // Faster transitions for real-time feel

        function animateFrame(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(1, elapsed / duration);

            // Use easeOutQuad for smoother finish
            const easedT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            // Create animated candle - only animate high, low, and close
            // The open value should remain constant as it's the starting point
            const animated = {
                date: currentCandle.date,
                open: currentCandle.open, // Don't animate open price - it's fixed
                high: lerp(prevCandle.high, currentCandle.high, easedT),
                low: lerp(prevCandle.low, currentCandle.low, easedT),
                close: lerp(prevCandle.close, currentCandle.close, easedT)
            };

            setAnimatedCurrentCandle(animated);

            if (t < 1) {
                requestAnimationFrame(animateFrame);
            } else {
                // Animation complete - update the previous candle reference
                previousCurrentCandleRef.current = { ...currentCandle };
            }
        }

        requestAnimationFrame(animateFrame);
    }, [currentCandle]);

    // =================== EFFECTS ===================
    // Initial setup and cleanup
    useEffect(() => {
        // Draw chart on first render
        scheduleChartRedraw();

        // Set up ResizeObserver to handle container resizing
        const container = containerRef.current;
        if (container && window.ResizeObserver) {
            const observer = new ResizeObserver(() => {
                scheduleChartRedraw();
            });

            observer.observe(container);
            resizeObserverRef.current = observer;
        }

        // Setup a repeating frame rendering when at right edge
        const rightEdgeRenderInterval = setInterval(() => {
            if (isAtRightEdge) {
                scheduleChartRedraw();
            }
        }, 100); // Redraw every 100ms when at right edge

        // Setup complete - now focused on cleanup
        return () => {
            // Cancel any pending animations
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            // Clear timeouts
            if (wheelTimeoutRef.current) {
                clearTimeout(wheelTimeoutRef.current);
            }

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Clear the right edge render interval
            clearInterval(rightEdgeRenderInterval);

            // Remove resize observer
            if (resizeObserverRef.current && container) {
                resizeObserverRef.current.unobserve(container);
            }

            // Remove any document listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [scheduleChartRedraw, handleMouseMove, handleMouseUp, isAtRightEdge]);

    // Effect to handle drag events
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // Effect to redraw when data changes
    useEffect(() => {
        // Auto-scroll to the right edge when a new candle is added
        const totalCandles = historicalCandles.length + (currentCandle ? 1 : 0);

        // If we gained a new candle and we're at the right edge, center on it
        // if (isAtRightEdge && totalCandles > 0) {
        //     maybeCenterNewCandle();
        // }

        // Redraw the chart
        scheduleChartRedraw();
    }, [historicalCandles, animatedCurrentCandle, isAtRightEdge, scheduleChartRedraw]);

    // =================== RENDER ===================
    // Replace just the return part of CandlestickChart
    return (
        <div style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: '#2f2f2f',
                    borderRadius: '4px',
                    position: 'relative',
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <canvas
                    ref={canvasRef}
                    width={canvasDimensions.width}
                    height={canvasDimensions.height}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: `translateX(-${xOffsetRef.current}px)`
                    }}
                />
            </div>
            {hoveredCandle && (
                <div style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    zIndex: 999,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    padding: '8px',
                    borderRadius: '4px'
                }}>
                    <div><strong>Date:</strong> {hoveredCandle.date?.toLocaleTimeString()}</div>
                    <div><strong>Open:</strong> {hoveredCandle.open.toFixed(2)}</div>
                    <div><strong>High:</strong> {hoveredCandle.high.toFixed(2)}</div>
                    <div><strong>Low:</strong> {hoveredCandle.low.toFixed(2)}</div>
                    <div><strong>Close:</strong> {hoveredCandle.close.toFixed(2)}</div>
                </div>
            )}
        </div>
    );
}

CandlestickChart.propTypes = {
    historicalCandles: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
            open: PropTypes.number.isRequired,
            high: PropTypes.number.isRequired,
            low: PropTypes.number.isRequired,
            close: PropTypes.number.isRequired
        })
    ).isRequired,
    currentCandle: PropTypes.shape({
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
        open: PropTypes.number.isRequired,
        high: PropTypes.number.isRequired,
        low: PropTypes.number.isRequired,
        close: PropTypes.number.isRequired
    })
};

export default CandlestickChart;