import React, {Component} from 'react'
import axios from 'axios'
import AuthService from "../services/authService";
import {NavLink, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom' 


const Header=()=>{
    const user=AuthService.getCurrentUser();

    if(user){
        if(user.roles.includes("ADMIN")) {
            return(
           
			 <nav className="navbar navbar-expand navbar-dark bg-dark">
				 <div className="navbar-nav mr-auto">
	
                         <li  className="nav-item"><Link to={"/addemployee"} className="nav-link"> Add New Employee </Link></li>
                         <li  className="nav-item"><Link to="/employees" className="nav-link"> All Employees </Link></li>
                         <li  className="nav-item"><Link to={"/workTime"} className="nav-link"> My Work Time </Link></li>

				 </div>
                  <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                                     <a href="/login" className="nav-link" onClick={()=>localStorage.removeItem("user")} >Sign Out </a>
                         </li>
                  </div>

			 </nav>
			 )
        }else {
             return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
				 <div className="navbar-nav mr-auto">
                         <li  className="nav-item"><Link to={"/workTime"} className="nav-link"> My Work Time </Link></li>         
				 </div>

                 <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                                     <a href="/login" className="nav-link" onClick={()=>localStorage.removeItem("user")}>Sign Out </a>
                         </li>
                  </div>
                    
			 </nav>
			 )
        }
    }else{
        return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
				  <div>
					<a className="navbar-brand"> Employees Tracker </a>
				 </div>   
			 </nav>
         
			 
				
			 
             
			
        )
    }
}

export default withRouter(Header)

