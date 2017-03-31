import React from 'react'
import { connect } from 'react-redux'
import { toggleModel } from '../actions'
import ModelBody from '../components/ModelBody.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const {toggleModel,isOpen} = this.props
    return(
      <header>
        <h1><span>The</span> Report</h1>
        <section className = 'searchBox'>
          <article>
            <input type = 'text' placeholder = 'Search By Name'/>
            <button
              onClick = {toggleModel}
            >
              <span

                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
              </span>
            </button>
          </article>
          <input type = 'radio' id='model' checked = {isOpen}/>
          <label htmlFor="model" className = 'modelWindow'>
            <div className ='modelbody'>
              {
                isOpen && <ModelBody close = {toggleModel}/>
              }
            </div>
          </label>
        </section>
      </header>
    )
  }
}

export default connect(
  (state) => ({
    isOpen : state.isModelOpen
  }),
  {toggleModel}
)(Header)
