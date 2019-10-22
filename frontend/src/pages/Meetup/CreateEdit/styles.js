import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  /* height: 100vh; */
  margin: 0 auto;
  padding: 30px;
  overflow-y: auto;

  form {
    display: flex;
    flex-direction: column;
    margin: 30px 0;

    > div {
      width: 100%;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      padding: 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    > span {
      color: var(--color-error);
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      align-self: flex-end;
      margin: 5px 0 0;
      padding: 0 15px;
      height: 44px;
      background: var(--color-primary);
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: var(--color-primary-dark);
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;
