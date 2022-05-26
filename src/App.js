import React from 'react';
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

async function gqlCreate (){
console.log('create pressed')
const userData = {
  name:'Lucky',
  email:'lucky008@gmail.com'
}
try{
const userDetails = await API.graphql({query:mutations.createTodo, variables:{input:userData}})
console.log(userDetails)
}
catch(error){
  console.log(error)
}
}


async function gqlRead (){
console.log('Read pressed')
const userDataRead = {
  email:'lucky008@gmail.com'
}
try{
const userDetailsRead = await API.graphql({query:queries.getTodo, variables:{email:userDataRead.email}})
console.log(userDetailsRead.data.getTodo)
}
catch(error){
  console.log(error)
}
}


async function gqlUpdate (){
console.log('Update pressed')
const userDataUpdate = {
  name:'Lucky_123',
  email:'lucky008@gmail.com'
}
try{
const userDetailsUpdate = await API.graphql({query:mutations.updateTodo, variables:{input:userDataUpdate}})
console.log(userDetailsUpdate)
}
catch(error){
  console.log(error)
}
}


async function gqlDelete (){
console.log('Delete pressed')
const userDataDelete = {
  email:'lucky008@gmail.com'
}
try{
const userDetailsDelete = await API.graphql({query:mutations.deleteTodo, variables:{input:userDataDelete}})
console.log(userDetailsDelete)
}
catch(error){
  console.log(error)
}
}


function App() {
  return (
    <div className="App">
    <button onClick={gqlCreate}>Create</button>
    <button onClick={gqlRead}>Read</button>
    <button onClick={gqlUpdate}>Update</button>
    <button onClick={gqlDelete}>Delete</button>
    </div>
  );
}

export default App;