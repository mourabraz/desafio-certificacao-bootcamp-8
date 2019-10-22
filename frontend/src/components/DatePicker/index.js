import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function DatePicker() {
  registerLocale('pt', pt);
  const ref = useRef();

  const { registerField, defaultValue, error } = useField('date');

  const [selected, setSelected] = useState(
    defaultValue || addHours(new Date(), 1)
  );

  useEffect(() => {
    registerField({
      name: 'date',
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current]); // eslint-disable-line

  return (
    <Container>
      <ReactDatePicker
        locale="pt"
        name="date"
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        showTimeSelect
        timeIntervals={60}
        dateFormat="dd/MM/yyyy 'às' HH'h'"
      />
      {error && <span>{error}</span>}
    </Container>
  );
}
