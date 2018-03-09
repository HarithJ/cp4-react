import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../misc/logo.png'

class NotFound extends React.Component{

    render () {
        return(
            <div className="ui one column stackable center aligned page grid">
                <div className="column twelve wide four_oh_four">
                <h1><span className='four_oh_four_number'>404</span><br/>We could not cook up this page.</h1>
                <Link to="/">Home page</Link><div className="large-logo"><img src={logo} alt='logo'/></div>
                </div>
            </div>
        );
    }
}

export default NotFound;