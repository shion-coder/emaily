import styled, { keyframes } from 'styled-components';
import tw from 'tailwind.macro';

/* -------------------------------------------------------------------------- */

const bounce = keyframes`
  0%,

  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }

  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
`;

const fade = keyframes`
  0%,

  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
`;

const color = ({ theme }) => {
  return theme === 'dark' ? tw`text-light` : tw`text-dark`;
};

export const Container = styled.div`
  ${tw`w-full flex flex-col justify-center items-center`}
`;

export const Spinner = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  margin: 20px auto 10px auto;
`;

export const Bounce = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00c3b3;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${bounce} 2s ${({ delay }) => delay || null} infinite ease-in-out;
`;

export const Text = styled.div`
  ${tw`mx-auto mt-4 text-sm font-light`}

  ${color}

  letter-spacing: 0.2rem;
  animation: ${fade} 1.25s ease-in-out 0.25s infinite;
`;
