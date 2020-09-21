import React, { useState } from 'react';
import arrow from '../assets/arrow.svg';

export const AddTodo = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  console.log('date: ', date);
  return (
    <section id="addTodo">
      <div className="backButton">&#215;</div>
      <input
        type="text"
        name="task-input"
        id="input"
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="date"
        name="task-date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button id="add-task" className="submit">
        New task <img src={arrow} alt="Add task" width="30" height="30" />
      </button>
    </section>
  );
};
