import React from  'react'
import {connect} from 'react-redux'
import {presets,spring,TransitionMotion} from 'react-motion';
import {getData} from '../actions'
import ToggleMotion from '../components/ToggleMotion.jsx'

class DataList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {visibleData : []}
  }
  componentDidMount(){
    this.props.getData();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps !== undefined){
      this.setState({visibleData: nextProps.data})
    }
  }
  getStyles = () => {
    let {data,name} = this.props
    return data.filter(
      ({firstName}) => firstName.toUpperCase().indexOf(name.toUpperCase()) >=0
    ).map(
      report => ({
        data:report,
        key : report._id,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle),
          marginTop:spring(10,presets.gentle)
        }
      })
    )
  }
  willEnter() {
    return {
      height: 0,
      opacity: 1,
      marginTop:0
    };
  }
  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
      marginTop:spring(0)
    }
  }
  getDefaultStyles = () => this.props.data.map(
    report => ({ key:report._id ,data:report,style: {height: 0, opacity: 1,marginTop:0 } })
  )
  render(){
    return(
      <div className ='results'>

          <TransitionMotion
               defaultStyles={this.getDefaultStyles()}
               styles={this.getStyles()}
               willLeave={this.willLeave}
               willEnter={this.willEnter}
          >
          {
            styles =>
            <section className="datalist">
              {styles.length === 0 ? <h1> No Data To Show </h1> : null}
              {
                styles.map(
                  (s) =>{
                    return(
                      <ToggleMotion {...s} >

                      </ToggleMotion>
                    )

                  }

                )
              }
            </section>

          }
          </TransitionMotion>


      </div>
    )
  }
}

export default connect(
  (store) => ({
    requestPost :store.requestPost,
    successPost : store.successPost,
    failurePost : store.failurePost,
    data : store.data,
    name: store.name
  }),
  {getData}
)(DataList)
