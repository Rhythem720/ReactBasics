import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice';


const store=configureStore({
    reducer:{
        auth: authReducer
        //here you can add more slices 
    }
})

export default store;