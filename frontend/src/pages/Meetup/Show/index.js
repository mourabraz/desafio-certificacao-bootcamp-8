import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

import { toast } from 'react-toastify';
import MultilineHtmlTag from '~/components/MultilineHtmlTag';

import { Container, Content } from './styles';
import api from '~/services/api';

export default function Meetup({ history, location }) {
  const meetup = {
    ...location.state.meetup,
    formatedDate: format(
      parseISO(location.state.meetup.date),
      "d 'de' MMMM, 'às' HH'h'",
      {
        locale: pt,
      }
    ),
  };

  function handleEdit() {
    history.push('/meetup/create', { meetup });
  }

  async function handleCancel() {
    try {
      await api.delete(`/meetups/${meetup.id}`);

      history.push('/');
    } catch (error) {
      toast.error(`Oops! Não foi possível cancelar o Meetup!`);
    }
  }

  return (
    <Container>
      <header>
        <p>{meetup.title}</p>
        <div>
          {!meetup.past && (
            <>
              <button type="button" className="edit" onClick={handleEdit}>
                <MdEdit color="#fff" size={14} /> Editar
              </button>
              <button type="button" className="cancel" onClick={handleCancel}>
                <MdDeleteForever color="#fff" size={14} /> Cancelar
              </button>
            </>
          )}
        </div>
      </header>

      <Content>
        <img src={meetup.banner.url} alt="" />
        <MultilineHtmlTag text={meetup.description} />
        <div>
          <time>{meetup.formatedDate}</time>
          <p>{meetup.localization}</p>
        </div>
      </Content>
    </Container>
  );
}

Meetup.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
};
