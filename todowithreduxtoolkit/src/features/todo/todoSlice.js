import {createSlice,nanoid} from '@reduxjs/toolkit'
//nanoid used to generate unique id's

//setting initial state of store 

const initialState={
    todos:[{
        id:1,text:"Hello world"   //this object is overall state
    }]
}

export  const todoSlice =createSlice({
    name:'todo',
    initialState,
    reducers:{
        //this are the actions
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload
            }
            state.todos.push(todo)                //state is the object preset above in initialstate
        },
        removeTodo:(state,action)=>{
            state.todos=state.todos.filter((todo)=>(todo.id!==action.payload))
        },
        updateTodo:(state,action)=>{
        //    const todo= state.todos.filter((todo)=>todo.id===action.payload.id)
        //     todo={...todo,text:action.payload.text}
        //     state.todos=[...state.todos,todo]
           state.todos=state.todos.map((singletodo)=>singletodo.id===action.payload.id?singletodo.text=action.payload.text:singletodo)
           
        }
        
    }
})

export const{addTodo,updateTodo,removeTodo} =todoSlice.actions //addtodo, removetodo all are the actions

export default todoSlice.reducer