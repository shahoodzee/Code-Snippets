// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
// const reducer = (state = [], action) => { since all our states are related to posts we can rename state to  posts 

/* eslint-disable import/no-anonymous-default-export */
export default (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload; // state

        case 'FETCH':
            return posts.some(post => post._id === action.payload._id) ? posts.map(post => post._id === action.payload._id ? action.payload : post) : [...posts, action.payload];
        
        case 'CREATE':
            return [...posts, action.payload];
            
        case 'UPDATE':
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload);    
        
        default:
            return posts;
    }
}