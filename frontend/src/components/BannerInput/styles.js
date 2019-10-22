import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 10px;

  label {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: 300px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;

    &:hover {
      opacity: 0.7;
    }

    img {
      width: 100%;
      max-height: 300px;
      object-fit: cover;

      background: #eee;
    }

    > span {
      color: var(--text-color-secondary);
    }

    input {
      display: none;
    }
  }

  > span {
    margin-top: 10px;
    display: block;
    color: var(--color-error);
    font-weight: bold;
  }
`;
