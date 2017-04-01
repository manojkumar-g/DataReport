import React from 'react'
import { Motion, spring, presets } from 'react-motion'
import range from 'lodash/range'
import isAlpha from 'validator/lib/isAlpha'
import slice from 'lodash/slice'
import moment from 'moment'
import {connect} from 'react-redux'
import {postData} from '../actions'

class FormStepper extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      stepNo:0,
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

        [{name : 'validDate', desc : 'Must be a validDate', isSolved : false},
         {name : 'past', desc : 'You must Enter past Date', isSolved : false},
         {name: 'Required',desc:'Should not be Null', isSolved:false}],

        [{name: 'Required',desc:'Should select ', isSolved:false}],

        [{name : 'onlynum', desc : 'Must only Contain valid phone number', isSolved : false},
        {name: 'Required',desc:'Should not be Null', isSolved:false}],

       [{name: 'Required',desc:'Should not be Null', isSolved:false}],
       [],[]
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
    let {stepNo,errors} = this.state
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
            <section className="validators">
              {errors[props.ind].map(
                ({name,desc,isSolved}) =>
                    <span
                      key = {name+'valid'+props.ind}
                      className = {isSolved ? 'solved':''}
                      >
                      {!isSolved && <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>}
                      {isSolved && <i className="fa fa-check-square" aria-hidden="true"></i>}
                      {desc}
                    </span>
              )}
            </section>
             {props.children}
           </div>
       }
     </Motion>
    )
  }
  onChange =(e) =>{
      let {formDetails,stepNo,errors} = this.state
      let {name,value} = e.target


      if(stepNo === 0){
        let error = [
          {...errors[0][0],isSolved : isAlpha(value)},
          {...errors[0][1],isSolved : value.length > 0}
        ]
        this.setState({
          formDetails :{
            ...formDetails,
            [name]: value,
          },
          errors:[
            error,
            ...slice(errors,1)
          ]
        })
      }
      else if(stepNo === 1){
        let error = [
          {...errors[1][0],isSolved : isAlpha(value)},
          {...errors[1][1],isSolved : value.length > 0}
        ]
        this.setState({
          formDetails :{
            ...formDetails,
            [name]: value,
          },
          errors:[
            errors[0],
            error,
            ...slice(errors,2)
          ]
        })
      }
      else if(stepNo === 4){
        if (value.length >10) {
          return
        }
        let lastChar = value.charAt(value.length-1)
        if(isNaN(lastChar)){
          return
        }
        let error = [
          {...errors[4][0],isSolved: !isNaN(value) && value.length === 10 },
          {...errors[4][1],isSolved: value.length > 0}
        ]
        this.setState({
          formDetails :{
            ...formDetails,
            [name]: value,
          },
          errors:[
            ...slice(errors,0,4),
            error,
            ...slice(errors,5)
          ]
        })
      }
      else {
        let error = [
          {...errors[5][0],isSolved: value.length > 0}
        ]
        this.setState({
          formDetails :{
            ...formDetails,
            [name]: value,
          },
          errors:[
            ...slice(errors,0,5),
            error,
            [],[]
          ]
        })
      }

  }
  onKeyUp = (e) => {
      if(e.keyCode === 13){
        let {errors,stepNo} = this.state
        if(errors[stepNo].filter(
                            ({isSolved}) => !isSolved
                        ).length === 0)
            this.incOrDecStep(1)
      }
  }
  onDateChange = (e) => {
    let value = e.target.value
    if(value.length >10)
      return
    let lastChar = value.charAt(value.length-1)
    if(isNaN(lastChar) && lastChar !== '/'){
      return
    }
    if((lastChar === '/' && value.length !==3) &&
      (lastChar === '/' && value.length !==6)
      ){
      return
    }

    let {formDetails,errors} = this.state
    if((value.length == 2 && formDetails.dob.length !==3) ||
        (value.length == 5 && formDetails.dob.length !==6)
      )
      value = value+'/'
    let date = moment(value,'DD/MM/YYYY',true).fromNow();
    let error = [
      {...errors[2][0],isSolved: date !== 'Invalid date' },
      {...errors[2][1],isSolved: date.indexOf('ago') > 0 && date !== 'Invalid date' },
      {...errors[2][2],isSolved: value.length > 0},
    ]

    this.setState({
      formDetails : {
        ...formDetails,
        dob : value
      },
      errors : [
        ...slice(errors,0,2),
        error,
        ...slice(errors,3)
      ]
    })
  }
  onGenderClick = (gender) => {
    let{errors} = this.state
    this.setState({
      formDetails : {
        ...this.state.formDetails,
        gender
      },
      stepNo : this.state.stepNo + 1,
      errors:[
        ...slice(errors,0,3),
        [{...errors[3][0],isSolved:true}],
        ...slice(errors,4)
      ]
    })
  }
  submitForm = () => {
    let {errors} = this.state
    let validateFields = errors.map(
      field => field.filter(
        ({isSolved}) => !isSolved
      ).length === 0
    )
    let errorsAt = validateFields.indexOf(false)
    if(errorsAt >=0)
      this.jumpStep(errorsAt)
    else {
      this.props.postData(this.state.formDetails)
      this.incOrDecStep(1)
    }

  }
  render(){

    let { stepNo, formDetails } = this.state
    return(
      <div className ='formbody'>
        <section className='formContent'>
          {range(8).map(
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
                                    <button id = 'submitbtn'
                                      onClick = {this.submitForm}
                                      >
                                        Submit
                                    </button>
                                  </span>
                                </section>

                              </span>
                          }
                          </div>
                        )
                  case 7:
                      return(
                        <div>
                          { stepNo === n &&
                            <span>
                              <h2> {this.props.requestPost && 'Sending Data ...'}
                               {this.props.successPost && 'SuccessFully Added Data ...'}
                              {this.props.failurePost && 'Error happend while Adding Data ...'}</h2>
                              <button id = 'submitbtn'
                                onClick = {() =>{
                                  this.setState(
                                    {
                                      stepNo:0,
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

                                        [{name : 'validDate', desc : 'Must be a validDate', isSolved : false},
                                         {name : 'past', desc : 'You must Enter past Date', isSolved : false},
                                         {name: 'Required',desc:'Should not be Null', isSolved:false}],

                                        [{name: 'Required',desc:'Should select ', isSolved:false}],

                                        [{name : 'onlynum', desc : 'Must only Contain valid phone number', isSolved : false},
                                        {name: 'Required',desc:'Should not be Null', isSolved:false}],

                                       [{name: 'Required',desc:'Should not be Null', isSolved:false}],
                                       [],[]
                                      ]
                                  }

                                  )
                                }}
                                >
                                  Add One More
                              </button>
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
          {range(8).map(
            n => <span key = {'dotno'+n}>{this.dots(n)}</span>
          )}
        </footer>
      </div>

    )
  }
}

export default connect(
  (state) => ({
    requestPost :state.requestPost,
    successPost : state.successPost,
    failurePost : state.failurePost
  }),
  {postData}
)(FormStepper);
