export const initialState = null;


export const UserReducer = (state, action) => {
    if(action.type === 'User')
        return action.payload;
    
    return state;
};