import React from 'react';
import Button from './Button';
import classes from './Navbar.module.css';

const Navbar = (props) => {
    const isGamePaused = props.isPaused;

    return (
        <div className={classes.navbar}>
            <div className={classes['navbar-score']}>Score<span>{props.score}</span></div>
            <Button onClick={props.onPause}>{!isGamePaused ? "Pause" : "Resume" }</Button>
            <Button >Exit</Button>
        </div>
    )
};

export default Navbar;