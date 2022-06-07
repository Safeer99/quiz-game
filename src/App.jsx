import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import End from "./components/End";
import questions from "./data.json";
let data = [];

function App() {

  const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [removeTimer, setRemoveTimer] = useState(false);
  const [earned, setEarned] = useState("₹ 0");
  const [orientation, setOrientation] = useState(false);
  const [stopCounter, setStopCounter] = useState(true);

  if (data.length === 0) {
    data = questions.sort(() => Math.random() - 0.5);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 500 && window.orientation === 0 && !orientation) {
      setOrientation(true);
    }
    else if (orientation && window.orientation !== 0) {
      setOrientation(false);
    }
  })

  const moneyPyramid = useMemo(() =>
    [
      { id: 1, amount: "₹ 1,000" },
      { id: 2, amount: "₹ 2,000" },
      { id: 3, amount: "₹ 3,000" },
      { id: 4, amount: "₹ 5,000" },
      { id: 5, amount: "₹ 10,000" },
      { id: 6, amount: "₹ 20,000" },
      { id: 7, amount: "₹ 40,000" },
      { id: 8, amount: "₹ 80,000" },
      { id: 9, amount: "₹ 1,60,000" },
      { id: 10, amount: "₹ 3,20,000" },
      { id: 11, amount: "₹ 6,40,000" },
      { id: 12, amount: "₹ 12,50,000" },
      { id: 13, amount: "₹ 25,00,000" },
      { id: 14, amount: "₹ 50,00,000" },
      { id: 15, amount: "₹ 1 Crore" },
      { id: 16, amount: "₹ 7 Crore" }
    ].reverse(),
    []);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find(n => n.id === questionNumber - 1).amount)
  }, [questionNumber, moneyPyramid])

  return (
    <>
      {orientation ? (
        <div className="warning">
          Rotate your device
        </div>
      ) : (
        <div className="App" >
          {!userName ? (
            <>
              <div className="main">
                {stop || questionNumber === 17 ? (<End earned={earned} />
                ) : (
                  <>
                    <div className="top">
                      {!removeTimer && <div className="timer">
                        {<Timer stopCounter={stopCounter} setRemoveTimer={setRemoveTimer} setStop={setStop} questionNumber={questionNumber} />}
                      </div>}
                    </div>
                    <div className="bottom">
                      <Trivia
                        data={data}
                        setStop={setStop}
                        questionNumber={questionNumber}
                        setQuestionNumber={setQuestionNumber}
                        setStopCounter={setStopCounter}
                        stopCounter={stopCounter}
                      />
                    </div>
                  </>
                )
                }
              </div>
              <div className="pyramid">
                <ul className="moneyList">
                  {moneyPyramid.map((element) => (
                    <li key={element.id} className={questionNumber === element.id ? "moneyListItem active" : "moneyListItem"}>
                      <span className="moneyListItemNumber">{element.id}</span>
                      <span className="moneyListItemAmount">{element.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : <Start setUserName={setUserName} />}
        </div>)
      }
    </>
  );
}

export default App;
