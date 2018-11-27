import React, { Component } from 'react';

class SelectListGroup extends Component {
    constructor(props) {
      super(props);  
    }  
  
    render() {
      
      const {name, value, onChange, options, label} = this.props;
      
      const selectOptions = options.map(option => (
          <option key={option} value={option}>
              {option}
          </option>
      ));
      
      return (
        <div className="form-group">
              <label className="float-left" htmlFor={name}>{label}</label>
              <select              
                  className="form-control form-control-lg"
                  name={name} 
                  value={value}
                  onChange={onChange}>
  
                      {selectOptions}
  
              </select>
          </div>
      )
    }
  
  };
  
  export default SelectListGroup;
              
  