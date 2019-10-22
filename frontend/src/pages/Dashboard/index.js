import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { Container, MeetupsList, Meetup } from './styles';

export default function Dashboard({ history }) {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups/user');

      const data = response.data.map(m => ({
        ...m,
        formatedDate: format(parseISO(m.date), "d 'de' MMMM, 'às' HH'h'", {
          locale: pt,
        }),
      }));

      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleMeetupShow(meetup) {
    history.push('/meetup/show', { meetup });
  }

  function handleMeetupCreate() {
    history.push('/meetup/create');
  }

  return (
    <Container>
      <header>
        <p>Meus meetups</p>
        <button type="button" onClick={handleMeetupCreate}>
          <MdAddCircleOutline color="#fff" size={14} /> Novo meetup
        </button>
      </header>

      <MeetupsList>
        {meetups.map(m => (
          <Meetup key={m.id}>
            <p>{m.title}</p>
            <div>
              <time>{m.formatedDate}</time>
              <button type="button" onClick={() => handleMeetupShow(m)}>
                <MdChevronRight color="#fff" size={20} />
              </button>
            </div>
          </Meetup>
        ))}
      </MeetupsList>
    </Container>
  );
}

Dashboard.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
