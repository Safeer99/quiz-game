import React, { useEffect, useState } from 'react'
import useSound from 'use-sound';
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"
import AudiencePoll from './AudiencePoll';
import PowerPaplu from './PowerPaplu';

const Trivia = (props) => {
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [audiencePollActive, setAudiencePollActive] = useState(false);
    const [selector, setSelector] = useState(null);
    const [lifelineSelector, setLifelineSelector] = useState(false);
    const [animation, setAnimation] = useState({
        first: false, second: false, third: false, fourth: false
    });

    useEffect(() => {
        letsPlay();
    }, [letsPlay, props.questionNumber])

    useEffect(() => {
        setQuestion(props.data[props.questionNumber - 1]);
    }, [props.data, props.questionNumber])

    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    }

    //? audience poll section start
    useEffect(() => {
        if (!audiencePollActive && !props.stopCounter) {
            props.setStopCounter(true);
        }
    }, [props, audiencePollActive])
    const activatePoll = (e) => {
        if (!animation.first) {
            setAnimation({ ...animation, first: true });
            delay(3000, () => {
                setAudiencePollActive(true);
                props.setStopCounter(false);
            })
        }
    }
    //? audience poll section end

    //? flip a question section start
    const flipQuestion = () => {
        if (!animation.second) {
            setAnimation({ ...animation, second: true });
            delay(3000, () => {
                setQuestion(props.data[props.data.length - 1]);
            })
        }
    }
    //? flip a question section end

    //? 50:50 section start
    const fiftyFifty = () => {
        if (!animation.third && selector === null) {
            let a;
            setAnimation({ ...animation, third: true })
            delay(3000, () => {
                question.answer.forEach(element => {
                    if (element.correct) {
                        a = question.answer.indexOf(element)
                    }
                });
                if (a === 0 || a === 3) { setSelector(0) }
                else if (a === 1 || a === 2) { setSelector(1) }
            })
        }
    }
    const finder = (e) => {
        if (selector === 1) {
            if (question.answer.indexOf(e) === 0 || question.answer.indexOf(e) === 3) {
                return true;
            }
        } else if (selector === 0) {
            if (question.answer.indexOf(e) === 1 || question.answer.indexOf(e) === 2) {
                return true;
            }
        }
        return false;
    }
    //? 50:50 section end

    //? lifeline revival start
    useEffect(() => {
        if (!lifelineSelector && !props.stopCounter) {
            props.setStopCounter(true);
        }
    }, [props, lifelineSelector])
    const lifelineRevival = () => {
        if (!animation.fourth && (animation.first || animation.second || animation.third)) {
            setAnimation({ ...animation, fourth: true });
            delay(3000, () => {
                setLifelineSelector(true);
                props.setStopCounter(false);
            })
        }
    }
    //? lifeline revival end

    const handleClick = (e) => {
        props.setStopCounter(false);
        setSelectedAnswer(e);
        setClassName("answer active");
        delay(1500, () =>
            setClassName(e.correct ? "answer correct" : "answer wrong")
        )
        delay(2500, () => {
            if (e.correct) {
                correctAnswer();
                delay(4000, () => {
                    setSelectedAnswer(null);
                    props.setQuestionNumber((p) => p + 1);
                    if (selector !== null) { setSelector(null) }
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
        <>
            {audiencePollActive ? (<AudiencePoll question={question} audiencePollActive={audiencePollActive} setAudiencePollActive={setAudiencePollActive} />) :
                (<div className='trivia'>
                    <div className="lifelines">
                        <div className={animation.first ? "lifeline lifelineActive" : "lifeline"} onClick={activatePoll} ></div>
                        <div className={animation.second ? "lifeline lifelineActive" : "lifeline"} onClick={flipQuestion} ></div>
                        <div className={animation.third ? "lifeline lifelineActive" : "lifeline"} onClick={fiftyFifty} ></div>
                        <div className={animation.fourth ? "lifeline lifelineActive" : "lifeline"} onClick={lifelineRevival} ></div>
                    </div>
                    <div className="question">{question?.question}</div>
                    <div className="answers">
                        {question?.answer.map((element) => (
                            <div key={element.text}
                                className={selectedAnswer === element ? className : "answer"}
                                style={{ color: finder(element) ? "transparent" : "white" }}
                                onClick={() => handleClick(element)}
                            >{element.text}
                            </div>
                        ))}
                    </div>
                </div >)
            }
            {lifelineSelector && <PowerPaplu animation={animation} setAnimation={setAnimation} setLifelineSelector={setLifelineSelector} />}
        </>
    )
}

export default Trivia
