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
            arrayButtons[props.idItem * 4 + id].style.background ='#D6DBF5';

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
                    background: props.correctState[props.idItem]===0?'#94D7A2': (props.buttonStates[props.idItem]===0?'#F8BCBC':'white'),
                    
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[1][0]}} style={{
                    background: props.correctState[props.idItem]===1?'#94D7A2': (props.buttonStates[props.idItem]===1?'#F8BCBC':'white'),       
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[2][0]}} style={{
                    background: props.correctState[props.idItem]===2?'#94D7A2': (props.buttonStates[props.idItem]===2?'#F8BCBC':'white'),
                }}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[3][0]}} style={{
                    background: props.correctState[props.idItem]===3?'#94D7A2': (props.buttonStates[props.idItem]===3?'#F8BCBC':'white'),
                }}/> 
                
            </div>
            
            :<div>
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[0][0]}} onClick={handleClickAnswer} style={{background:'white'}}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[1][0]}} onClick={handleClickAnswer} style={{background:'white'}}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[2][0]}} onClick={handleClickAnswer} style={{background:'white'}}/> 
                <button className='Button-answer' dangerouslySetInnerHTML={{__html:answerArray[3][0]}} onClick={handleClickAnswer} style={{background:'white'}}/> 

            </div>
        }
        </div>
    )
};

export default ShuffleAnswers;