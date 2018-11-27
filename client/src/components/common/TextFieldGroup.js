import React, { Component } from 'react'
import classnames from 'classnames';

class TextFieldGroup extends Component {

    render() {
        const { type, name, value, onChange, label, error, placeholder } = this.props;

        return (
          <div className="form-group">
            <label className="float-left" htmlFor={name}>{label}</label>
            <input 
              type={type} 
              className={classnames("form-control form-control-lg", {
                'is-invalid': error
              })}
              placeholder={placeholder}
              name={name} 
              value={value}
              onChange={onChange}
            />
            {error && (<div className="invalid-feedback">{error}</div>)}
          </div>
        )
    }
}

export default TextFieldGroup;