import { useEffect, useState } from 'react'
import useSound from 'use-sound';
import wrong from "../assets/wrong.mp3"
import wait from "../assets/wait.mp3"

export default function Timer({ stopCounter, setRemoveTimer, setStop, questionNumber }) {

    const [timer, setTimer] = useState(45);
    const [wrongAnswer] = useSound(wrong);
    const [waiting, { stop }] = useSound(wait);

    useEffect(() => {
        let interval;
        if (timer === 0) {
            wrongAnswer();
            stop();
            return setStop(true);
        }
        else if (timer < 0) { setRemoveTimer(true) }
        else if (stopCounter) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [setStop, timer, wrongAnswer, setRemoveTimer, stop, stopCounter])

    useEffect(() => {
        stop();
        questionNumber <= 5 ? setTimer(45) : questionNumber <= 10 ? setTimer(30) : setTimer(-1);
        waiting();
    }, [questionNumber, waiting, stop])

    return timer;
}
