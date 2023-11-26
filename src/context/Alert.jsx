import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Alert from "../components/Alert";

const DEFAULT_TIMER = 4000;
const AlertContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAlert() {
    return useContext(AlertContext).show
}

// eslint-disable-next-line react/prop-types
export function AlertProvider({ children }) {
    const [messages, setMessages] = useState([])

    const onClose = (id) => {
        setMessages(p => p.filter(m => m.id != id))
    }

    const addMessages = (message, timer) => {
        messages.push({
            id: Math.random(),
            text: message,
            timer: timer || DEFAULT_TIMER
        })
        setMessages([...messages])
    }

    return (
        <AlertContext.Provider value={{ show: addMessages }}>
            <div className="alert-box">
                {
                    messages.map(message => (
                        <Alert
                            key={message.id}
                            message={message.text}
                            onClose={onClose}
                            timer={message.timer}
                            id={message.id}
                        />
                    ))
                }
            </div>
            {children}
        </AlertContext.Provider>
    )
}