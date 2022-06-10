import React, { useCallback, useEffect, useState } from 'react'
import '../Poll.css'

export default function AudiencePoll({ setStopCounter, question, audiencePollActive, setAudiencePollActive }) {

    const [a, setA] = useState(null);
    const [b, setB] = useState(null);
    const [c, setC] = useState(null);
    const [d, setD] = useState(null);

    const randomNumber = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const heightSet = (w, x, y, z) => {
        setTimeout(() => {
            setA(w);
            setB(x);
            setC(y);
            setD(z);
        }, 5800);
    }

    const correctAnswer = useCallback((n) => {
        let first = randomNumber(95, 60);
        let second = randomNumber(100 - first - 2, 2);
        let third = randomNumber(100 - (first + second) - 1, 1);
        let fourth = 100 - (first + second + third);
        if (n === 0) {
            heightSet(first, second, third, fourth);
        } else if (n === 1) {
            heightSet(third, first, second, fourth);
        } else if (n === 2) {
            heightSet(second, fourth, first, third,);
        } else {
            heightSet(fourth, second, third, first,);
        }
    }, [])

    useEffect(() => {
        if (audiencePollActive) {
            question.answer.forEach(element => {
                element.correct && correctAnswer(question.answer.indexOf(element))
            });
        }
    }, [audiencePollActive, correctAnswer, question])

    const handleClick = () => {
        a && setAudiencePollActive(false);
        a && setStopCounter(true);
    }

    return (
        <div className='audiencePoll'>
            <div className="box">
                <div className='text' >Audience Poll</div>
                <div className='graph' >
                    <div style={{ height: `${a}%` }}></div>
                    <div style={{ height: `${b}%` }}></div>
                    <div style={{ height: `${c}%` }}></div>
                    <div style={{ height: `${d}%` }}></div>
                </div>
                <div className='id' >
                    <div>A</div>
                    <div>B</div>
                    <div>C</div>
                    <div>D</div>
                </div>
                <div className='closeBtn'>
                    <button onClick={handleClick}>Close</button>
                </div>
            </div>
        </div>
    )
}
