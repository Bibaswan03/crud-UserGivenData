import React, { useEffect, useState } from 'react'
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mail, setMail] = useState(null);
  const [deletionMail, setDeletionMail] = useState(null);
  const [updatedName, setUpdateName] = useState(null);

  const userDetails = {
    name: name,
    email: email,
  };

  const addUser = async (userDetails) => {
    console.log('add pressed')
    try {
      const userData = await API.graphql({ query: mutations.createTodo, variables: { input: userDetails } })
      console.log("Response is ", userData.data.createTodo);
    }
    catch (error) {
      console.log("error is", error);
    }
  }

  const listUsers = async () => {
    console.log('list pressed')
    try {
      const userData = await API.graphql({ query: queries.listTodos })
      console.log("List is ", userData.data);
    }
    catch (error) {
      console.log("error is", error);
    }
  }

  const getSelectedUser = async () => {
    console.log('get selected user pressed')
    try {
      const userData = await API.graphql({ query: queries.getTodo, variables: { email:userDetails.email } })
      console.log("Selected user is ", userData.data.getTodo);
    }
    catch (error) {
      console.log("error is", error);
    }
  } 
  
  const deletedMail = {
    email:deletionMail
  }

  const deleteUser = async () => {
    console.log('delete user pressed')
    try {
      const deletedUser = await API.graphql({ query: mutations.deleteTodo, variables: { input: deletedMail } })
      console.log("Deleted user is ",deletedUser.data.deleteTodo);
    }
    catch (error) {
      console.log("error is", error);
    }
  }

  const updatedData = {
    email:mail,
    name:updatedName,
  }

  const updateUser = async (updatedData) => {
    console.log('update pressed')
    try {
      const userData = await API.graphql({ query: mutations.updateTodo, variables: { input: updatedData } })
      console.log("Response is ", userData.data.updateTodo);
    }
    catch (error) {
      console.log("error is", error);
    }
  }

  return (
    <div className="App">
      <h1>Welcome </h1>
      <input type='text' placeholder='Enter name' onChange={(name)=>setName(name.target.value)}/>
      <input type='text' placeholder='Enter email' onChange={(email)=>setEmail(email.target.value)}/>
      <div className='main-div'>
        <button className='inner-div' onClick={()=>addUser(userDetails)}>Add Data</button>
        <button className='inner-div' onClick={()=>listUsers()}>Get Data</button>
      </div>
      <div className='main-div'>
      <input className='inner-div' type='text' placeholder='Enter email for selected user' onChange={(usermail)=>setMail(usermail.target.value)}/>
      <button className='inner-div' onClick={()=>getSelectedUser()}>Get all Data</button>
      </div>
      <div className='main-div'>
      <input className='inner-div' type='text' placeholder='Enter email for deleting the user' onChange={(deletionMail)=>setDeletionMail(deletionMail.target.value)}/>
      <button className='inner-div' onClick={()=>deleteUser()}>Delete user data</button>
      </div>
      <div className='main-div'>
      <input className='inner-div' type='text' placeholder='Enter email for updating user' onChange={(mail)=>setMail(mail.target.value)}/>
      <input className='inner-div' type='text' placeholder='Enter updated name' onChange={(updatedName)=>setUpdateName(updatedName.target.value)}/>
      <button onClick={()=>updateUser(updatedData)}>Update user data</button>
      </div>
    </div>
  );
}

export default App;