import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { Navbar } from './components/Navbar';
import { AddTodoForm } from './components/AddTodoForm';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './develop';
import { Login } from './components/Login';
import { animated, useTransition } from 'react-spring';

const App = () => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { width: '50%', opacity: 0 },
    enter: { width: '100%', opacity: 1 },
    leave: { display: 'none' },
  });
  const loadingStyle = {
    position: 'absolute',
    top: 240,
    left: '10%',
    width: '100%',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 'bold',
    color: 'grey',
  };

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={props}>
          <Route exact path="/">
            <Navbar selected={'home'} />
            <TodoList />
          </Route>
          <Route
            exact
            path="/all"
            render={() => (
              <>
                <Navbar selected={'all'} />
                <TodoList showFuture />
              </>
            )}
          />
        </animated.div>
      ))}
      <Route exact path="/add" component={AddTodoForm} />
    </div>
  );
};

export default App;
