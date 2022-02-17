import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {isLoggedIn, isLoggedOut} from '../actions';
import Login from './login';
import Register from './register';
function Home(){
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);
    const loggedIn = useSelector(state =>state.isLogged);
    const dispatch = useDispatch();
    const userAuthenticated = () =>{
        axios.get("http://localhost:8080/user/userAuth",{
            headers:{
                "x-access-token":localStorage.getItem("token")
            }}).then(res=>{
                dispatch(isLoggedIn());
            }).catch(err=>{
                dispatch(isLoggedOut());
            })
    }
    const userLogout =() =>{
        dispatch(isLoggedOut());
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    }
    useEffect(()=>{
        userAuthenticated();
    },[])
    return(
        <div>
            <section id = "homeContainer">
                <div id = "homeTitle"><h1 id='homeTitleFirst'>Welcome to</h1><h1 id='homeTitleLast'>Shopify</h1></div>
                    <div id="homeDescription">
                        <p id='homeContent'>Buy / Sell / Enjoy</p>
                            {loggedIn?
                            <div id="homeNavigation">
                                <button className='homeLinks'>My Account</button>
                                <button className='homeLinks' onClick={userLogout}>Logout</button>
                            </div>:
                            <div id="homeNavigation">
                                <button className= "homeLinks" onClick={()=>{setModalShowLogin(true)}}>Login</button>
                                <button className= "homeLinks" onClick={()=>{setModalShowRegister(true)}}>Register</button>
                            </div>
                            }
                        <Login show={modalShowLogin} onHide={()=>{setModalShowLogin(false)}}/>
                        <Register show={modalShowRegister} onHide={()=>{setModalShowRegister(false)}}/>
                </div>
            </section>
        </div>
    );
}
export default Home;