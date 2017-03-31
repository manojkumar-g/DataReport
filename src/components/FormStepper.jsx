import React from 'react'
import { Motion, spring, presets } from 'react-motion'
import range from 'lodash/range'

export default class FormStepper extends React.Component{
  constructor(props) {
    super(props)
    this.state = { stepNo:0,
      formDetails :{
        firstName:'',
        lastName :'',
        dob : '',
        gender:'',
        phone:'',
        txt:''
      },
      errors :[
         [{name : 'alpha', desc : 'Must only Contain Alphabets', isSolved : false},
                      {name: 'Required',desc:'Should not be Null', isSolved:false}],
         [{name : 'alpha', desc : 'Must only Contain Alphabets', isSolved : false},
                      {name: 'Required',desc:'Should not be Null', isSolved:false}],
        [{name : 'validDate', desc : 'You must EnterValid Date', isSolved : false},
                      {name: 'Required',desc:'Should not be Null', isSolved:false}],
        [{name: 'Required',desc:'Should not be Null', isSolved:false}],
        [{name : 'onlynum', desc : 'Must only Contain valid phone number', isSolved : false},
              {name: 'Required',desc:'Should not be Null', isSolved:false}],
       [{name: 'Required',desc:'Should not be Null', isSolved:false}],
      ]
  }
  }
  incOrDecStep = (value)=>{
    this.setState({stepNo : this.state.stepNo + value})
  }
  jumpStep = (value) => {
      this.setState({stepNo : value})
  }
  dots = (i) => {
    let {stepNo} = this.state
    return <i
      className= {stepNo < i ? 'fa fa-dot-circle-o'
                  : stepNo == i ? 'fa fa-dot-circle-o active'
                  :'fa fa-dot-circle-o compleate'
                   }
      onClick = {
        () => this.jumpStep(i)
      }

       aria-hidden='true'></i>
  }
  motionForm = (props) => {
    let {stepNo} = this.state
    return (
      <Motion
       style = {{
         w: spring(stepNo == props.ind ? 100 : 0,presets.gentle),
         op : spring(stepNo == props.ind ? 1:0)
       }}
       >
       {
         ({w,op,dis}) =>
           <div className = 'single' style = {{ width: w+'%', opacity : op ,display: stepNo === props.ind ? 'block' : 'none' }}>

             {props.children}
           </div>
       }
     </Motion>
    )
  }
  onChange =(e) =>{
      this.setState({
        formDetails :{
          ...this.state.formDetails,
          [e.target.name]: e.target.value
        }
      })

  }
  onKeyUp = (e) => {
      if(e.keyCode === 13){
        this.incOrDecStep(1)
      }
  }
  onDateChange = (e) => {
    let value = e.target.value
    let {formDetails} = this.state
    if((value.length == 2 && formDetails.dob.length !==3) || (value.length == 5 && formDetails.dob.length !==6) )
      value = value+'/'
    this.setState({
      formDetails : {
        ...formDetails,
        dob : value
      }
    })
  }
  onGenderClick = (gender) => {
    this.setState({
      formDetails : {
        ...this.state.formDetails,
        gender
      },
      stepNo : this.state.stepNo + 1
    })
  }
  render(){

    let { stepNo, formDetails } = this.state
    return(
      <div className ='formbody'>
        <section className='formContent'>
          {range(7).map(
            n =>
            <this.motionForm ind = {n} key = { 'form' + n }>
              {
                (() =>{
                    switch (n) {
                      case 0:
                        return (

                              <div>
                                { stepNo === n &&
                                <span>
                                  <h2> {'First Name'}</h2>
                                  <input type = 'text'
                                    name = 'firstName'
                                    onChange = {this.onChange}
                                    onKeyUp = {this.onKeyUp}
                                    autoFocus = {true}
                                    value = {formDetails.firstName}
                                  />
                                </span>
                                }
                          </div>

                        )
                      case 1:
                        return (
                          <div>
                            { stepNo === n &&
                              <span>
                                <h2> {'Last Name'}</h2>
                                <input type = 'text'
                                  name = 'lastName'
                                  onChange = {this.onChange}
                                  onKeyUp = {this.onKeyUp}
                                  autoFocus = {true}
                                  value = {formDetails.lastName}
                                />
                              </span>
                          }

                          </div>
                        )
                      case 2:
                        return (
                          <div>
                            { stepNo === n &&
                              <span>
                                <h2> {'Date Of Birth'}</h2>
                                <h3> {'DD/MM/YYYY'} </h3>
                                <input type = 'text'
                                  name = 'dob'
                                  autoFocus = {true}
                                  onChange = {this.onDateChange}
                                  value = {formDetails.dob}
                                  onKeyUp = {this.onKeyUp}
                                />
                              </span>
                          }

                          </div>
                        )
                      case 3:
                        return (
                          <div>
                            <h2> {'Gender'}</h2>
                            <span className = 'gender'>
                              <i className={formDetails.gender !== 'M'? 'fa fa-male' : 'fa fa-male act'}
                                 aria-hidden='true'
                                 onClick = { () => this.onGenderClick('M')}
                              ></i>
                            </span>
                            <span className = 'gender'>
                              <i className={formDetails.gender !== 'F'? 'fa fa-female' : 'fa fa-female act'}
                                aria-hidden='true'
                                onClick = { () => this.onGenderClick('F')}
                              ></i>
                            </span>
                            <span className = 'gender'>
                              <i className={formDetails.gender !== 'NA'? 'fa fa-ban' : 'fa fa-ban act'}
                                aria-hidden='true'
                                onClick = { () => this.onGenderClick('NA')}
                              >

                              </i>
                            </span>
                          </div>
                        )
                      case 4:
                        return (
                          <div>
                            { stepNo === n &&
                              <span>
                                <h2> {'Contact No'}</h2>
                                <input type = 'text'
                                  name = 'phone'
                                  autoFocus = {true}
                                  onChange = {this.onChange}
                                  value = {formDetails.phone}
                                  onKeyUp = {this.onKeyUp}
                                />
                              </span>
                          }

                          </div>
                        )
                        case 5:
                          return (
                            <div>
                              { stepNo === n &&
                                <span>
                                  <h2> {'Comment'}</h2>
                                  <textarea
                                    className = 'comment'
                                    name = 'txt'
                                    onChange = {this.onChange}
                                    onKeyUp = {this.onKeyUp}
                                    autoFocus = {true}
                                    value = {formDetails.txt}
                                  />
                                </span>
                            }

                            </div>
                          )
                      case 6:
                        return(
                          <div>
                            { stepNo === n &&
                              <span>
                                <section className = 'summary'>
                                  <span>
                                    First Name : {formDetails.firstName}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(0)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    Last Name : {formDetails.lastName}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(1)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    Gender : {formDetails.gender}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(3)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    DOB : {formDetails.dob}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(2)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    Phone : {formDetails.phone}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(4)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    Comment : {formDetails.txt.substr(0, 10)+'...'}
                                    <i className="fa fa-pencil" aria-hidden="true"
                                      onClick = {
                                        () => this.jumpStep(5)
                                      }
                                      ></i>
                                  </span>
                                  <span>
                                    <button id = 'submitbtn'>Submit</button>
                                  </span>
                                </section>

                              </span>
                          }
                          </div>
                        )

                    }

                })()

              }

             </this.motionForm>
          )}
        </section>
        <footer>
          {range(7).map(
            n => <span key = {'dotno'+n}>{this.dots(n)}</span>
          )}
        </footer>
      </div>

    )
  }
}
