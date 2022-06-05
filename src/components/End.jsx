import React from 'react'

export default function End({ earned }) {

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <div className='end'>
            <div className="endText">You Win: {earned}</div>
            <button className='restartButton' onClick={handleClick}>Restart</button>
        </div>
    )
}
