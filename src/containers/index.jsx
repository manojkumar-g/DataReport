import React from 'react'
import Header from './Header.jsx'
import DataList from './DataList.jsx'

export default class App extends React.Component{
  render(){
    return(
      <div id ="container">
        <Header/>
        <DataList/>
      </div>
    );
  }
}
