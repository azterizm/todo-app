import React, { useState } from 'react';
import { AddTodo } from './AddTodo';
import { Navbar } from './Navbar';

export const TodoList = () => {
  const [todoScreen, setTodoScreen] = useState(false);

  if (todoScreen) {
    return <AddTodo />;
  }

  return (
    <main>
      <Navbar />
      <div className="container">
        <div className="heading">
          <h1>TO-DO</h1>
          <h3>NOV 23</h3>
        </div>
        <div id="todoList">
          {/* TODO Create separate CSS for each task indicator */}
          <div className="todo">
            <div className="status pending"></div>
            <div className="content">
              <p>Lunch with Helena Barnes</p>
              <pre>11:00AM</pre>
            </div>
            <div className="priority moderate"></div>
          </div>
          <div className="todo">
            <div className="status success"></div>
            <div className="content">
              <p>Buy gifts</p>
            </div>
            <div className="priority normal"></div>
          </div>
        </div>
        <button className="addTodoButton" onClick={() => setTodoScreen(true)}>
          +
        </button>
      </div>
    </main>
  );
};
