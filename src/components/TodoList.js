import React, { useEffect } from 'react';
import '../styles/TodoList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  selectAllTodos,
  failedTodo,
  checkTodo,
  deleteTodo,
} from '../state/todoSlice';

export const TodoList = ({ showFuture = false }) => {
  const fetchedTodos = useSelector(selectAllTodos);
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);
  const search = useSelector((state) => state.todos.search);
  const dispatch = useDispatch();
  const currentDate = new Date();
  const todos = fetchedTodos.filter((todo) => (search ? todo.todo === search : todo));

  useEffect(() => {
    if (status === 'idle') {
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
            No todos found. <br />
            Try typing clearly in the search bar <br /> or add a new todo from below.
          </p>
        </div>
      </div>
    ) : (
      ''
    );

  todos.forEach((todo) => {
    const currentDay = currentDate.getDate();
    const todoDay = new Date(todo.when).getDate();
    if (todoDay < currentDay) {
      if (todo.status === 'pending') {
        dispatch(failedTodo(todo.id));
      } else if (todo.status === 'success') {
        dispatch(deleteTodo(todo.id));
      }
    }
  });

  const content = todos.map((todo, i) => {
    const dateTime = new Date(todo.when).toLocaleTimeString();
    const currentDateTime = currentDate.toLocaleTimeString();
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

    const date = currentDate.toLocaleDateString();
    const todoDate = new Date(todo.when).toLocaleDateString();

    //Sort this list
    if (showFuture) {
      return (
        <div className="todo" key={i}>
          <div
            className={`status ${todo.status}`}
            onClick={() => {
              dispatch(checkTodo(todo.id));
            }}
          ></div>
          <div className={`content ${todo.status}`}>
            <p>{todo.todo}</p>
            <pre>
              {showDate} {new Date(todo.when).toLocaleDateString()}
            </pre>
          </div>
          {priority}
        </div>
      );
    } else {
      if (todoDate <= date) {
        return (
          <div className="todo" key={i}>
            <div
              className={`status ${todo.status}`}
              onClick={() => {
                dispatch(checkTodo(todo.id));
              }}
            ></div>
            <div className={`content ${todo.status}`}>
              <p>{todo.todo}</p>
              <pre>{showDate}</pre>
            </div>
            {priority}
          </div>
        );
      }
    }
    return '';
  });

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const headerDate =
    months[currentDate.getMonth()].slice(0, 3) + ' ' + currentDate.getDate();

  const headerHeading = showFuture ? 'ALL TO-DO' : 'TO-DO';

  return (
    <main>
      <div className="container">
        <div className="heading">
          <h1>{headerHeading}</h1>
          <h3>{headerDate}</h3>
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
