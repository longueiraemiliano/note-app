import React, { Component } from 'react'
import Moment from 'react-moment';
import classnames from 'classnames';

class Note extends Component {
  
  render() {
    const { color, text, title, _id, time, onEdit, onDelete, edit } = this.props;

    return (
        <div className="col-md-4 mb-2">
            <div className={classnames("col-md-12 card card-body mb-3", {
                    "bg-light": edit
                })}                
                style={{                
                    borderLeftColor: color,
                    borderLeftStyle: 'solid',
                    borderLeftWidth: '4px'}}>                                                                                                                                        
                
                <div className="row">
                    <div className="col-md-9">
                        <h5 className="card-title" style={{ color: color }}>
                            {title}                
                        </h5>
                    </div>
                    <div className="col-md-3">
                        <span onClick={() => onDelete(_id)}>
                            <i className="fas fa-trash mt-2 mr-2"
                                style={{
                                    cursor: 'pointer'
                                }}                    
                            />
                        </span>
                        <span onClick={() => {                            
                            onEdit(_id);
                        }}>
                            <i className="fas fa-pen mt-2 mr-2"                                
                                style={{
                                    cursor: 'pointer'
                                }} />
                        </span>
                    </div>
                </div>                                 
                                
                <p className="card-text" style={{
                    overflowY: 'auto',
                    height: '100px',
                    padding: '1rem'
                }}>{text}</p>
                <hr/>
                <Moment format="MMM DD, HH:mm A">{time}</Moment>                    
            </div>
        </div>
    )    
  }
}

export default Note;