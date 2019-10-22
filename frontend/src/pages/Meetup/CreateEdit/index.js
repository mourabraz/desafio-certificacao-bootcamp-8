import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdAddCircleOutline } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { parseISO } from 'date-fns';
import * as Yup from 'yup';

import api from '~/services/api';

import BannerInput from '~/components/BannerInput';
import DatePicker from '~/components/DatePicker';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string().required('A descrição é obrigatória'),
  date: Yup.date()
    .required('A data é obrigatória')
    .min(new Date(), 'Somente para datas futuras'),
  localization: Yup.string().required('A localização é obrigatória'),
  banner_id: Yup.string().required('O banner é obrigatório'),
});

export default function CreateEdit({ history, location }) {
  const meetup = location.state
    ? {
        ...location.state.meetup,
        date: parseISO(location.state.meetup.date),
        banner: {
          ...location.state.meetup.banner,
          id: location.state.meetup.banner_id,
        },
      }
    : {};

  async function handleSubmit(data) {
    try {
      data = {
        ...data,
        date: data.date.toISOString(),
      };

      let response = {};

      if (!meetup.id) {
        response = await api.post('/meetups', data);
      } else {
        response = await api.put(`/meetups/${meetup.id}`, data);
      }

      if (!meetup.id) {
        history.push('/');
      } else {
        history.push('/meetup/show', {
          meetup: { ...meetup, ...response.data },
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Oops... alguma coisa correu mal!\nerror:${error}`);
    }
  }

  return (
    <Container>
      <Form initialData={meetup} schema={schema} onSubmit={handleSubmit}>
        <BannerInput name={!meetup.id ? 'banner_id' : 'banner'} />
        <Input name="title" type="text" placeholder="Título do Meetup" />
        <Input
          multiline
          name="description"
          placeholder="Descrição completa"
          rows={10}
        />

        <DatePicker name="date" />

        <Input name="localization" type="text" placeholder="Localização" />

        <button type="submit">
          <MdAddCircleOutline color="#fff" size={14} />
          Salvar meetup
        </button>
      </Form>
    </Container>
  );
}

CreateEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object,
  }),
};

CreateEdit.defaultProps = {
  location: {
    state: {},
  },
};
