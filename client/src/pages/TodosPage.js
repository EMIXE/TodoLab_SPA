import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {TodosList} from '../components/TodosList'
import {useHttp} from '../hooks/http.hook'
import {TodoItem} from '../components/TodoItem'
import { response } from 'express'

export const TodosPage = () => {
    const [todos, setTodos] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    let fetchTodos = useCallback(async () => {
        try {
            const fetched = await request('/api/todos', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodos(fetched)
        } catch(e) { }
    }, [token, request])

    

    async function deleteTodo(id){
        try {
            const data = await request('/api/todos/delete', 'POST', {id: id}, {
                Authorization: `Bearer ${token}`
          }).then(fetchTodos())
            
        } catch(e) {}
        }
    
        useEffect(() => {
            fetchTodos()
        }, [fetchTodos])

    const styles = {
        ul: {
            listStyle: 'none',
            margin: 0,
            padding: 0
        }
    }



    if(loading) {
        return <Loader />
    }

    if(!todos.length) {
        return <p className="center">Задач на данный момент нет!</p>
    }   

    return (
        <div className="wrapper">
            <ul style={styles}>
            {todos.map((todo, index)=> { 
                return(
                    <TodoItem todo={todo} key={todo._id} index={index} deleteHandler={deleteTodo} />
                )})}
            </ul>
        </div>
        
    )
}