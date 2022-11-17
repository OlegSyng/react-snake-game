import Button from './Button';
import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={classes.navbar}>
            <div className={classes['navbar-score']}>Score<span>4816</span></div>
            <Button>Pause</Button>
            <Button >Exit</Button>
        </div>
    )
};

export default Navbar;