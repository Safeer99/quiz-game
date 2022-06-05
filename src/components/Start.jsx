import React, { useRef } from 'react'

export default function Start(props) {

    const inputRef = useRef();

    const handleClick = () => {
        inputRef.current.value && props.setUserName(inputRef.current.value)
    }

    return (
        <div className='start'>
            <input placeholder='Enter your name' type="text" className='startInput' ref={inputRef} />
            <button className='startButton' onClick={handleClick}>Start</button>
        </div>
    )
}
