/**
 * @file App.jsx
 * @description Balanced wrapper component for CandlestickChart with WebSocket data
 * Preserves essential processing functionality with minimal UI
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import CandlestickChart from './CandlestickChart';

/**
 * Groups raw price stamps into candlestick data.
 * @param {Array} allStamps - Array of raw price data points with date and price
 * @param {number} stampsPerCandle - Number of stamps to group into one candle
 * @returns {Array} Array of candle objects with {date, open, high, low, close}
 */


/**
 * Balanced wrapper component for the CandlestickChart
 */
export default function GraphWrapper() {
    // Data states
    const [allStamps, setAllStamps] = useState([]);
    const [historicalCandles, setHistoricalCandles] = useState([]);
    const [currentCandle, setCurrentCandle] = useState(null);

    // Configuration - hardcoded to keep UI minimal
    const stampsPerCandle = 5;

    // Refs for processing
    const lastProcessedIndex = useRef(0);
    const nextCandleCloseIndex = useRef(stampsPerCandle);
    const updateCounterRef = useRef(0);
    const socketRef = useRef(null);

    // Process new price stamps to update current candle
    const processCurrentCandle = useCallback((stamps) => {
        // Only process if we have stamps
        if (stamps.length === 0) {
            setCurrentCandle(null);
            return;
        }

        // Get the stamps for the current candle being formed
        let currentStamps;

        if (stamps.length <= nextCandleCloseIndex.current) {
            // If we haven't reached a closing point, use all stamps after the last processed index
            currentStamps = stamps.slice(lastProcessedIndex.current);
        } else {
            // We've received the stamp that will close this candle, but we still want to show it
            // in the current candle before moving it to historical on the next update
            currentStamps = stamps.slice(lastProcessedIndex.current, nextCandleCloseIndex.current);
        }

        if (currentStamps.length === 0) {
            setCurrentCandle(null);
            return;
        }

        // Calculate candle values
        const date = currentStamps[0].date;
        const prices = currentStamps.map(s => s.price);

        const open = prices[0];
        const close = prices[prices.length - 1];
        const high = Math.max(...prices);
        const low = Math.min(...prices);

        // Increment update counter to force animation
        updateCounterRef.current++;

        // Create a new candle object to ensure animation
        setCurrentCandle({
            date,
            open,
            high,
            low,
            close,
            _update: updateCounterRef.current
        });

        // Check if we need to move a completed candle to historical
        if (stamps.length > nextCandleCloseIndex.current) {
            // We have more stamps than needed for the next candle close,
            // so move the completed candle to historical
            const completedStamps = stamps.slice(
                lastProcessedIndex.current,
                nextCandleCloseIndex.current
            );

            if (completedStamps.length === stampsPerCandle) {
                // Create a new historical candle
                const completedCandleData = {
                    date: completedStamps[0].date,
                    open: completedStamps[0].price,
                    close: completedStamps[completedStamps.length - 1].price,
                    high: Math.max(...completedStamps.map(s => s.price)),
                    low: Math.min(...completedStamps.map(s => s.price))
                };

                // Add to historical candles
                setHistoricalCandles(prev => [...prev, completedCandleData]);

                // Update references for next processing
                lastProcessedIndex.current = nextCandleCloseIndex.current;
                nextCandleCloseIndex.current += stampsPerCandle;

                // Now process the remaining stamps for the new current candle
                processCurrentCandle(stamps);
            }
        }
    }, []);

    // Process allStamps whenever they change
    useEffect(() => {
        if (allStamps.length === 0) {
            setHistoricalCandles([]);
            setCurrentCandle(null);
            lastProcessedIndex.current = 0;
            nextCandleCloseIndex.current = stampsPerCandle;
            return;
        }

        // Process current candle
        processCurrentCandle(allStamps);
    }, [allStamps, processCurrentCandle]);

    // Connect to WebSocket on component mount
    useEffect(() => {
        const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:8000'}/ws/prices/`;
        const socket = new WebSocket(wsUrl);
        socketRef.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "message" && data.price !== undefined) {
                    const newStamp = {
                        date: data.timestamp ? new Date(data.timestamp) : new Date(),
                        price: parseFloat(data.price)
                    };

                    setAllStamps(prev => [...prev, newStamp]);
                }
            } catch (error) {
                console.error("Error processing WebSocket message:", error);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };

        // Cleanup on unmount
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    // Just render the chart with no UI controls
    return (
        <div style={{ width: '2000px', height: '800px' }}>
            <CandlestickChart
                historicalCandles={historicalCandles}
                currentCandle={currentCandle}
            />
        </div>
    );
}