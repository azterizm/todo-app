import React, { useState } from 'react';
import arrow from '../assets/arrow.svg';
import '../styles/AddTodo.css';
import calender from '../assets/calendar.png';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addTodo } from '../state/todoSlice';
import { animated, useSpring } from 'react-spring';
import { images } from '../develop';

export const AddTodoForm = () => {
  const [todo, setTodo] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [colorInput, setColorInput] = useState('');
  const [showDateTime, setShowDateTime] = useState(false);
  const [priorityInput, setPriorityInput] = useState('normal');
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const inputStyle =
    todo === 'Enter something or close from top' ? { color: 'red' } : { color: 'black' };
  const selectStyle =
    priorityInput === 'normal'
      ? { backgroundColor: '#0083a2' }
      : priorityInput === 'moderate'
      ? { backgroundColor: '#f5c300' }
      : priorityInput === 'important'
      ? { backgroundColor: '#7833f5' }
      : { backgroundColor: '#fff' };
  const positionStyle = showDateTime ? { position: 'static' } : { position: 'relative' };
  const containerStyle = useSpring({
    marginTop: 0,
    from: { marginTop: 500 },
  });

  let DateTimeInput;
  if (showDateTime) {
    const date = new Date().toISOString();
    const minValue = date.slice(0, 11) + '00:00';

    DateTimeInput = (
      <>
        <input
          type="datetime-local"
          name="n"
          id="n"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          min={minValue}
        />
        <button
          onClick={() => {
            setDateTime('');
            setShowDateTime((e) => !e);
          }}
        >
          &#215;
        </button>
      </>
    );
  } else if (!showDateTime) {
    DateTimeInput = (
      <div className="dateTimePicker" onClick={() => setShowDateTime((e) => !e)}>
        <img src={calender} alt="" />
        <p style={{ padding: '20px' }}>Today</p>
      </div>
    );
  }

  let ColorInput;
  if (priorityInput === 'other') {
    ColorInput = (
      <div className="colorInput">
        <input
          type="color"
          name="n"
          id="n"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
        />
        <button onClick={() => setPriorityInput('normal')}>&#215;</button>
      </div>
    );
  } else {
    ColorInput = (
      <div>
        <select
          name="priority"
          id="select-priority"
          value={priorityInput}
          onChange={(e) => setPriorityInput(e.target.value)}
          style={{ ...selectStyle, ...positionStyle }}
        >
          <option value="normal">Normal</option>
          <option value="moderate">Moderate</option>
          <option value="important">Important</option>
          <option value="other">Other...</option>
        </select>
      </div>
    );
  }

  const saveHandler = () => {
    let date, time;
    if (dateTime) {
      const dateTimeInstance = new Date(dateTime);
      date = dateTimeInstance.toLocaleDateString();
      time = dateTimeInstance.toLocaleTimeString();
    } else {
      const dateTimeInstance = new Date();
      date = dateTimeInstance.toLocaleDateString();
      time = dateTimeInstance.toLocaleTimeString();
    }

    let priority;
    if (
      priorityInput === 'normal' ||
      priorityInput === 'important' ||
      priorityInput === 'moderate'
    ) {
      priority = priorityInput;
    } else {
      if (colorInput) {
        priority = colorInput;
      }
    }

    if (todo && priority) {
      dispatch(addTodo(todo, priority, date, time));
      if (image) {
        images
          .child(image.name)
          .put(image)
          .catch((err) => console.error(err));
      }
      history.push('/');
    } else {
      setTodo('Enter something or close from top');
      return '';
    }
  };

  return (
    <animated.div className="container" style={containerStyle}>
      <Link to="/">
        <div className="backButton">
          <p>&#215;</p>
        </div>
      </Link>
      <div className="addTodo">
        <input
          type="text"
          name="todo-input"
          id="input"
          placeholder="Enter new todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={inputStyle}
        />
        {DateTimeInput}
        {ColorInput}
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png image/jpeg"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button id="add-todo" className="submit" onClick={saveHandler}>
        New todo <img src={arrow} alt="Add todo" width="30" height="30" />
      </button>
    </animated.div>
  );
};
