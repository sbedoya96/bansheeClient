import { TASK } from '../actions/types';

export const initialState ={
    tasks: []
}

export default (state = initialState, action)=>{
    switch(action.type){
        case TASK:
            return{
                ...state,
                tasks:action.payload.data.data || []
                
            }
        default:
            return state;

    }
}

