import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { Navbar } from './components/Navbar';
import { AddTodoForm } from './components/AddTodoForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './develop';
import { Login } from './components/Login';

const App = () => {
  const [user] = useAuthState(auth);
  if (!user) {
    return <Login />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <TodoList showFuture={false} />
        </Route>
        <Route exact path="/add" component={AddTodoForm} />
        <Route
          exact
          path="/all"
          render={() => (
            <>
              <Navbar />
              <TodoList showFuture={true} />
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
