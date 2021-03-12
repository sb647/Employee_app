import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

class AdminOptions extends Component{
    
    render(){
      
        return (
            <ul className="left">
                <li><NavLink to="/profile">My Work Time </NavLink></li>
           </ul>
        )
    }
}

export default AdminOptions