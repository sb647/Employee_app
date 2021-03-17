import React, {Component} from 'react'
import axios from 'axios'
import "../style.css";
import authHeader from '../services/authHeader';
import Login from './Login.js'

const URL = "http://localhost:8080/api/role/";

class AddEmployee extends Component {

state= {
	name:'',
	surname:'',
	email:'',
	areaNum: '',
	phone:'',
	position:'',
	password:'',
	image: null

}

	setValue=(e)=> {
         this.setState({ [e.target.name] : e.target.value})

   }
   setImage=(e)=> {
         this.setState({ image : e.target.files[0]})

   }


	handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            name: this.state.name,
			surname: this.state.surname,
			email: this.state.email,
			phone: `${this.state.areaNum} ${this.state.phone}`,
			position: this.state.position,
			password: this.state.password,
			image: null
        };
		axios.post(URL + 'signin', data, {
		  headers: authHeader()
		}).then(response=>{    
				},  error => {alert(error)});

		if(this.state.image ) {
			let img =new FormData();
			img.append('imageFile', this.state.image);
			axios.post(URL + "storeImg/"+this.state.email, img, {
			  headers: {
			  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
			  'content-type': 'multipart/form-data'
			  }
			 });
		}
		

		this.props.history.push('/employees');

	

	 }


	

	render(){
		
		return (

				<div className="card bg-light">
	<article className="card-body mx-auto" style={{"max-width": "400px"}} >
		<h4 className="card-title mt-3 text-center">Add new employee</h4>
		<hr>

		</hr>
	
		<form onSubmit={this.handleSubmit}>
		<div className="form-group input-group">
			<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg></span>
			 </div>
			<input name="name" className="form-control" placeholder="First name" type="text" onChange={this.setValue}/>
		</div>
		<div className="form-group input-group">
			<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
</svg></span>
			 </div>
			<input name="surname" className="form-control" placeholder="Last name" type="text" onChange={this.setValue}/>
		</div>
		<div className="form-group input-group">
    		<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
</svg> </span>
			 </div>
			<input name="email" className="form-control" placeholder="Email address" type="email" onChange={this.setValue}/>
		</div> 
		<div className="form-group input-group">
    		<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-phone" viewBox="0 0 16 16">
  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>
</span>
			</div>
			<select className="custom-select" style={{"max-width": "120px"}} name="areaNum" onChange={this.setValue}>
				<option selected="">+91</option>
				<option value="1">+92</option>
				<option value="2">+95</option>
				<option value="3">+99</option>
			</select>
    		<input name="phone"className="form-control" placeholder="Phone number" type="text" onChange={this.setValue}/>
		</div> 
		<div className="form-group input-group">
    		<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase-fill" viewBox="0 0 16 16">
  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z"/>
</svg> </span>
			</div>
			<select className="form-control" name="position" onChange={this.setValue}>
				<option selected=""> Select job type</option>
				<option>DevOps</option>
				<option>Marketing</option>
				<option>Software Development</option>
				<option>UX/UI design</option>
				<option>Sales</option>
			</select>
		</div> 
		<div className="form-group input-group">
    		<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-lock" viewBox="0 0 16 16">
  <path d="M8 5a1 1 0 0 1 1 1v1H7V6a1 1 0 0 1 1-1zm2 2.076V6a2 2 0 1 0-4 0v1.076c-.54.166-1 .597-1 1.224v2.4c0 .816.781 1.3 1.5 1.3h3c.719 0 1.5-.484 1.5-1.3V8.3c0-.627-.46-1.058-1-1.224zM6.105 8.125A.637.637 0 0 1 6.5 8h3a.64.64 0 0 1 .395.125c.085.068.105.133.105.175v2.4c0 .042-.02.107-.105.175A.637.637 0 0 1 9.5 11h-3a.637.637 0 0 1-.395-.125C6.02 10.807 6 10.742 6 10.7V8.3c0-.042.02-.107.105-.175z"/>
  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
</svg></span>
			</div>
			<input className="form-control" placeholder="Create password" type="password" name="password" onChange={this.setValue}/>
		</div>
		
		<div className="form-group input-group">
    		<div className="input-group-prepend">
				<span className="input-group-text"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
</svg></span>
			</div>
			<input type="file" name="image" onChange={this.setImage}/>
		</div> 

		<div className="form-group">
			<button type="submit" className="btn btn-primary btn-block" disabled= {this.state.email.length === 0 || this.state.password.length===0 || !localStorage.getItem('user')} > Create Account  </button>
		</div>                                                                   
	</form>
	</article>
	</div> 
		)
	
	}
}

export default AddEmployee