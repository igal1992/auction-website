import { useState } from 'react';
import {useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Overview from './overview';
import Stats from './stats';
import Security from './security';
import logo from '../../images/logo.jpg';
function MyAccount(){
    const loggedIn = useSelector(state =>state.isLogged);
    const toggled = 'my-account-header-list-toggled';
    const notToggled = 'my-account-header-list-notToggled'
    const [overviewToggle,setOverViewToggle] = useState(toggled);
    const [securityToggle,setSecurityToggle] = useState(notToggled);
    const [statsToggle,setStatsToggle] = useState(notToggled);
    const [overviewShow,setOverviewShow] = useState(true);
    const [securityShow,setSecurityShow] = useState(false);
    const [statsShow,setStatsShow] = useState(false);
    const email = localStorage.getItem('userEmail');
    const toggler = (name)=>{
        switch(name){
            case 'overview':
                setOverViewToggle(toggled);
                setSecurityToggle(notToggled);
                setStatsToggle(notToggled);
                setOverviewShow(true);
                setSecurityShow(false);
                setStatsShow(false);
                break;
            case 'security':
                setOverViewToggle(notToggled);
                setSecurityToggle(toggled);
                setStatsToggle(notToggled);
                setOverviewShow(false);
                setSecurityShow(true);
                setStatsShow(false);
                break;
            case 'stats':
                setOverViewToggle(notToggled);
                setSecurityToggle(notToggled);
                setStatsToggle(toggled);
                setOverviewShow(false);
                setSecurityShow(false);
                setStatsShow(true);
                break;
        }
    }
    return(
    loggedIn?
    <div id={'my-account-outer'}>
        <div className={'my-account'}>
            <section className='my-account-header'>
                <NavLink to ='/' id ="my-account-logo-container"><img src={logo} id ="my-account-logo"/></NavLink>
                <ul className={'my-account-header-list'}>
                    <li className={overviewToggle} onClick={()=>{toggler('overview')}}>Overview</li>
                    <div className="solid"></div>
                    <li className={securityToggle} onClick={()=>{toggler('security')}}>Security</li>
                    <div className="solid"></div>
                    <li className={statsToggle} onClick={()=>{toggler('stats')}}>Stats</li>
                </ul>
            </section>
            <section className='my-account-conent'>
            {overviewShow?<Overview/>:''}
            {securityShow?<Security/>:''}
            {statsShow?<Stats/>:''}
            </section>
        </div>
    </div>:
    <h1 id='not-logged-in'>Not Logged In</h1>    
    )
}
export default MyAccount;