import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function MultilineHtmlTag({ text }) {
  const textArray = text.split('\n');

  return (
    <Container className="mht-paragraph">
      {textArray.map((line, index) => (
        <p key={String(index)}>{line}</p>
      ))}
    </Container>
  );
}

MultilineHtmlTag.propTypes = {
  text: PropTypes.string.isRequired,
};
