export const fadeIn = (name, timeout) => `
  .${name}-enter {
    opacity: 0;
  }

  .${name}-enter-active {
    opacity: 1;
    transition: opacity ${timeout}ms ease-in;
  }
`;

export const fadeOut = (name, timeout) => `
  .${name}-exit {
    opacity: 1;
  }

  .${name}-exit-active {
    opacity: 0;
    transition: opacity ${timeout}ms ease-in;
  }
`;
