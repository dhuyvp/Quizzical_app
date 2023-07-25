import {Button} from 'antd'
import { useContext, useEffect, useState } from 'react';
import ShuffleAnswers from './ShuffleAnswers';

const ShowResult = (props:any) => {
    const handleClickAgain = (()=> {
        props.setPlayAgain(!props.playAgain);
        props.setIsShowResult(false);
        props.setButtonStates([-1, -1, -1, -1, -1]);
        props.setPageId(0);

        console.log(props.buttonStates);
        console.log('correct state', props.correctState)
    });

    useEffect(()=> {
        props.setIsShowResult(true);
    }, [])

    const countCorrectAnswers = (()=> {
        let result = 0;
        for(let i = 0; i < 5; i++) {
            if (props.buttonStates[i]==props.correctState[i]) result++;
        }

        return result
    });

    return (
        <div>
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
                </div>
                                
                <div style={{
                        display:'flex',
                        // justifyContent:'center',
                        alignItems:'center',
                        marginTop:'20px',
                        marginLeft:'500px',
                    }}>
                    <div>You scored {countCorrectAnswers()}/5 correct answers</div>
                    <Button type='primary' onClick={handleClickAgain}>Play again</Button>
                </div>
            </div>
            
        </div>
    )

};

export default ShowResult;