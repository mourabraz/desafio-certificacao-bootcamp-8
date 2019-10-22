import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export const Container = styled.div`
  .react-datepicker__navigation {
    background: none;
    width: 0;
    padding: 0;
    border: 0.45rem solid transparent;
    height: 10px;
  }

  .react-datepicker__navigation--previous {
    border-right-color: #ccc;
  }
  .react-datepicker__navigation--next {
    border-left-color: #ccc;
  }

  .react-datepicker__navigation--previous:hover {
    border-right-color: #b3b3b3;
    background: none;
  }
  .react-datepicker__navigation--next:hover {
    border-left-color: #b3b3b3;
    background: none;
  }

  .react-datepicker__navigation--next--with-time:not(.react-datepicker__navigation--next--with-today-button) {
    right: 90px;
  }

  > span {
    margin-bottom: 10px;
    display: block;
    color: var(--color-error);
    font-weight: bold;
  }
`;
