import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { store } from '~/store';

import {
  Container,
  Banner,
  InfoBox,
  Info,
  Title,
  Time,
  Localization,
  Owner,
  OwnerHimself,
  SubmitSubscription,
  SubscriptionText,
} from './styles';

export default function Meetup({ meetup, onSubscribe, onCancel }) {
  const { profile } = store.getState().user;

  const [showSubmitSubscription, setShowSubmitSubscription] = useState(
    onSubscribe &&
      !meetup.past &&
      !meetup.subscribed &&
      profile.email !== meetup.owner.email,
  );

  const [showSubmitCancel, setShowSubmitCancel] = useState(
    onCancel && !meetup.past,
  );

  const dateFormatted = useMemo(() => {
    return format(parseISO(meetup.date), "d 'de' MMMM, 'às' HH'h'", {
      locale: pt,
    });
  }, [meetup.date]);

  function handleSubscriptionAction() {
    if (onSubscribe) {
      onSubscribe(meetup);
      setShowSubmitSubscription(false);
    }
    if (onCancel) {
      onCancel(meetup);
      setShowSubmitCancel(false);
    }
  }

  return (
    <Container past={meetup.past}>
      <Banner source={{ uri: meetup.banner.url }} resizeMode="cover" />

      <InfoBox>
        <Title>{meetup.title}</Title>

        <Info>
          <Time>{dateFormatted}</Time>
          <Localization>{meetup.localization}</Localization>

          {profile.email === meetup.owner.email ? (
            <OwnerHimself>Meetup organizado por você!</OwnerHimself>
          ) : (
            <Owner>Organizador: {meetup.owner.name}</Owner>
          )}
        </Info>

        {showSubmitSubscription && (
          <SubmitSubscription onPress={handleSubscriptionAction}>
            <SubscriptionText>Realizar inscrição</SubscriptionText>
          </SubmitSubscription>
        )}

        {showSubmitCancel && (
          <SubmitSubscription onPress={handleSubscriptionAction}>
            <SubscriptionText>Cancelar inscrição</SubscriptionText>
          </SubmitSubscription>
        )}
      </InfoBox>
    </Container>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.shape({
    past: PropTypes.bool.isRequired,
    subscribed: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    localization: PropTypes.string.isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onSubscribe: PropTypes.func,
  onCancel: PropTypes.func,
};

Meetup.defaultProps = {
  onSubscribe: null,
  onCancel: null,
};
