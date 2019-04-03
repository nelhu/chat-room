import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import ErrorBoundary from './container/ErrorBoundary';
import Container from './container/container';
import ChatPage from './routes/ChatPage';
import GroupPage from './routes/Group';
import ProfilePage from './routes/Profile';
import UserPage from './routes/User';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ErrorBoundary>
        <Container>
          <Switch>
            <Route path="/" exact component={ChatPage}/>
            <Route path="/profile" exact component={ProfilePage}/>
            <Route path="/chat" exact component={ChatPage}/>
            <Route path="/group" exact component={GroupPage}/>
            <Route path="/user" exact component={UserPage}/>
          </Switch>
        </Container>
      </ErrorBoundary>
    </Router>
  );
}

export default RouterConfig;
