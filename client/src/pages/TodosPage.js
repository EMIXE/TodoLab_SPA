import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import {TodosList} from '../components/TodosList'
import {useHttp} from '../hooks/http.hook'

export const TodosPage = () => {
    const [todos, setTodos] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchTodos = useCallback(async () => {
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


    if(loading) {
        return <Loader />
    }

    return (
        <div> 
            {<TodosList todos={todos} />}
        </div>
    )
}