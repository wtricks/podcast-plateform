import { useState, memo, useEffect } from "react";

import FileInput from '../FileInput'
import './style.css'

// eslint-disable-next-line react/prop-types
export default memo(function Form({ onSubmit, style, data, c, buttonText, action, loading, method = 'post' }) {
    // eslint-disable-next-line react/prop-types
    const [state, setState] = useState(() => data.reduce((p, c) => ({ ...p, [c.name]: c.value || '' }), {}))

    const onFormSubmit = (event) => {
        event.preventDefault();
        // eslint-disable-next-line react/prop-types
        onSubmit(state, () => setState(data.reduce((p, c) => ({ ...p, [c.name]: c.value || '' }), {})))
    }

    const valueChange = (value, name) => {
        setState(p => ({ ...p, [name]: value }));
    }

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        setState(data.reduce((p, c) => ({ ...p, [c.name]: c.value || '' }), {}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [c])

    /**
     * { type, props, name, value }
     */
    return (
        <form className="form" style={style} action={action} method={method} onSubmit={onFormSubmit}>
            {/* eslint-disable-next-line react/prop-types */}
            {data.map((input) => (
                input.type == 'textarea'
                    ? <textarea
                        className="input"
                        key={input.name}
                        value={state[input.name]}
                        onChange={e => valueChange(e.target.value, input.name)}
                        {...input.props}
                    />
                    : input.type == 'file'
                        ? <FileInput
                            key={input.name}
                            value={state[input.name]}
                            setValue={file => valueChange(file, input.name)}
                            {...input.props}
                        />
                        : <input
                            className="input"
                            type={input.type}
                            key={input.name}
                            value={state[input.name]}
                            onChange={e => valueChange(e.target.value, input.name)}
                            {...input.props}
                        />
            ))}
            {buttonText && (
                <button disabled={loading} type="submit">
                    {loading ? (
                        <div className="loader">
                            <span></span>
                        </div>
                    ) : buttonText}
                </button>
            )}
        </form>
    )
})