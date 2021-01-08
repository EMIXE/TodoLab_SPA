import React, {useContext, useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import {Link} from 'react-router-dom'

export const TodoItem = ({todo, index, deleteHandler})  => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)

    const [td, setTd] = useState(todo)

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


      
        

        return (
            <li style={styles.li}>
              <p>
                <label>
                  <input type="checkbox" />
                  <span><Link to={`/detail/${td._id}`}>{td.name}</Link></span>
                </label>
              </p>
                &nbsp;
              <button className="waves-effect waves-light btn-small" 
                onClick={() => deleteHandler(td._id)}>Удалить</button>
            </li>
          )
}