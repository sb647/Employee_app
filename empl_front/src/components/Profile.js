import React, {Component} from 'react'
import axios from 'axios'
import "../style.css";
import authHeader from '../services/authHeader';
import authService from '../services/authService';

const URL = "http://localhost:8080/api/role/";

class Profile extends Component {
	 constructor(props) {
			super(props);

	this.state = {
		user: '',
		img: null
	}
  }

 
	 componentDidMount(){
	  
		 axios.get(URL + "profile/"+ authService.getCurrentUser().id , { headers: authHeader() })
			.then(response => { 
				this.setState ({
				user: response.data
				});
			}).catch(error => {
				alert(error)
			})
		 
		 axios.get(URL + "img/" + authService.getCurrentUser().id, { headers: authHeader() })
		.then(response => {
			this.setState ({
				img: response.data
			});
		 }).catch(error => {
			alert(error)
		 })
		
	 }
	
	render(){
		return (

			<div className="container bootstrap snippets bootdey">
<div className="panel-body inf-content">
	<div className="row">
		<div className="col-md-4">
			<img alt="" style={{width:"600px",  borderRadius: "50%"}} title="" className="img-circle img-thumbnail isTooltip" src= {this.state.img ? this.state.img : 
			"https://bootdey.com/img/Content/avatar/avatar7.png"} data-original-title="Usuario"/>
		</div>
		<div className="col-md-6">
			<strong>Information</strong><br/>
			<div className="table-responsive">
			<table className="table table-user-information">
				<tbody>
					<tr>        
						<td>
							<strong>
								<span className="glyphicon glyphicon-asterisk text-primary"></span>
								ID                                               
							</strong>
						</td>
						<td className="text-primary">
							{this.state.user.id}   
						</td>
					</tr>
					<tr>    
						<td>
							<strong>
								<span className="glyphicon glyphicon-user  text-primary"></span>    
								Name                                                
							</strong>
						</td>
						<td className="text-primary">
							{this.state.user.name}     
						</td>
					</tr>
					<tr>        
						<td>
							<strong>
								<span className="glyphicon glyphicon-cloud text-primary"></span>  
							   Surname                                             
							</strong>
						</td>
						<td className="text-primary">
							{this.state.user.surname}   
						</td>
					</tr>

				   
					<tr>        
						<td>
							<strong>
								<span className="glyphicon glyphicon-eye-open text-primary"></span> 
								Position                                               
							</strong>
						</td>
						<td className="text-primary">
							{this.state.user.position} 
						</td>
					</tr>
					<tr>        
						<td>
							<strong>
								<span className="glyphicon glyphicon-envelope text-primary"></span> 
								Email                                                
							</strong>
						</td>
						<td className="text-primary">
							{this.state.user.email}   
						</td>
					</tr>
					<tr>        
						<td>
							<strong>
								<span className="glyphicon glyphicon-calendar text-primary"></span>
								Phone Number                                               
							</strong>
						</td>
						<td className="text-primary">
						   {this.state.user.phone} 
						</td>
					</tr>
											 
				</tbody>
			</table>
			</div>
		</div>
	</div>
</div>
</div> 
			
		
			 
		)}
}

export default Profile