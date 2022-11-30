import {Link, NavLink} from 'react-router-dom';
import classes from "./header.module.scss";

const Header = () => {
  return (
 
    <nav className={classes.nav_container}>
        <div className={classes.nav_body}>
        <h1>audiophile</h1>
        <ul className={classes.nav_list}>
            <li>
                <NavLink to="/home" className = {({isActive})=> isActive? classes.active: ''}>HOME</NavLink>
            </li>
            <li>
                <NavLink to="/earphones" className = {({isActive})=> isActive? classes.active: ''}>EARPHONES</NavLink>
            </li>
            <li>
                <NavLink to="/speakers" className = {({isActive})=> isActive? classes.active: ''}>SPEAKERS</NavLink>
            </li>
            <li>
                <NavLink to="/headphones" className = {({isActive})=> isActive? classes.active: ''}>HEADPHONES</NavLink>
            </li>
        </ul>
        <a >
        <img src="/images/cart.png" alt="" />
        </a>
     
        </div>
     
    </nav>
  );
};

export default Header;
