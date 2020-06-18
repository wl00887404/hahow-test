import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { css, keyframes } from 'styled-components';

const animationTime = 3000;

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
  }
  80%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
`;

const alertStyle = css`
  position: fixed;
  top: 1em;
  left: 1em;
  right: 1em;
  border-radius: 3px;
  padding: 0.5em;

  animation: ${fadeOutAnimation} ${animationTime}ms forwards;
`;

const Success = styled.div`
  ${alertStyle};
  background-color: rgba(0, 190, 164, 0.8);
  color: white;
`;

const Fail = styled.div`
  ${alertStyle};
  background-color: rgba(208, 1, 27, 0.8);
  color: white;
`;

const root = document.createElement('div');
document.body.appendChild(root);

type Props = {
  type: 'success' | 'fail';
  children: React.ReactNode;
};

const Alert = (props: Props) => {
  const [byeBye, setByeBye] = useState(false);
  const { type, children } = props;

  useEffect(() => {
    const timeout = setTimeout(() => setByeBye(true), animationTime);

    return () => clearTimeout(timeout);
  });

  if (byeBye) return null;
  if (type === 'success') return <Success>{children}</Success>;
  if (type === 'fail') return <Fail>{children}</Fail>;

  return null;
};

export const alert = {
  success: (text: string) =>
    ReactDOM.render(
      <Alert type="success" key={Date.now()}>
        {text}
      </Alert>,
      root,
    ),
  fail: (text: string) =>
    ReactDOM.render(
      <Alert type="fail" key={Date.now()}>
        {text}
      </Alert>,
      root,
    ),
};

export default Alert;
