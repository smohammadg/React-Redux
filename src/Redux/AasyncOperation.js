const { createStore, applyMiddleware }  = require('redux');
const thunk = require('redux-thunk').default;
const axios = require('axiox');

// created constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'FETCH_USERS_FAIL';

// initial data
const initialState = {
   users: [],
   error: '',
   isLoading: false
}

// create actions
const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}
const fetchUsersSuccess = () => {
    return {
        type: FETCH_USERS_SUCCESS,
        data: users
    }
}
const fetchUsersFail = () => {
    return {
        type: FETCH_USERS_FAIL,
        data: error
    }
}

// create  reducer
const usersReducers = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST: 
            return { ...state, isLoading: true }
        case FETCH_USERS_SUCCESS: 
            return { isLoading: false, users: action.data, error: ''}
        case FETCH_USERS_FAIL: 
            return { isLoading: false, users: [], error: action.data}
        default: 
            return state;
    }
}

// creating async function
const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUsersRequest());
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            const data = res.data;
            dispatch(fetchUsersSuccess(data))
        })
        .catch((error) => {
            dispatch(fetchUsersFail(error))
        })
    }
}

const store = createStore(usersReducers, applyMiddleware(thunk));
store.subscribe(() => {console.log(store.getState())});

// dispatch async operation
store.dispatch(fetchUsers());