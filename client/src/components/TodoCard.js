import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const TodoCard = ({ todo }) => {
    const message = useMessage()
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [todoo, setTodoo] = useState({todo})
    const [name, setName] = useState('')
    const [des, setDes] = useState('')


    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {

    })
    
    const updateHandler = async event => {
            try {
                const data = await request('/api/todos/update', 'POST', {id: todo._id, 
                  name: todo.name, description: todo.description, newName: name, newDes: des}, {
                Authorization: `Bearer ${auth.token}`
              })
              setTodoo({name: name, description: des})
              message(data.message)
            } catch(e) {}
        }
    
    const nameChange = event => {
      setName(event.target.value)
    }
  
    const descriptionChange = event => {
      setDes(event.target.value)
    }
  
  return (
      <div className="col s12 m7">
        <h2>Ваша задача</h2>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <div className="input-field">
              <input placeholder="Имя"
                onChange={nameChange}
                id="name" type="text" 
                className="yellow-input" 
              />
              <input placeholder="Описание"
                onChange={descriptionChange}
                id="description" type="text" 
                className="yellow-input" 
              />
              <button onClick={updateHandler}>Изменить</button>
              </div>
              <h4>{todoo.name}</h4>
              <p>{todoo.description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}