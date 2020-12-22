import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {Link} from 'react-router-dom'
import {TodoItem} from '../components/TodoItem'

export const TodosList = ({todos}) => {

    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [todo, setTodo] = useState('')

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
                    // <li className="collection-item" key={todo._id}>
                    //     <label>
                    //         <input className="filled-in" type="checkbox" />
                    //         <span><Link to={`/detail/${todo._id}`}>{todo.name}</Link></span>
                    //     </label>
                    //     <button onClick={deleteHandler}>Удалить</button>
                    // </li>
                )})}
            </ul>
        </div>
        
    )
}