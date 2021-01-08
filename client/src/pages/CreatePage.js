import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const CreatePage = () => {
    const {request} = useHttp()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [todo, setTodo] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/todos/create', 'POST', {name: todo}, {
                Authorization: `Bearer ${auth.token}`
              })
                message('Добавлено')
            } catch(e) {}
        }
    }

    return (
        <div className ="row">
             <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <h1>Create Todo</h1>
                <div className="input-field">
                    <input placeholder="Введите название" 
                    id="todo" type="text" 
                    className="yellow-input" 
                    onChange={e => setTodo(e.target.value)}
                    onKeyPress={pressHandler}/>
                    <label htmlFor="email">Название</label>

                </div>
             </div>
            
        </div>
    )
}