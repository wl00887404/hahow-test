import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Layout from './components/Layout';
import HeroList from './pages/HeroList';
import HeroProfile from './pages/HeroProfile';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: monospace, sans-serif;
  }

  body {
    background-color: #f0f2f5;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/heroes/:heroId?">
            <Layout>
              <HeroList />
              <Route path="/heroes/:heroId">
                <HeroProfile />
              </Route>
            </Layout>
          </Route>
          <Redirect to="/heroes" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
