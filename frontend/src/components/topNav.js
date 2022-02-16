import logo from "../images/logo.jpg";
import {NavLink} from 'react-router-dom';
import Login from "./login";
import Register from './register';
import React,{ useEffect, useState} from 'react';
import {FaShoppingCart, FaSearchDollar} from 'react-icons/fa';
import {IoMdArrowDropdown} from 'react-icons/io';
import { Dropdown } from "react-bootstrap";
import {useSelector} from 'react-redux';
import axios from "axios";

function TopNav(){
    const [toSearch,setToSearch] = useState('');
    const [modalShowRegister, setModalShowRegister] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);
    const loggedIn = useSelector(state =>state.isLogged);
    const [userData, setUserData] = useState([]);
    const search  = (e) =>{
        if (e.key==='Enter' || e==='Enter'){
            alert('search working you wanted to search: ' + toSearch)
        }
    }
    useEffect(()=>{
        const email = localStorage.getItem('userEmail');
        axios.post("http://localhost:8080/user/getData",{email})
        .then(res=>{
            setUserData(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[loggedIn])
    return(
        <section className="TopNav">
            <ul id ='topNav-outer'>
                    <NavLink to ='/'><img src={logo} id ="logo"/></NavLink>
                    <div id='searchIcon-container' onClick={()=>{search('Enter')}}><FaSearchDollar id='searchIcon'/></div>
                    <input placeholder={"search"} id = {"searchBar"} value = {toSearch} onKeyUp={search} onChange={(e)=>{setToSearch(e.target.value)}}/>
                    <NavLink to="/auction" className={({isActive}) => "links" + (isActive ? "-active" :"")}>Check sells</NavLink>
                    <Dropdown>
                        <Dropdown.Toggle id="account">
                            {loggedIn>0?'Hello, ' + userData.fullName:'Hello, Account'}
                            <IoMdArrowDropdown/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu id="account-dropdowns">
                            <Dropdown.Item onClick={()=>{setModalShowLogin(true)}} className='account-dropdowns-within'>
                                Login
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={()=>{setModalShowRegister(true)}} className='account-dropdowns-within'>
                                Register
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item className='account-dropdowns-within'>
                                <NavLink to={'/admin'}>Admin</NavLink>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle id='account'>
                            <FaShoppingCart/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        </Dropdown.Menu>
                    </Dropdown>
                    
            </ul>
            <Login show={modalShowLogin} onHide={()=>{setModalShowLogin(false)}}/>
            <Register show={modalShowRegister} onHide={()=>{setModalShowRegister(false)}}/>
        </section>
    );
}
export default TopNav;