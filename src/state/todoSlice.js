import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { db } from './../develop';

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const fetchTodos = await db.collection('todos').get();
  return fetchTodos.docs.map((doc) => doc.data());
});

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    checkTodo: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        const { id, todo, priority, time, date } = action.payload;
        db.collection('todos')
          .doc(id)
          .set({
            id: id,
            todo: todo,
            when: date + ' ' + time,
            priority: priority,
            status: 'pending',
          });
        state.todos.push({
          id: id,
          todo: todo,
          when: date + ' ' + time,
          priority: priority,
          status: 'pending',
        });
      },
      prepare: (todo, priority, date, time) => {
        return {
          payload: {
            id: nanoid(),
            todo,
            priority,
            date,
            time,
          },
        };
      },
    },
    checkTodo: (state, action) => {
      // Find action payload
      state.checkTodo = !state.checkTodo;
      const docRef = db.collection('todos').doc(action.payload);

      if (state.checkTodo) {
        docRef.update({ status: 'success' });
        const target = state.todos.find((todo) => todo.id === action.payload);
        target.status = 'success';
      } else {
        docRef.update({ status: 'pending' });
        const target = state.todos.find((todo) => todo.id === action.payload);
        target.status = 'pending';
      }
    },
    pendingTodo: (state, action) => {
      const docRef = db.collection('todos').doc(action.payload);
      docRef.update({ status: 'pending' });
      const target = state.todos.find((todo) => todo.id === action.payload);
      target.status = 'pending';
    },
    successTodo: (state, action) => {
      const docRef = db.collection('todos').doc(action.payload);
      docRef.update({ status: 'success' });
      const target = state.todos.find((todo) => todo.id === action.payload);
      target.status = 'success';
    },
    failedTodo: (state, action) => {
      const docRef = db.collection('todos').doc(action.payload);
      docRef.update({ status: 'failed' });
      const target = state.todos.find((todo) => todo.id === action.payload);
      target.status = 'failed';
    },
    deleteTodo: (state, action) => {
      const docRef = db.collection('todos').doc(action.payload);
      docRef.delete();
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.todos = state.todos.concat(action.payload);
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  addTodo,
  checkTodo,
  pendingTodo,
  successTodo,
  failedTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
export const selectAllTodos = (state) => state.todos.todos;
