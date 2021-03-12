import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/Login.js'
import ListEmployees from './components/ListEmployees.js'
import Header from './components/Header.js'
import Footer from './components/Footer.js'
import AddEmployee from './components/AddEmployee.js'
import Profile from './components/Profile.js'
import UserProfile from './components/UserProfile.js'
import authService from './services/authService'
import WorkTime from './components/WorkTime.js'


import React from 'react'


class App extends React.Component {

 constructor(props){
    super(props)

  }



render(){
  return (
  <div className="container">


   <BrowserRouter>
    <Header/>
        <div className="App">
        <Switch>
              <Route exact path="/"component={authService.getCurrentUser() ? Profile : Login}  />
             <Route exact path='/login' component={Login} />
             <Route path='/employees' component={ListEmployees} />
             <Route path='/addemployee' exact component={AddEmployee} />
             <Route exact path="/profile" component={Profile} />
             <Route exact path="/workTime" component={WorkTime} />
             <Route exact path="/employee/:id" component={(match)=><UserProfile matchLink={match}/>} />
           
        </Switch>
        </div>
    </BrowserRouter>

    </div>
   
  )}
}

export default App;
