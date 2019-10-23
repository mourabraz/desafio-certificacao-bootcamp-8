import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DateForm, DateText, DateButton } from './styles';

export default function DateInput({ date, onChange }) {
  const [isMinDate, setIsMinDate] = useState(true);
  const today = new Date();

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: pt }),
    [date],
  );

  function handleChangeDate(action) {
    const currentDate = date;

    if (action === 'down') {
      onChange(subDays(date, 1));

      setIsMinDate(
        currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getDate() === today.getDate() + 1,
      );
    } else {
      onChange(addDays(date, 1));
      setIsMinDate(false);
    }
  }

  return (
    <Container>
      <DateForm>
        <DateButton
          isMinDate={isMinDate}
          onPress={() => handleChangeDate('down')}
        >
          <Icon name="chevron-left" size={40} color="#fff" />
        </DateButton>
        <DateText>{dateFormatted}</DateText>
        <DateButton onPress={() => handleChangeDate('up')}>
          <Icon name="chevron-right" size={40} color="#fff" />
        </DateButton>
      </DateForm>
    </Container>
  );
}

DateInput.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};
