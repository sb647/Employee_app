import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

class AdminOptions extends Component{
    
    render(){
      
        return (
            <ul className="left">
                <li><NavLink to="/addemployee"> Add New Employee </NavLink></li>
                <li><NavLink to="/employees"> All Employees"</NavLink></li>
           </ul>
        )
    }
}

export default AdminOptions