import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {TodoItem} from '../components/TodoItem'

export const TodosList = ({todos}) => {

    //const {request} = useHttp()
    const auth = useContext(AuthContext)
    //const [todo, setTodo] = useState({todos})

   
    const styles = {
        ul: {
            listStyle: 'none',
            margin: 0,
            padding: 0
        }
    }


    if(!todos.length) {
        return <p className="center">Задач на данный момент нет!</p>
    }   

    return (
        <div className="wrapper">
            <ul style={styles}>
            {todos.map((todo, index)=> { 
                return(
                    <TodoItem todo={todo} key={todo.id} index={index}/>
                )})}
            </ul>
        </div>
        
    )
}