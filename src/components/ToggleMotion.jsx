import React from 'react'
import {Motion,spring} from 'react-motion'

export default class ToggleMotion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show:false}
  }
  onChange = () =>{
    this.setState({show: !this.state.show})
  }
  render(){
    let {show} = this.state
    let {key,style,data} = this.props
    return(
      <span>
        <Motion
          style = {{
            height: spring(show ? 30 : 0),
            opacity: spring(show ? 1 : 0)
          }}
          >
          {
            ({height,opacity}) => <div className="hidehead" style = {{height : height +'px',opacity}}>
                          <ul>
                            <li>
                              {
                                data.gender === 'M'? <i className="fa fa-male" aria-hidden="true"></i> :
                                data.gender === 'F' ? <i className="fa fa-female" aria-hidden="true"></i> :
                                <i className="fa fa-ban" aria-hidden="true"></i>
                              }
                            </li>
                            <li>
                              <i className="fa fa-calendar" aria-hidden="true"></i> {data.dob}
                            </li>
                            <li>
                              <i className="fa fa-phone" aria-hidden="true"></i> {data.phone}
                            </li>
                          </ul>
                    </div>
          }
        </Motion>
        <div className="singleReport" style = {style}
          onClick = {this.onChange}>

          <h1>{data.firstName +' '+ data.lastName}</h1>
        </div>
        <Motion
          style = {{
            height: spring(show ? 100 : 0),
            opacity: spring(show ? 1 : 0)
          }}
          >
          {
            ({height,opacity}) => <div className="hidefoot" style = {{height : height +'px',opacity}}>
                          <p>
                            Comment : {data.txt}
                          </p>
                    </div>
          }
        </Motion>
      </span>

    )
  }
}
