import { useState, useRef, useEffect } from "react"
import "./style.css"

// eslint-disable-next-line react/prop-types
export default function AudioPlayer({ song, title, onNext, onPrev }) {
    const ref = useRef()
    const [pause, setPause] = useState(false)
    const [sound, setSound] = useState(0.5)
    const [duration, setDuration] = useState("00:00")
    const [currentDuration, setCurrentDuration] = useState(0)


    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    }

    const getMaxDuration = () => {
        if (ref.current) {
            return ref.current.duration || 0
        }
        return 100
    }

    const pauseOrPlay = () => {
        if (pause) {
            ref.current.play();
        } else {
            ref.current.pause();
        }

        setPause(!pause)
    }

    const changeAudioDurationByInput = (event) => {
        setCurrentDuration(ref.current.currentTime = parseInt(event.target.value))
    }

    useEffect(() => {
        const element = ref.current;
        const handleDuration = () => {
            setCurrentDuration(ref.current.currentTime)
        }

        const handleAudioChange = () => {
            setDuration(calculateTime(ref.current.duration))
        }

        element.addEventListener('loadedmetadata', handleAudioChange)
        element.addEventListener('timeupdate', handleDuration)
        element.addEventListener('ended', onNext)

        if (!pause) {
            ref.current.play();
        } else {
            ref.current.pause();
        }

        setCurrentDuration(0);
        return () => {
            element.removeEventListener('loadedmetadata', handleAudioChange)
            element.removeEventListener('timeupdate', handleDuration)
            element.removeEventListener('ended', onNext)
        }
    }, [song])

    useEffect(() => {
        ref.current.volume = sound
    }, [sound])

    return (
        <div className="audio-player">
            <audio style={{ display: 'none' }} ref={ref} src={song} preload="metadata"></audio>
            <div className="sname">
                <div className={"icon-m" + (pause ? "" : " active")}>
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 22.42C8.20914 22.42 10 20.6292 10 18.42C10 16.2109 8.20914 14.42 6 14.42C3.79086 14.42 2 16.2109 2 18.42C2 20.6292 3.79086 22.42 6 22.42Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 20.42C20.2091 20.42 22 18.6292 22 16.42C22 14.2109 20.2091 12.42 18 12.42C15.7909 12.42 14 14.2109 14 16.42C14 18.6292 15.7909 20.42 18 20.42Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10 18.4099V9.5C9.99907 8.0814 10.5008 6.70828 11.4162 5.62451C12.3315 4.54074 13.6012 3.81639 15 3.57996L22 2.40991V16.4099" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <marquee direction="left">
                    {title}
                </marquee>
            </div>

            <div className="btn-ctrls">
                <button onClick={onPrev} style={{ transform: 'rotateZ(180deg)' }} type="button">
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.98047 3.51001C1.43047 4.39001 0.980469 9.09992 0.980469 12.4099C0.980469 15.7199 1.41047 20.4099 3.98047 21.3199C6.69047 22.2499 14.9805 16.1599 14.9805 12.4099C14.9805 8.65991 6.69047 2.58001 3.98047 3.51001Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23 5.92004C23 4.53933 21.8807 3.42004 20.5 3.42004C19.1193 3.42004 18 4.53933 18 5.92004V18.92C18 20.3008 19.1193 21.42 20.5 21.42C21.8807 21.42 23 20.3008 23 18.92V5.92004Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button type="button" onClick={pauseOrPlay}>
                    {pause ? (
                        <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.98047 3.51001C5.43047 4.39001 4.98047 9.09992 4.98047 12.4099C4.98047 15.7199 5.41047 20.4099 7.98047 21.3199C10.6905 22.2499 18.9805 16.1599 18.9805 12.4099C18.9805 8.65991 10.6905 2.58001 7.98047 3.51001Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : (
                        <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6.42004C10 4.76319 8.65685 3.42004 7 3.42004C5.34315 3.42004 4 4.76319 4 6.42004V18.42C4 20.0769 5.34315 21.42 7 21.42C8.65685 21.42 10 20.0769 10 18.42V6.42004Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 6.42004C20 4.76319 18.6569 3.42004 17 3.42004C15.3431 3.42004 14 4.76319 14 6.42004V18.42C14 20.0769 15.3431 21.42 17 21.42C18.6569 21.42 20 20.0769 20 18.42V6.42004Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </button>
                <button type="button" onClick={onNext}>
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.98047 3.51001C1.43047 4.39001 0.980469 9.09992 0.980469 12.4099C0.980469 15.7199 1.41047 20.4099 3.98047 21.3199C6.69047 22.2499 14.9805 16.1599 14.9805 12.4099C14.9805 8.65991 6.69047 2.58001 3.98047 3.51001Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M23 5.92004C23 4.53933 21.8807 3.42004 20.5 3.42004C19.1193 3.42004 18 4.53933 18 5.92004V18.92C18 20.3008 19.1193 21.42 20.5 21.42C21.8807 21.42 23 20.3008 23 18.92V5.92004Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
            <div className="p-info">
                <input
                    type="range"
                    onChange={changeAudioDurationByInput}
                    value={currentDuration}
                    max={getMaxDuration()}
                    name="audio"
                    id="audio"
                />

                <p>{calculateTime(currentDuration)} / {duration}</p>
            </div>
            <div className="audio-bar">

                {sound == 0 ? (
                    <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45c-92.47 0-167.893-74.498-169.392-166.618L0 1185.96V734.187c0-92.47 74.498-167.892 166.618-169.392l2.797-.022h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm823.662 411.78L1920 717.571l-242.372 242.372L1920 1202.428l-79.85 79.85-242.484-242.372-242.372 242.372-79.85-79.85 242.372-242.484-242.371-242.372 79.85-79.85 242.37 242.372 242.486-242.372ZM451.773 677.715H169.415c-30.749 0-55.963 24.796-56.464 55.538l-.008.933v451.773c0 30.86 24.907 55.965 55.542 56.464l.93.008h282.358V677.716Z" fill-rule="evenodd" />
                    </svg>
                ) : (
                    <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z" fillRule="evenodd" />
                    </svg>
                )}

                <input
                    type="range"
                    onChange={e => setSound(e.target.value)}
                    value={sound}
                    step={0.01}
                    min={0}
                    max={1}
                />
            </div>
        </div>
    )
}