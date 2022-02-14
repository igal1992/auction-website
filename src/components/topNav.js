import logo from "../images/logo.jpg"
import {NavLink} from 'react-router-dom'
function TopNav(){
    return(
        <section className="TopNav">
            <ul>
                <NavLink to="/" className={({isActive}) => "links" + (isActive ? "-active" :"")} >Home</NavLink>
                <NavLink to="/admin" className={({isActive}) => "links" + (isActive ? "-active" :"")}>Admin</NavLink>
                <NavLink to="/stats" className={({isActive}) => "links" + (isActive ? "-active" :"")}>Stats</NavLink>
            </ul>
        </section>
    );
}
export default TopNav;