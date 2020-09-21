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
            todo: todo,
            when: date + ' ' + time,
            priority: priority,
            status: 'pending',
          });
        state.todos.push(action.payload);
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

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
export const selectAllTodos = (state) => state.todos.todos;
