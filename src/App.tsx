import React, { useCallback, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useHistory,
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

const withRouter = (Component: React.FunctionComponent) => () => (
  <Router>
    <Component />
  </Router>
);

const App = () => {
  const [autoFocus, setAutoFocus] = useState<boolean>(false);
  const history = useHistory();

  const onSelect = useCallback(
    (heroId: string) => {
      setAutoFocus(true);
      history.push(`/heroes/${heroId}`);
    },
    [history],
  );

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/heroes/:heroId?">
          <Layout>
            <HeroList onSelect={onSelect} />
            <Route path="/heroes/:heroId">
              <HeroProfile autoFocus={autoFocus} />
            </Route>
          </Layout>
        </Route>
        <Redirect to="/heroes" />
      </Switch>
    </>
  );
};

export default withRouter(App);
