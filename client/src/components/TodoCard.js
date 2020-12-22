import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const TodoCard = ({ todo }) => {
    const message = useMessage()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [todoo, setTodoo] = useState(' ')
    const url = "http://localhost:5000/api/todos/delete";


    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    
    const pressHandler = async event => {
        if(event.key === 'Enter') {
            try {
                const data = await request('/api/todos/update', 'POST', {id: todo._id, 
                  name: todo.name, description: todo.description}, {
                Authorization: `Bearer ${auth.token}`
              })
              message(data.message)
                console.log('post completed')
            } catch(e) {}
        }
    }

  return (
      <div className="col s12 m7">
        <h2>Ваша задача</h2>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <div className="input-field">
              <input placeholder={todo.name} 
                    id="todo" type="text" 
                    className="yellow-input" 
                    onChange={e => setTodoo(e.target.value)}
                    onKeyPress={pressHandler}/>
              </div>
              <h4>{todo.name}</h4>
              <p>{todo.description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}