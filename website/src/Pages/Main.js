import React from 'react';
import Header from '../components/Header';
import '../styles/font.css';
import '../styles/index.css';

// Using forwardRef to prevent error when using motion's createMotion method
const Main = React.forwardRef((props, ref) => {
    return(
        <Header />
    )
});

export default Main;
