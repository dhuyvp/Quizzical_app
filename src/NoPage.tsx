import {Button} from 'antd'

const NoPage = () => {
    const handleClickBack = (()=> {
        window.location.href = "/";
    });

    return (
        <div className="Main">
            <div className="App-start-div">
                <h1>404</h1>
                <Button type="primary" onClick={handleClickBack}>Get back</Button>
            </div>
        </div>
    )
  };
  
  export default NoPage;