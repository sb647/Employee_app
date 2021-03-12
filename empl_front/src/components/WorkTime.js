import React, {Component} from 'react'
import axios from 'axios'
import authService from "../services/authService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class WorkTime extends Component {
	
		state = {
			list: [],
			start : true,
			end : true,
			date: undefined
			}
		filterByDate = this.filterByDate.bind(this);
		setDate = this.setDate.bind(this);

		setDate (d){
			this.setState({
				date: d
			})
		};


		 componentDidMount(){
			axios.get('http://localhost:8080/api/role/worktime/' + authService.getCurrentUser().id )
			.then(response => {
				this.setState ({
					list: response.data
				});
			 })

			 axios.get('http://localhost:8080/api/role/today/' + authService.getCurrentUser().id )
			.then(response => {
				this.setState ({
					start : response.data
				});
			 })

			 axios.get('http://localhost:8080/api/role/endToday/' + authService.getCurrentUser().id )
			.then(response => {
				this.setState ({
					end : response.data
				});
			 })
		 }

		 storeStartingTime() {
			axios.post('http://localhost:8080/api/role/start/' + authService.getCurrentUser().id );
			window.location.reload();
		 }

		 storeEndingTime() {
			axios.post('http://localhost:8080/api/role/end/' + authService.getCurrentUser().id );
			window.location.reload();
		 }

		 filterByDate(list) {
		      if(this.state.date) {
					 return this.state.list.filter(
						(l) => (this.state.date.getTime() === new Date(l.date).getTime()	
			  ))
			  } else {
					return this.state.list;
			  }

			 
		 }

	

	render(){
		const date = new Date();
		return (
			<div className="container">
			<hr>
			</hr>
			<div className="row left" >
			
			 <DatePicker dateFormat={"yyyy-MM-dd"} selected={date} onChange={date => this.setDate(date)} />
			 </div>
					<hr>
					</hr>
				<div className="row">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
							
								<th>  Date </th>
								<th>  Starting time</th>
								<th>  Finishing time </th>
							</tr>
						</thead>
						<tbody>
							{this.filterByDate(this.state.list).map(
									l => <tr key = {l.id}>
								
										<td>{l.date}</td>
										<td>{l.startTime}</td>
										<td>{l.endTime}</td>
									</tr>
								)
							}
							
						</tbody>

					</table>
					<hr>

					</hr>

					<div class="container ">
					  <div class="center">
							<button type="button" class="btn btn-success" style={{width:"80px"}} disabled={this.state.start} onClick = {this.storeStartingTime}> IN </button>
							<button type="button" class="btn btn-danger"  style={{width:"80px", marginLeft:"10px"}} disabled={this.state.end}
							onClick={this.storeEndingTime}> OUT </button>
					  </div>
					</div>
				</div>

			
			</div>
		)}
}

export default WorkTime