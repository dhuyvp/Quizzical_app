import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from './NoPage';
import { useRef, useState, useEffect, createContext, useContext } from 'react';
import QuizPage from './QuizPage';
import HomePage from './HomePage';
import ShowResult from './ShowResult';

function App() {
  const [pageId, setPageId] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);

  const [buttonStates, setButtonStates] = useState([-1, -1, -1, -1, -1]);
    const getRandomIndex = ()=> {
      return Math.floor(Math.random()*4) % 4;
  };
  const [correctState, setCorrectState] = useState([0, 0, 0, 0, 0]);

  // useEffect(()=> {
  //   console.log('correct: ', correctState);
  // })

  interface resultItem {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[],   
  }

  interface Items {
      response_code: string,
      results: resultItem[];
  }

  const apiUrl = "https://opentdb.com/api.php?amount=5&type=multiple";
  const [isLoading, setIsLoading] = useState(true);
  const [quizData, setQuizData] = useState<Items>();

  useEffect(() => {
      const fetchData = async() => {
          setIsLoading(false);
          const result = await fetch(apiUrl);
          const items = await result.json();
          setQuizData(items);
          setIsLoading(false);
      };
      fetchData();

      console.log(quizData)
  }, [playAgain]);

  useEffect(()=> {
    console.log('Loading:', isLoading);
    console.log('Data', quizData);
  },[playAgain])

  const [isShowResult, setIsShowResult] = useState(false);

  return (
    pageId===0? (
      <HomePage pageId={pageId} setPageId ={setPageId} isLoading={isLoading} setIsLoading={setIsLoading}/>
    ) 
    :(
      pageId===1?
        <QuizPage pageId={pageId} setPageId ={setPageId} buttonStates={buttonStates} setButtonStates={setButtonStates} quizData={quizData} isShowResult={isShowResult} setIsShowResult={setIsShowResult} correctState={correctState} setCorrectState={setCorrectState}/>
      :(
        pageId===2?
          <ShowResult pageId={pageId} setPageId ={setPageId} buttonStates={buttonStates} setButtonStates={setButtonStates} quizData={quizData}  isShowResult={isShowResult} setIsShowResult={setIsShowResult} correctState={correctState} setCorrectState={setCorrectState} playAgain={playAgain} setPlayAgain={setPlayAgain}/>
        :(
        <NoPage />
        )
    ))
  );
}

export default App;
