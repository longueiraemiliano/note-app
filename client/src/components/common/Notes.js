import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import TextFieldGroup from './TextFieldGroup';
import SelectListGroup from './SelectListGroup';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import Note from './Note';
import { addNote, deleteNote, editNote, getNotes } from '../../actions/noteActions';

class Notes extends Component { 

  static propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    getNotes: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.state = {
       _id: '',
       title: '',
       text: '',
       color: '',
       noteId: '',
       notes: [],
       editMode: false,
       errors: {}
    }
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getNotes();
    }
  }

  componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.editMode && this.state._id) {        
        const index = this.props.note.notes.findIndex(note => note._id === this.state._id );
        const note = {
            _id: this.state._id,
            time: Date.now(), 
            title: this.state.title, 
            text: this.state.text, 
            color: this.state.color
        };

        this.props.editNote(index, note);
    } else {
        this.props.addNote({            
            time: Date.now(), 
            title: this.state.title, 
            text: this.state.text, 
            color: this.state.color                  
        }); 
    }
         
    this.setState({
        _id: '',
        time: '', 
        title: '', 
        text: '', 
        color: '',
        editMode: false
    });
  }
    
  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  
  onEdit(_id) {
      const note = this.props.note.notes.find(note => {
        return note._id == _id;
      });
      
      this.setState({
          editMode: true,
          ...note
      });
  }

  onDelete(_id) {    
    const note = this.props.note.notes.find(note => {
        return note._id == _id;
    });

    if (window.confirm(`Are you sure you want to delete this note? \n ${note.title}`)) {
        this.props.deleteNote(_id);
        this.setState({
            _id: '',
            time: '', 
            title: '', 
            text: '', 
            color: '',
            editMode: false
        });
    }    
  }

  render() {
    const { notes } = this.props.note;
    const { errors } = this.state;
    const colors = ["", "Red", "Orange", "Violet", "Green", "Turquoise"]
    
    const noteCards = notes.map((option, i) => (        
        <Note key={i} {...option} edit={option._id === this.state._id} onEdit={this.onEdit} onDelete={this.onDelete} />        
    ));        

    const buttonText = this.state.editMode ? 'Update Note' : 'Add Note';

    return (
      <div className="container">
        <Navbar />
        <div className="row">
            <div className="col-md-12 pt-5">
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-12">        

                            <TextFieldGroup
                                label="Note Title"
                                value={this.state.title}
                                name="title"
                                type="text"
                                onChange={this.onInputChange}
                                error={errors.title} 
                            />
                            
                            <TextAreaFieldGroup 
                                label="Note Text"
                                value={this.state.text}
                                name="text"
                                onChange={this.onInputChange} 
                            />

                            <SelectListGroup  
                                label="Note Color"
                                name="color"
                                value={this.state.color}
                                onChange={this.onInputChange}
                                options={colors}
                            />

                            <div className="container-fluid">
                                <div className="row justify-content-center">                        
                                    <button 
                                        onClick={this.onSubmit} 
                                        type="button" 
                                        style={{width: '200px'}} 
                                        className="btn btn-info btn-block mt-4">
                                        {buttonText}
                                    </button>
                                </div>
                            </div>
                        </div>          
                    </div>    
                </form>
                <div className="container mt-5">
                    <div className="row">                
                        {noteCards}                  
                    </div>
                </div>
            </div>        
        </div>        
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  note: state.note,
  auth: state.auth,
  errors: state.errors
})

const mapDispatchToProps = {
  addNote: addNote,
  deleteNote: deleteNote,
  editNote: editNote,
  getNotes: getNotes
}


export default connect(mapStateToProps, mapDispatchToProps)(Notes);