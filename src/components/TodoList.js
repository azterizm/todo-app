import React, { useEffect } from 'react';
import '../styles/TodoList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectAllTodos } from '../state/todoSlice';

export const TodoList = () => {
  const todos = useSelector(selectAllTodos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      //Create local storage for this
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const content =
    status === 'loading' ? (
      <div className="todo" style={{ border: 'none' }}>
        <div className="content">
          <p>Loading...</p>
        </div>
      </div>
    ) : status === 'succeeded' ? (
      todos.map((todo, i) => {
        const date = new Date().toLocaleDateString();
        const todoDate = new Date(todo.when).toLocaleDateString();

        if (date >= todoDate) {
          return (
            <div className="todo" key={i}>
              <div className={`status ${todo.status}`}></div>
              <div className="content">
                <p>{todo.todo}</p>
                <pre>
                  {new Date(todo.when).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </pre>
              </div>
              <div className={`priority ${todo.priority}`}></div>
            </div>
          );
        }
        return '';
      })
    ) : status === 'error' ? (
      <div className="todo">
        <div className="content">
          <p>Error. Please try again.</p>
        </div>
      </div>
    ) : (
      <div className="todo">{error}</div>
    );

  // const content =
  //   status === 'loading' ? (
  //     <div className="todo" style={{ border: 'none' }}>
  //       <div className="content">
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   ) : status === 'succeeded' ? (
  //     todos.map((todo, i) => {
  //       const date = new Date().toLocaleDateString();
  //       const todoDate = new Date(todo.when).toLocaleDateString();

  //       if (date >= todoDate) {
  //         return (
  //           <div className="todo" key={i}>
  //             <div className={`status ${todo.status}`}></div>
  //             <div className="content">
  //               <p>{todo.todo}</p>
  //               <pre>
  //                 {new Date(todo.when).toLocaleTimeString([], {
  //                   hour: '2-digit',
  //                   minute: '2-digit',
  //                 })}
  //               </pre>
  //             </div>
  //             <div className={`priority ${todo.priority}`}></div>
  //           </div>
  //         );
  //       }
  //       return '';
  //     })
  //   ) : status === 'error' ? (
  //     <div className="todo">
  //       <div className="content">
  //         <p>Error. Please try again.</p>
  //       </div>
  //     </div>
  //   ) : (
  //     <div className="todo">{error}</div>
  //   );

  return (
    <main>
      <div className="container">
        <div className="heading">
          <h1>TO-DO</h1>
          <h3>NOV 23</h3>
        </div>
        <div id="todoList">
          {content}
          {todos.map((todo) => (
            <p>{todo.todo}</p>
          ))}
        </div>
        <Link to="/add">
          <button className="addTodoButton">+</button>
        </Link>
      </div>
    </main>
  );
};
