import React from 'react'
import { Motion, spring } from 'react-Motion'
import range from 'lodash/range'

export default class FormStepper extends React.Component{
  constructor(props) {
    super(props)
    this.state = { stepNo:0, formDetails :{
      firstname:'',
      lastname :'',
      dob : '',
      gender:'M',
      txt:''
    }}
  }
  incOrDecStep = (value)=>{
    this.setState({stepNo : this.state.stepNo + value})
  }
  jumpStep = (value) => {
    // let curStep = this.state.stepNo;
    // if(value < curStep)
      this.setState({stepNo : value})
  }
  dots = (i) => {
    let {stepNo} = this.state
    return <i
      className= {stepNo < i ? "fa fa-dot-circle-o"
                  : stepNo == i ? "fa fa-dot-circle-o active"
                  :"fa fa-dot-circle-o compleate"
                   }
      onClick = {
        () => this.jumpStep(i)
      }

       aria-hidden="true"></i>
  }
  render(){
    return(
      <div className ='formbody'>
        <section className="formContent">

        </section>
        <footer>
          {range(5).map(
            n => <span key = {'dotno'+n}>{this.dots(n)}</span>
          )}
        </footer>
      </div>

    )
  }
}
