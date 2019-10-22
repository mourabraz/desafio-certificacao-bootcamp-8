import styled from 'styled-components';

export const Container = styled.div`
  background: var(--background-header);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    span.logo {
      margin-right: 20px;
      padding-right: 20px;
      /* border-right: 1px solid #eee; */
    }

    a {
      font-weight: bold;
      color: #fff;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  /* border-left: 1px solid #eee; */

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #ddd;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 1.2rem;
      color: #aaa;
    }
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    background: var(--color-primary);
    margin-left: 15px;

    &:hover {
      background: var(--color-primary-dark);
    }
  }
`;
