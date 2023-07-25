import {Button} from 'antd'
import './HomePage.css'

const HomePage = ((props: any) => {
    
    const handleClickStart = (()=> {
        if(!props.isLoading) props.setPageId(1) ;
    });

    return( 
        <div className='Main'>
            <div className='App-start-div'>
                <div className='Name-home'>Quizzical</div>
                <div className='Description-home'>Some description if needed</div>
                <Button type="primary" onClick={handleClickStart} className='Start-quiz'>Get start</Button>
            </div>
        </div>
    )
});

export default HomePage;