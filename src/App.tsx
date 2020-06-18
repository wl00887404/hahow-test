import React, { useRef, useCallback } from 'react';
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
  const heroProfileContainerRef = useRef<HTMLDivElement>(null);
  const history = useHistory();

  const onSelect = useCallback(
    (heroId: string) => {
      history.push(`/heroes/${heroId}`);

      if (!heroProfileContainerRef.current) return;

      window.scrollTo({
        top: heroProfileContainerRef.current.offsetTop,
        behavior: 'smooth',
      });
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
            <div ref={heroProfileContainerRef}>
              <Route path="/heroes/:heroId">
                <HeroProfile />
              </Route>
            </div>
          </Layout>
        </Route>
        <Redirect to="/heroes" />
      </Switch>
    </>
  );
};

export default withRouter(App);
