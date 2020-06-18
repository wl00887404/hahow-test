import styled, { css, keyframes } from 'styled-components';

const movingAnimation = keyframes`
  from {
    transform:translate(-100%);
  }
  to {
    transform:translate(100%);
  }
`;

export const movingFlashStyle = css`
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 40%,
      rgba(255, 255, 255, 0.3) 60%,
      transparent 100%
    );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: ${movingAnimation} 1s infinite;
  }
`;

const PlaceholderStyle = css`
  background-color: #e8e8e8;
  color: transparent;
  border-radius: 3px;

  &:empty::after {
    content: 'skeleton';
  }

  ${movingFlashStyle};
`;

export const withPlaceholderStyle = (
  Component: React.FunctionComponent,
) => styled(Component)`
  ${PlaceholderStyle};
`;

const Placeholder = styled.div`
  ${PlaceholderStyle};
`;

export default Placeholder;
