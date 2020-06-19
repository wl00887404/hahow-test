import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding: 1em;

  & > *:not(:last-child) {
    margin-bottom: 1em;
  }
`;

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  const { children } = props;

  return <Container>{children}</Container>;
};

export default Layout;
