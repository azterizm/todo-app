import React, { useEffect } from 'react';
import '../styles/TodoList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, selectAllTodos } from '../state/todoSlice';

export const TodoList = () => {
  const todos = useSelector(selectAllTodos);
  console.log('todos: ', todos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      //Create local storage for this
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const fallbackContent =
    status === 'loading' ? (
      <div className="todo" style={{ border: 'none' }}>
        <div className="content" style={{ opacity: '70%' }}>
          <p>Loading...</p>
        </div>
      </div>
    ) : status === 'error' ? (
      <div className="todo">
        <div className="content">
          <p>{error}</p>
        </div>
      </div>
    ) : !todos[0] ? (
      <div className="todo" style={{ border: 'none', textAlign: 'left' }}>
        <div className="content">
          <p>
            No Todos today, mate! <br />
            Add one below or Go Enjoy!
          </p>
        </div>
      </div>
    ) : (
      ''
    );

  const content = todos.map((todo, i) => {
    const dateTime = new Date(todo.when).toLocaleTimeString();
    const currentDateTime = new Date().toLocaleTimeString();
    const showDate =
      currentDateTime === dateTime
        ? ''
        : new Date(todo.when).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });

    const priority =
      todo.priority[0] === '#' ? (
        <div className="priority" style={{ backgroundColor: todo.priority }}></div>
      ) : (
        <div className={`priority ${todo.priority}`}></div>
      );

    const date = new Date().toLocaleDateString();
    const todoDate = new Date(todo.when).toLocaleDateString();
    if (date >= todoDate) {
      return (
        <div className="todo" key={i}>
          <div className={`status ${todo.status}`}></div>
          <div className="content">
            <p>{todo.todo}</p>
            <pre>{showDate}</pre>
          </div>
          {priority}
        </div>
      );
    }
  });

  return (
    <main>
      <div className="container">
        <div className="heading">
          <h1>TO-DO</h1>
          <h3>NOV 23</h3>
        </div>
        <div id="todoList">
          {fallbackContent}
          {content}
        </div>
        <Link to="/add">
          <button className="addTodoButton">+</button>
        </Link>
      </div>
    </main>
  );
};
