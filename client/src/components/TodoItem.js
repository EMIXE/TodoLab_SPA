import React from 'react'
import {Link} from 'react-router-dom'

export const TodoItem = ({todo, index, deleteHandler})  => {

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
                  <span><Link to={`/detail/${todo._id}`}>{todo.name}</Link></span>
                </label>
              </p>
                &nbsp;
              <button className="waves-effect waves-light btn-small" 
                onClick={() => deleteHandler(todo._id)}>Удалить</button>
            </li>
          )
}