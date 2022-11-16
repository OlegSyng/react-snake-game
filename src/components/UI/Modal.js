import React, { Fragment } from "react";
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
};

const ModalContainer = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
};

const overlaysContainer = document.getElementById('overlays')

const Modal = (props) => {
    <Fragment>
        {ReactDOM.createPortal(<Backdrop />, overlaysContainer)}
        {ReactDOM.createPortal(<ModalContainer />, overlaysContainer)}
    </Fragment>
};

export default Modal;