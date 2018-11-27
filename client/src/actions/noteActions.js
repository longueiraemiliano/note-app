import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE, GET_NOTES, GET_ERRORS } from './types';
import axios from 'axios';

export const getNotes = () => dispatch => {
    axios.get("/api/notes")
        .then(res => {
            dispatch({
                type: GET_NOTES,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_NOTES,
                payload: []
            })
        });
}

export const addNote = (payload) => dispatch => {
    axios.post("/api/notes", payload)
        .then(res => {
            dispatch({
                type: ADD_NOTE,
                payload: res.data
            })
        }) 
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })   
};

export const deleteNote = (payload) => dispatch => {
    axios.delete(`/api/notes/${payload}`)
        .then(res => {
            dispatch({
                type: DELETE_NOTE,
                payload
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.ressponse.data
            })
        })     
};

export const editNote = (idx, note) => dispatch => {
    axios.post("/api/notes", note)
        .then(res => {
            dispatch({
                type: EDIT_NOTE,
                payload: { idx: idx, note: res.data }
            })
        }) 
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.ressponse.data
            })
        })     
}

export const clearNotes = () => dispatch => (dispatch({
    type: GET_NOTES,
    payload: []
}))