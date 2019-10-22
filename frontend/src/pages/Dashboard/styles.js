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

    button {
      width: 140px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 0;
      border-radius: 4px;
      background: var(--color-primary);
      padding: 10px 15px;

      &:hover {
        background: var(--color-primary-dark);
      }
    }
  }
`;

export const MeetupsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

export const Meetup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);

  & + div {
    margin-top: 10px;
  }

  p {
    font-weight: bold;
    font-size: 1.8rem;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;

    time {
      color: var(--text-color-secondary);
    }

    button {
      border: 0;
      background: transparent;
      margin-left: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
