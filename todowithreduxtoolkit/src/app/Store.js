//Configure storecore redux
import {configureStore} from '@reduxjs/toolkit'

import todoReducer from '../features/todo/todoSlice'

//export the store 
//configureStore({}) always take object

export const Store=configureStore({
    reducer : todoReducer
})

