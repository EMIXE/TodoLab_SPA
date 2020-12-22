import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {Link} from 'react-router-dom'

export const TodoItem = ({todo, index})  => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const styles = {
        li: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '.5rem 1rem',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '.5rem'
        },
        input: {
          marginRight: '1rem'
        }
      }


    const deleteHandler = async event => {
        try {
            console.log(todo.id)
            const data = await request('/api/todos/delete', 'POST', {id: todo._id}, {
                Authorization: `Bearer ${auth.token}`
          })

            console.log('post completed')
        } catch(e) {}
        }
        

        return (
            <li style={styles.li}>
              <span //className={classes.join(' ')}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  style={styles.input}
                  //onChange={() => onChange(todo.id)}
                />
                <strong>{index + 1}</strong>
                &nbsp;
                <span><Link to={`/detail/${todo._id}`}>{todo.name}</Link></span>
              </span>
        
              <button className='rm' 
              onClick={deleteHandler}
              >
                &times;
              </button>
            </li>
          )
}