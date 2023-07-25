import { Button } from "antd";
import { useEffect, useState } from "react";


const ShuffleAnswers = (props : any) => { 
    const [answerArray, setAnswerArray] = useState([[props.item.correct_answer, 1],
                            [props.item.incorrect_answers[0], 0],
                            [props.item.incorrect_answers[1], 0],
                            [props.item.incorrect_answers[2],0] ]);
    useEffect(()=> {
        const shuffleArray = () => {
            const shuffledArray = answerArray.sort(() => Math.random() - 0.5);
            setAnswerArray(shuffledArray);
        };

        shuffleArray();
        console.log(answerArray);
        
        const newCorrectAnswer = props.correctState;
        for (let id = 0; id < 4; id++) {
            if (answerArray[id][1] == 1) {
                newCorrectAnswer[props.idItem] = id;
            }
        }

        props.setCorrectState(newCorrectAnswer);
        console.log('Dap an',props.correctState);

    }, []);
    

    const arrayId = [0, 1, 2, 3];
    function getIndexByTarget(target : any) {
        const arrayButtons = document.querySelectorAll('button');

        if (!arrayButtons) return -1;

        for (let i = props.idItem*4; i < props.idItem*4 + 4; i++) {
            if (arrayButtons[i] === target) {
                return i - props.idItem*4;
            }
        }
        return -1;
      }

    const handleClickAnswer = ((event : any) => {
        const arrayButtons = document.querySelectorAll('button');

        if (!arrayButtons) return -1;

        const buttonClicked = event.target;
        arrayId.forEach(index => {
            if (arrayButtons[props.idItem * 4 + index].style )
                arrayButtons[props.idItem * 4 + index].style.background = 'white';    
        });
        const id = getIndexByTarget(buttonClicked);
        if (arrayButtons[props.idItem * 4 + id].style)
            arrayButtons[props.idItem * 4 + id].style.background ='#4D5B9E';

        const newState = props.buttonStates;
        newState[props.idItem]=id;
        props.setButtonStates(newState);

        console.log(props.buttonStates);
        console.log('button', buttonClicked);
        return;
    });

    useEffect(()=> {
        console.log('In ra o shuffle', props.correctState);
    }, [])

    return ( 
        <div>
        {props.isShowResult?
            <div>
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[0][0]}} style={{
                    background: props.correctState[props.idItem]===0?'green': (props.buttonStates[props.idItem]===0?'red':'white'),
                    
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[1][0]}} style={{
                    background: props.correctState[props.idItem]===1?'green': (props.buttonStates[props.idItem]===1?'red':'white'),       
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[2][0]}} style={{
                    background: props.correctState[props.idItem]===2?'green': (props.buttonStates[props.idItem]===2?'red':'white'),
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[3][0]}} style={{
                    background: props.correctState[props.idItem]===3?'green': (props.buttonStates[props.idItem]===3?'red':'white'),
                }}/> 
                
            </div>
            
            :<div>
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[0][0]}} onClick={handleClickAnswer}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[1][0]}} onClick={handleClickAnswer}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[2][0]}} onClick={handleClickAnswer}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[3][0]}} onClick={handleClickAnswer}/> 

            </div>
        }
        </div>
    )
};

export default ShuffleAnswers;