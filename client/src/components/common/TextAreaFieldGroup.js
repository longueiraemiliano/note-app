import React, { Component } from 'react'

export default class componentName extends Component {
  render() {
    const { name, value, onChange, label } = this.props;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea              
                className="form-control form-control-lg"            
                name={name} 
                value={value}
                onChange={onChange}>
            </textarea>
        </div>
    )
  }
}
