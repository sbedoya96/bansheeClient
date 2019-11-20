import { MENU } from '../actions/types';

export const initialState ={
    menuitems: []
}

export default (state = initialState, action)=>{
    switch(action.type){
        case MENU:
            return{
                ...state,
                menuitems:action.payload.data.data || []
                
            }
        default:
            return state;

    }
}

