import React from 'react'
import { connect } from 'react-redux'
import { toggleModel, filterByName } from '../actions'
import ModelBody from '../components/ModelBody.jsx'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name : ''}
  }
  onChange = (e) =>{
    this.props.filterByName(e.target.value)
  }
  render(){
    const { toggleModel, isOpen, name } = this.props
    return(
      <header>
        <h1><span>The</span> Report</h1>
        <section className = 'searchBox'>
          <article>
            <input type = 'text'
              placeholder = 'Search By Name'
              onChange = {this.onChange}
              value = { name }
            />
            <button
              onClick = {toggleModel}
            >
              <span

                >
                  New <i className="fa fa-plus" aria-hidden="true"></i>
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
  (store) => ({
    isOpen : store.isModelOpen,
    name : store.name
  }),
  { toggleModel,filterByName }
)(Header)
