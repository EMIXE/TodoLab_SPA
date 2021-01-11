import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import {TodoItem} from '../components/TodoItem'
import { useMessage } from '../hooks/message.hook'

export const TodosPage = () => {
    const [todos, setTodos] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const message = useMessage()

    let fetchTodos = useCallback(async () => {
        try {
            const fetched = await request('/api/todos', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodos(fetched)
        } catch(e) { }
    }, [token, request])
    

    async function checkboxHandler(id){
        try {
            const data = await request('api/todos/completed', 'POST', {id: id}, {
                Authorization: `Bearer ${token}`
            })
            setTodos(
                todos.map(todo => {
                  if (todo._id === id) {
                    todo.completed = !todo.completed
                  }
                  return todo
                })
              )
            message(data.message)
        } catch (e) {
            
        }
    }

    async function deleteTodo(id){
        try {
            const data = await request('/api/todos/delete', 'POST', {id: id}, {
                Authorization: `Bearer ${token}`
          })
          setTodos(
              todos.filter(todo => 
                  todo._id !== id
              )
          )
            message(data.message)
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
                    <TodoItem todo={todo} key={todo._id} index={index} deleteHandler={deleteTodo} completedChange={checkboxHandler} />
                )})}
            </ul>
        </div>
        
    )
}