import React from 'react';
import FormStepper from './FormStepper.jsx'
const modelBody = ({close}) =>
  <div className ='modelContent'>
    <div className = 'close' onClick = {close}>
      <i className="fa fa-times-circle" aria-hidden="true"></i>
    </div>
    <div className = 'modelHeader'>
      <h3>Enter Details</h3>
    </div>
    <div className = 'modelForm'>
      <FormStepper/>
    </div>
  </div>

export default modelBody;
