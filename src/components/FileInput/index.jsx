import { useRef, useState } from 'react'
import './style.css'

// eslint-disable-next-line react/prop-types
export default function FileInput({ style, title, value, setValue, accept = 'image/*' }) {
    const [active, setActive] = useState(false)
    const ref = useRef()

    const onDragDrop = (event) => {
        event.preventDefault()
        setValue(event.dataTransfer.files?.[0])
        setActive(false)
    }

    const onDragOver = (event) => {
        event.preventDefault()
        if (!active) {
            setActive(true)
        }
    }

    const onDragLeave = (event) => {
        event.preventDefault()
        if (active) {
            setActive(false)
        }
    }

    return (
        <>
            {
                !value ?
                    <div
                        onClick={() => ref.current.click()}
                        onDrop={onDragDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        className={'file-input-group' + (active ? ' active' : '')}
                    >
                        <p>{title}</p>
                        <input
                            ref={ref}
                            type="file"
                            accept={accept}
                            onChange={(e) => setValue(e.target.files?.[0])}
                        />
                    </div>
                    : <div className={'images ' + accept.slice(0, 5)} style={style}>
                        {accept == 'audio/*'
                            // eslint-disable-next-line react/prop-types
                            ? <span>Audio &apos;{value.name.slice(0, 20)}...&apos; is selected</span>
                            : <img src={URL.createObjectURL(value)} alt="Image" />
                        }
                        <button type='button' onClick={() => setValue(null)}>&times;</button>
                    </div>
            }
        </>
    )
}