import classes from './Board.module.css';

const Board = (props) => {
    return (
        <div className={classes['game-board__background']}>
            <div className={classes['game-board']}>{props.children}</div>
        </div>
    )
};

export default Board;