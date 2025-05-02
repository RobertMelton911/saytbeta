import React, {useRef, useEffect, useState} from "react";
import {atom, useAtom} from "jotai";
import styles from "./GrafPageRightPanel.module.css";
import GrafPageSelectTime from "./GrafPageSelectTime";
import GrafPageSelectAmount from "./GrafPageSelectAmount";
import {demoBalanceAtom} from "./HeaderMain";
import {currentPriceAtom} from "./graph/GraphWrapper";
// Состояния для управления выбором времени и суммы
export const selectTimeVisibleAtom = atom(false);
export const selectedTimeAtom = atom("1мин");

export const selectAmountVisibleAtom = atom(false);
export const selectedAmountAtom = atom("5");

const timeframes = ["1мин", "5мин", "10мин", "15мин", "30мин", "1час"];
const maxAmount = 1000;

const GrafPageRightPanel = () => {
    const [showSelectTime, setShowSelectTime] = useAtom(selectTimeVisibleAtom);
    const [selectedTime, setSelectedTime] = useAtom(selectedTimeAtom);
    const [showSelectAmount, setShowSelectAmount] = useAtom(selectAmountVisibleAtom);
    const [selectedAmount, setSelectedAmount] = useAtom(selectedAmountAtom);
    const [currentBets, setCurrentBets] = useState(null)
    // Реfs для управления кликами вне элемента
    const rightPanelRef = useRef(null);
    const selectTimeRef = useRef(null);
    const selectAmountRef = useRef(null);
    const timeRef = useRef(null);
    const amountRef = useRef(null);
    const [betsHistory, setBetsHistory] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: "", type: "success" });
    const [isPlacingBet, setIsPlacingBet] = useState(false);
    const [demoBalance, setDemoBalance] =  useAtom(demoBalanceAtom);
    const [currentPrice, setCurrentPrice] = useAtom(currentPriceAtom);
    // Открытие/закрытие селекторов
    const toggleSelectTime = (e) => {
        e.stopPropagation();
        setShowSelectTime((prev) => !prev);
    };

    const toggleSelectAmount = (e) => {
        e.stopPropagation();
        setShowSelectAmount((prev) => !prev);
    };

    // Изменение времени кнопками +/-
    const incrementTime = (e) => {
        e.stopPropagation();
        const currentIndex = timeframes.indexOf(selectedTime);
        if (currentIndex < timeframes.length - 1) {
            setSelectedTime(timeframes[currentIndex + 1]);
        }
    };

    const decrementTime = (e) => {
        e.stopPropagation();
        const currentIndex = timeframes.indexOf(selectedTime);
        if (currentIndex > 0) {
            setSelectedTime(timeframes[currentIndex - 1]);
        }
    };

    // Изменение суммы кнопками +/-
    const incrementAmount = (e) => {
        e.stopPropagation();
        setSelectedAmount((prev) => Math.min(Number(prev) + 5, maxAmount).toString());
    };

    const decrementAmount = (e) => {
        e.stopPropagation();
        setSelectedAmount((prev) => Math.max(Number(prev) - 5, 5).toString());
    };

    const handlePlaceBet = async () => {
        try {
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
                // body: {
                //     ...
                // }
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const fetchBets = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/completed-bets?limit=5`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                console.log(data);
                setBetsHistory(data);


                const responseCurrent = await fetch(`${import.meta.env.VITE_API_URL}/api/bets`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })

                if (!response.ok) throw new Error('Failed to fetch current bets');
                const dataCurrent = await responseCurrent.json();
                console.log(dataCurrent)
                setCurrentBets(data)
            } catch (error) {
                console.error('Error fetching bets:', error);
            }
        };

        fetchBets();
    }, []);


    // Обработка ручного ввода суммы
    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/\D/, ""); // Удаляем все нечисловые символы
        if (value !== "") {
            value = Math.min(Number(value), maxAmount).toString(); // Ограничиваем максимум
        }
        setSelectedAmount(value);
    };
    const apiUrl = import.meta.env.VITE_API_COMPLETED_BETS_URL || 'http://localhost:8000/api/completed-bets';

    const showNotification = (message, type = "success") => {
        setNotification({
            show: true,
            message,
            type
        });

        // Hide notification after 5 seconds
        setTimeout(() => {
            setNotification({
                show: false,
                message: "",
                type: "success"
            });
        }, 5000);
    };

    const placeBet = async (direction) => {
        if (isPlacingBet) return; // Prevent multiple submissions

        setIsPlacingBet(true);

        try {
            // Get current price (you need to implement this based on your chart data)
             // Replace with actual price from chart

            // Map timeframe from display value to API value (minutes)
            const timeframeMap = {
                "1мин": 1,
                "5мин": 5,
                "10мин": 10,
                "15мин": 15,
                "30мин": 30,
                "1час": 60
            };

            // Prepare bet data
            const betData = {
                amount: Number(selectedAmount),
                timeframe: timeframeMap[selectedTime] || 1,
                direction: direction,
                entry_price: currentPrice,
                chart_type_id: 1 // Replace with your actual chart type ID
            };

            console.log(betData)
            // Send bet to backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bets/place/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(betData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to place bet");
            }

            console.log(data)
            setDemoBalance(prev => prev - Number(selectedAmount));
            // Show success notification
            showNotification(`Ставка успешно размещена: ${direction === "UP" ? "Купить" : "Продать"} ${selectedAmount}`, "success");

            // Refresh bets history
           

        } catch (error) {
            console.error("Error placing bet:", error);
            showNotification(error.message || "Ошибка при размещении ставки", "error");
        } finally {
            setIsPlacingBet(false);
        }
    };

    // Закрытие всплывающих окон при клике вне них
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                showSelectTime &&
                selectTimeRef.current &&
                !selectTimeRef.current.contains(event.target) &&
                timeRef.current &&
                !timeRef.current.contains(event.target)
            ) {
                setShowSelectTime(false);
            }

            if (
                showSelectAmount &&
                selectAmountRef.current &&
                !selectAmountRef.current.contains(event.target) &&
                amountRef.current &&
                !amountRef.current.contains(event.target)
            ) {
                setShowSelectAmount(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSelectTime, showSelectAmount]);

    return (
        <>
            <div className={styles.rightPanel} ref={rightPanelRef}>
                <div className={styles.control}>
                    <div className={styles.controlBox} ref={timeRef} onClick={toggleSelectTime}>
                        <div className={styles.label}>Время</div>
                        <div className={styles.controlButtons}>
                            <div className={styles.button} onClick={decrementTime}
                                 style={{opacity: selectedTime === "1мин" ? 0.5 : 1}}>
                                -
                            </div>
                            <div className={styles.valuetime}>{selectedTime}</div>
                            <div className={styles.button} onClick={incrementTime}
                                 style={{opacity: selectedTime === "1час" ? 0.5 : 1}}>
                                +
                            </div>
                        </div>
                    </div>

                    <div className={styles.controlBox} ref={amountRef} onClick={toggleSelectAmount}>
                        <div className={styles.label}>Сумма</div>
                        <div className={styles.controlButtons}>
                            <div className={styles.button} onClick={decrementAmount}
                                 style={{opacity: Number(selectedAmount) <= 5 ? 0.5 : 1}}>
                                -
                            </div>
                            <input className={styles.valueInput} type="text" value={selectedAmount}
                                   onChange={handleAmountChange} onClick={(e) => e.stopPropagation()}/>
                            <div className={styles.button} onClick={incrementAmount}
                                 style={{opacity: Number(selectedAmount) >= maxAmount ? 0.5 : 1}}>
                                +
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <div
                        className={styles.buy}
                        onClick={() => placeBet("UP")}
                        style={{opacity: isPlacingBet ? 0.7 : 1, cursor: isPlacingBet ? 'wait' : 'pointer'}}
                    >
                        Купить
                    </div>
                    <div
                        className={styles.sell}
                        onClick={() => placeBet("DOWN")}
                        style={{opacity: isPlacingBet ? 0.7 : 1, cursor: isPlacingBet ? 'wait' : 'pointer'}}
                    >
                        Продать
                    </div>
                </div>

                <div className="govno" style={{
                    display: 'flex',
                    gap: "10px",
                    flexDirection: "column-reverse",
                    height: '60vh',
                    marginBottom: '10px'
                }}>
                    <span style={{textAlign: "center", fontSize: "0.7vw"}}>== CURRENT BETS ==</span>
                    {betsHistory?.map((item, index) => (
                        <Bet initialDirection={item.direction} initialResult={item.result} initialPrice={item.result}
                             key={index}/>
                    ))}

                </div>
                {/*{currentBets !== null ? <Bet initialDirection={currentBets[0].direction} initialResult={currentBets[0].result} initialPrice={currentBets[0].result}/> : <></>}*/}

            </div>

            {showSelectTime &&
                <GrafPageSelectTime selectTimeRef={selectTimeRef} rightPanelElement={rightPanelRef.current}/>}
            {showSelectAmount &&
                <GrafPageSelectAmount selectAmountRef={selectAmountRef} rightPanelElement={rightPanelRef.current}/>}
            {notification?.show && (
                <div className="{styles.notification}" style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    padding: '15px',
                    borderRadius: '5px',
                    backgroundColor: notification.type === 'success' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                    border: `1px solid ${notification.type === 'success' ? 'green' : 'red'}`,
                    color: notification.type === 'success' ? 'green' : 'red',
                    zIndex: 1000,
                }}>
                    {notification.message}
                </div>
            )}
        </>
    );
};

export default GrafPageRightPanel;


const Bet = ({
                 initialResult = "",   // seed for result
                 initialPrice = 0,        // seed for price
                 initialDirection = ''    // seed for direction
             }) => {
    // internal state seeded from props
    let actualResult = initialResult <= 0 ? "loss" : "win";
    const [result, setResult] = useState(actualResult);
    const [price, setPrice] = useState(initialPrice);
    const [direction, setDirection] = useState(initialDirection);

    // if the parent ever changes the initial* props and you want to sync:
    useEffect(() => {
        setResult(actualResult);
    }, [initialResult]);
    useEffect(() => {
        setPrice(initialPrice);
    }, [initialPrice]);
    useEffect(() => {
        setDirection(initialDirection);
    }, [initialDirection]);

    // derive styling & signs
    const isLoss = result === "loss";
    const color = isLoss ? 'red' : 'green';
    return (
        <div
            className="negovno"
            style={{
                width: '100%',
                height: '10vh',
                border: '1px solid #ccc',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Top row: direction + price */}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '40%',
                    gap: '2.5vw',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p style={{fontSize: '0.7vw', margin: '0 0.5vw'}}>
                    {direction}
                </p>
                <p style={{fontSize: '0.7vw', margin: '0 0.5vw', color}}>
                    {price}
                </p>
            </div>

            {/* Bottom row: big + or – */}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '60%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <p style={{fontSize: '1.5vw', margin: 0, color}}>
                    {result.toUpperCase()}
                </p>
            </div>
        </div>
    );
};