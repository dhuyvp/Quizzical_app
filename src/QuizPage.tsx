import { useContext, useEffect, useState } from 'react';
import './QuizPage.css'
import {Button} from 'antd'
import ShuffleAnswers from './ShuffleAnswers';
import { createContext } from 'react';
const QuizPage = ((props:any)=> {
    const handleClickCheckAnswers = (() => {
        props.setIsShowResult(false);
        props.setPageId(2);
    })

    useEffect(()=> {
        props.setIsShowResult(false);
    }, [])

    return (
        <div className='Main'>
            <div className='Quiz-div'>
                <div>
                    {props.quizData?.results.map((item :any, idItem:any)=> (
                        <div key={idItem}>
                            <div className='Question-div'>
                                <div className='Question-text-div'
                                dangerouslySetInnerHTML={{__html:item.question}}/>
                                <div className='Button-answer-div'>
                                
                                    <ShuffleAnswers item={item} buttonStates={props.buttonStates} setButtonStates={props.setButtonStates} idItem={idItem} isShowResult={props.isShowResult} correctState={props.correctState} setCorrectState={props.setCorrectState}/>
                                    
                                </div>
                                <div style={{
                                    height:'0.5px', 
                                    width:'1000px',
                                    background:'#DBDEF0'
                                }}/>
                            </div>
                        
                        </div>
                    ))}
                    <div style={{
                        display:'flex',
                        // justifyContent:'center',
                        // alignItems:'center',
                        marginTop:'20px',
                        marginLeft:'500px',
                    }}>
                        <Button type="primary" onClick={handleClickCheckAnswers}>Check answers</Button>  
                    </div>
                      

                </div>
    
            </div>
            
        </div>
    )
});

export default QuizPage;