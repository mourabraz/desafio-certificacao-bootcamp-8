import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      font-size: 3.2rem;
      font-weight: bold;
    }

    > div {
      display: flex;

      button {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 0;
        border-radius: 4px;

        padding: 10px 15px;

        svg {
          margin-right: 5px;
        }
      }

      button.edit {
        background: var(--color-info);
        margin-right: 10px;

        &:hover {
          background: var(--color-info-dark);
        }
      }

      button.cancel {
        background: var(--color-primary);

        &:hover {
          background: var(--color-primary-dark);
        }
      }
    }
  }

  @media (max-width: 768px) {
    header {
      flex-direction: column;

      > div {
        margin-top: 15px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  img {
    height: 300px;
    object-fit: cover;
  }

  > div {
    display: flex;
    justify-content: start;
    align-items: center;
    color: var(--text-color-secondary);
    padding: 30px;

    time {
      margin-right: 30px;
    }
  }
`;
