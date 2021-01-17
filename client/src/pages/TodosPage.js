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
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = React.useState(todos);
    const message = useMessage()


    let fetchTodos = useCallback(async () => {
        try {
            const fetched = await request('/api/todos', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodos(fetched)
        } catch(e) { }
    }, [token, request])
    
    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

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
    
       

    const styles = {
        ul: {
            listStyle: 'none',
            margin: 0,
            padding: 0
        }
    }

    React.useEffect(() => {
        const results = todos.filter(todo =>
          todo.name.toLowerCase().includes(searchTerm)
        );
        if(results.length===0) {
            setSearchResults(todos);
        } else {
            setSearchResults(results);
        }
      }, [searchTerm]);


    if(loading) {
        return <Loader />
    }

    if(!todos.length) {
        return <p className="center">Задач на данный момент нет!</p>
    }   

    const handleChange = event => {
        setSearchTerm(event.target.value);
      };

    function clearSearchInput() {
        setSearchTerm("")
    }

    return (
        
        <div className="wrapper">
            <div class="nav-wrapper">
                <form>
                    <div class="input-field">
                    <input id="search" type="search" 
                    placeholder="Search" value={searchTerm} onChange={handleChange}
                     required />
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons" onClick={clearSearchInput}>clear</i>
                    </div>
                </form>
            </div>
            <ul style={styles}>
                {searchResults.map((todo, index)=> { 
                    return(
                        <TodoItem todo={todo} key={todo._id} index={index} deleteHandler={deleteTodo} completedChange={checkboxHandler} />
                    )})}
            </ul>
        </div>
        
    )
}