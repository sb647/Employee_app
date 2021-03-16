import React from "react";
import { withRouter } from 'react-router-dom';
import loginImg from "../empl.png";
import "../style.css";
import AuthService from "../services/authService";
import axios from 'axios';

const URL = "http://localhost:8080/api/auth/login";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.setValue = this.setValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      
        
        this.state = {
          email:'',
          password:''

    };
  }
    
 
   setValue(e){
        this.setState({ [e.target.name] : e.target.value});

   }

   handleSubmit(e){
         e.preventDefault();
          const data = {
             email: this.state.email,
             password:this.state.password
          };
         axios.post(URL, data).then(response=>
         {
            if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
             this.props.history.push('/profile');
        }    else {
                 alert("User not found!")

        }              
            });
      }
        
  
	render() {
		return (

		<div className="container-fluid">

        {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}

  <div className="row no-gutter">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Welcome!</h3>
              <form onSubmit={this.handleSubmit}>
              
                <div className="form-group input-group">
    	       	<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
            </svg> </span>
			 </div>
			<input name="email" className="form-control " placeholder="Email address" type="email" onChange={this.setValue}/>
		       </div> 
              
               <div className="form-group input-group">
               <div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-lock" viewBox="0 0 16 16">
  <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z"/>
  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg></span>
			</div>
			<input className="form-control " placeholder="Password" name="password" type="password" onChange={this.setValue}/>
		</div>

                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit" disabled={this.state.email.length === 0 || this.state.password.length===0}>Sign in</button>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

	

	)}
}

export default withRouter(Login)
