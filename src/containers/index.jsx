import React from 'react'
import Header from './Header.jsx'
import { connect } from 'react-redux'

export default class App extends React.Component{
  render(){
    return(
      <div id ="container">
        <Header/>
      </div>
    );
  }
}
