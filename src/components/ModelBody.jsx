import React from 'react';
import FormStepper from './FormStepper.jsx'
const modelBody = ({close}) =>
  <div className ='modelContent'>
    <div className = 'close' >
      <i className="fa fa-times-circle" aria-hidden="true" onClick = {close}></i>
    </div>
    <div className = 'modelForm'>
      <FormStepper/>
    </div>
  </div>

export default modelBody;
