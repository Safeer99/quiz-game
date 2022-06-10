import React from 'react'
import '../Revive.css'
import poll from '../assets/audiencePoll.png'
import flipQues from '../assets/flipQues.png'
import fiftyFifty from '../assets/fiftyFifty.png'

export default function PowerPaplu({ setLifelineSelector, animation, setAnimation }) {

    const handleClick = (x) => {
        if (x === 'first') {
            setAnimation({ ...animation, first: false })
        } else if (x === 'second') {
            setAnimation({ ...animation, second: false })
        }
        else if (x === 'third') {
            setAnimation({ ...animation, third: false })
        }
        setLifelineSelector(false);
    }

    return (
        <div className='fourthLifelinePage'>
            <div className='lifelineSelectionBox'>
                <div className='text'>Select any one of them</div>
                <div className='usedLifelines'>
                    {animation.first && <div
                        style={{ backgroundImage: `url(${poll})` }}
                        onClick={() => handleClick("first")}>
                    </div>}
                    {animation.second && <div
                        style={{ backgroundImage: `url(${flipQues})` }}
                        onClick={() => handleClick("second")}>
                    </div>}
                    {animation.third && <div
                        style={{ backgroundImage: `url(${fiftyFifty})` }}
                        onClick={() => handleClick("third")}>
                    </div>}
                </div>
            </div>
        </div >
    )
}
