import { useEffect, useRef, useState } from 'react';
import './style.css';

// eslint-disable-next-line react/prop-types
export default function Alert({ message, onClose, timer, id }) {
    const ref = useRef();
    const timeoutRef = useRef(null);
    const pauseTimeRef = useRef([0]);
    const mouseEnterTimeRef = useRef(Date.now());
    const [lineWidth, setLineWidth] = useState(0);
    const [time, setTime] = useState(timer)

    const onMouseEnter = () => {
        const remainingTime = timer - (Date.now() - mouseEnterTimeRef.current) + pauseTimeRef.current[0];

        setLineWidth(100 - Math.floor(remainingTime * 100 / timer))
        pauseTimeRef.current[1] = Date.now();
        clearTimeout(timeoutRef.current);
        setTime(remainingTime);
    };

    const onMouseLeave = () => {
        pauseTimeRef.current[0] += Date.now() - pauseTimeRef.current[1];

        if (time > 0) {
            timeoutRef.current = setTimeout(onClose, time, id);
            setLineWidth(100)
        } else {
            onClose(id);
        }
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(onClose, time, id);

        setTimeout(() => {
            ref.current.classList.add('show');
            setLineWidth(100);
        }, 40);

        return () => {
            clearTimeout(timeoutRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={ref}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
            className="alert-message"
            style={{ '--duration': `${time}ms` }}
        >
            <p>{message}</p>
            <button type="button" onClick={() => onClose(id)}>
                &times;
            </button>
            <div className="line" style={{ width: `${lineWidth}%` }} />
        </div>
    );
}
