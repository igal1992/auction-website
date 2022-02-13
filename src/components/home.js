import React,{useState} from 'react';
import Login from './login';
import Register from './register';
function Home(){
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);
    return(
        <div>
            <section id = "homeContainer">
                <div id = "homeTitle"><h1 id='homeTitleFirst'>Welcome to</h1><h1 id='homeTitleLast'>Shopify</h1></div>
                    <div id="homeDescription">
                        <p id='homeContent'>Buy / Sell / Enjoy</p>
                        <div id="homeNavigation">
                            <button className= "homeLinks" onClick={()=>{setModalShowLogin(true)}}>Login</button>
                            <button className= "homeLinks" onClick={()=>{setModalShowRegister(true)}}>Register</button>
                        </div>
                        <Login show={modalShowLogin} onHide={()=>{setModalShowLogin(false)}}/>
                        <Register show={modalShowRegister} onHide={()=>{setModalShowRegister(false)}}/>
                </div>
            </section>
        </div>
    );
}
export default Home;