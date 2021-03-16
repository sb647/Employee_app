import React, {Component} from 'react'
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ListEmployees extends Component {
	
		state = {
			list: [],
			q: '',
			date: null
		}

		addEmployee = this.addEmployee.bind(this);
		removeEmployee = this.removeEmployee.bind(this);
		viewEmployee = this.viewEmployee.bind(this);
		search = this.search.bind(this);
		setAsAdmin = this.setAsAdmin.bind(this);
		filterByDate = this.filterByDate.bind(this);
		setDate = this.setDate.bind(this);
		
		


		 componentDidMount(){
        axios.get('http://localhost:8080/api/role/worktime/')
        .then(response => {
            this.setState ({
                list: response.data
            });
         })
		 }

		 

		 addEmployee() {
			  this.props.history.push('/addemployee/');
		 }

		 viewEmployee(id) {

			  this.props.history.push('/employee/' + id);
		 }

		 removeEmployee(id) {
			 axios.delete('http://localhost:8080/api/role/worktime/' + id)
				.then(response => {
					 alert("OK!");
					 this.props.history.push('/employees');
				 })
		 }

		 setAsAdmin(id) {
			axios.post('http://localhost:8080/api/role/admin/' + id)
				.then(response => {
					 alert("OK!");
					 this.props.history.push('/employees');
				 })

		 }

		  setQ =(e) => {
			 this.setState({q: e.target.value})
		  }

		  setDate(d){
			this.setState({
				date: d
			})
			
		};


		 search(list) {
			  return list.filter(
					(l) => l.employee.name.toLowerCase().indexOf(this.state.q.toLowerCase()) > -1 ||
					l.employee.surname.toLowerCase().indexOf(this.state.q.toLowerCase()) > -1 ||
					`${l.employee.name} ${l.employee.surname}`.toLowerCase().indexOf(this.state.q.toLowerCase()) > -1 
			  );
		 }

		 filterByDate(list)  {
		
			if(this.state.date !== null) {
		
			
				return list.filter(
						(l) => (this.state.date.getTime() == new Date(l.date).getTime()))
			}
			else {
				return list
			}
 
		 }


	render(){
	const date = new Date('2021-03-12');
		return (
			<div className="container">
					<div className="row">
						 <DatePicker format='yyyy-MM-dd' selected={this.state.date ? this.state.date : date} value={this.state.date} onSelect={date => this.setDate(date)} />
						<input type="text" placeholder="Search..." value={this.state.q} onChange={this.setQ} style={{marginLeft:"20px", width: "200px"}}/>
						</div>
					<hr>
					</hr>
				<div className="row">
					<table className="table table-striped table-bordered">
						<thead>
							<tr>
								<th>  ID </th>
								<th>  First Name</th>
								<th>  Last Name</th>
								<th>  Date </th>
								<th>  Starting time</th>
								<th>  Finishing time </th>
								<th>  Options </th>
							</tr>
						</thead>
						<tbody>
							{
								this.filterByDate(this.search(this.state.list)).map(
									l => <tr key = {l.id}>
										<td>{l.employee.id}</td>
										<td>{l.employee.name}</td>
										<td>{l.employee.surname}</td>
										<td>{l.date}</td>
										<td>{l.startTime}</td>
										<td>{l.endTime}</td>
										<td> 
											<button className="btn btn-primary" style={{ width: "80px"}}onClick={() => this.viewEmployee(l.employee.id)}> VIEW </button> 
											<button className="btn btn-primary" style={{marginLeft:"10px", width: "80px"}} onClick={() => this.removeEmployee(l.employee.id)}> DELETE </button>
											<button className="btn btn-primary" style={{marginLeft:"10px"}} onClick={() => this.setAsAdmin(l.employee.id)}> SET AS ADMIN </button>
										</td>
									</tr>
								)
							}
							
						</tbody>

					</table>

				</div>

			
			</div>
		)}
}

export default ListEmployees