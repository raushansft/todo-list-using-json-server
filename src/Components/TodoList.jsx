import React from 'react'

function TodoList({todos}) {
  return (
    <>
     {todos.map((todo) => (
        <div key={todo.id} style={{display:'flex'}}>
            <h1>{todo.title}</h1>
            
            </div>
      ))}
      
    </>
  )
}

export default TodoList
