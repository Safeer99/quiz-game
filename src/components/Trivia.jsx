import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

const Trivia = (props) => {

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        letsPlay();
    }, [letsPlay, props.questionNumber])

    useEffect(() => {
        setQuestion(props.data[props.questionNumber - 1])
    }, [props.data, props.questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    }

    const handleClick = (e) => {
        setSelectedAnswer(e);
        setClassName("answer active");
        delay(3000, () =>
            setClassName(e.correct ? "answer correct" : "answer wrong")
        )
        delay(4000, () => {
            if (e.correct) {
                correctAnswer();
                delay(5000, () => {
                    setSelectedAnswer(null);
                    props.setQuestionNumber((p) => p + 1);
                })
            } else {
                wrongAnswer();
                delay(2000, () => {
                    props.setStop(true);
                })
            }
        })
    }

    return (
        <div className='trivia'>
            {/* <div className="lifelines"></div> */}
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answer.map((element) => (
                    <div key={element.text}
                        className={selectedAnswer === element ? className : "answer"}
                        onClick={() => handleClick(element)}
                    >{element.text}
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Trivia
