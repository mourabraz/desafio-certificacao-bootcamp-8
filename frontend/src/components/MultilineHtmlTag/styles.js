import styled from 'styled-components';

export const Container = styled.div`
  &.mht-paragraph {
    flex-direction: column;
    padding: 30px 0 0 0;
    color: var(--text-color);
    align-items: flex-start;
    justify-content: start;

    > p {
      margin-top: 10px;
      line-height: 2.4rem;
    }
  }
`;
