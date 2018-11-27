import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE, GET_NOTES } from '../actions/types';

const initialState = {
    notes: []
}

export default (state = initialState, action) => {
  switch (action.type) {
        case ADD_NOTE:
            return { 
                ...state,
                notes: [action.payload, ...state.notes] 
            }
        case EDIT_NOTE:
            const { idx, note } = action.payload;
            return {
                ...state,
                notes: state.notes.map((item, i) => {
                    if (i == idx) {
                        return note;
                    } else {
                        return item;
                    }
                })
            }
        case DELETE_NOTE:
            return { 
                ...state,
                notes: state.notes.filter(note => note._id != action.payload)
        }
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload
            }
        default:
            return state
  }
}
