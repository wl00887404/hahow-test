import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const spinningAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const blockStyle = css`
  display: block;
  width: 100%;
`;

const loadingStyle = css`
  color: transparent;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    width: 1em;
    height: 1em;
    border: 0.1em solid white;
    border-radius: 50%;
    border-top-color: transparent;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    animation: ${spinningAnimation} 0.5s linear infinite;
  }
`;
type Props = {
  loading?: boolean;
  block?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const FilteredPropsButton = (props: Props) => {
  const { loading, block, children, ...otherProps } = props;

  return <button {...otherProps}>{children}</button>;
};

const Button = styled<typeof FilteredPropsButton>(FilteredPropsButton)`
  text-align: center;
  cursor: pointer;
  user-select: none;
  background-color: rgb(0, 190, 164);
  color: white;
  font-size: 1em;
  padding: 0.5em 1.5em;
  border: none;
  border-radius: 3px;
  font-family: inherit;
  line-height: 1.375;
  position: relative;
  overflow: hidden;
  display: inline-block;
  font-family: inherit;

  &:hover {
    background-color: rgb(0, 149, 144);
  }

  &:disabled {
    background-color: rgb(204, 204, 204);
    cursor: not-allowed;
  }

  ${({ loading }) => loading && loadingStyle};
  ${({ block }) => block && blockStyle};
`;

export default Button;
