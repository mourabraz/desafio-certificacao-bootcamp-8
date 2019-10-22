import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import {
  Container,
  ActivityIndicatorBox,
  List,
  TextBox,
  TextInfo,
} from './styles';

function Subscription({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.tron.log(isFocused);
    setLoading(true);
    async function loadSubscriptions() {
      try {
        const response = await api.get('/subscriptions');
        const subscriptionsList = response.data.map(s => ({
          id: s.id,
          user_id: s.user_id,
          meetup_id: s.meetup_id,
          meetup: { ...s.Meetup, subscribed: true },
        }));
        setSubscriptions(subscriptionsList);
      } catch (error) {
        console.tron.error(error);
        Alert.alert('Oops!', 'Algo correu mal.');
      }
      setLoading(false);
    }

    if (isFocused) loadSubscriptions();
  }, [isFocused]);

  async function handleCancelSubscribe(meetup) {
    try {
      const subscribe = subscriptions.find(s => s.meetup_id === meetup.id);

      await api.delete(`/subscriptions/${subscribe.id}`);

      setSubscriptions(subscriptions.filter(s => s.id !== subscribe.id));
    } catch (error) {
      console.tron.error(error);
      Alert.alert('Oops!', 'Algo correu mal.');
    }
  }

  function renderListOrNot() {
    if (!subscriptions.length) {
      return (
        <TextBox>
          <TextInfo>Sem inscrições no momento</TextInfo>
        </TextBox>
      );
    }

    return (
      <List
        data={subscriptions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Meetup meetup={item.meetup} onCancel={handleCancelSubscribe} />
        )}
      />
    );
  }

  return (
    <Background>
      <Container>
        <Header />

        {loading ? (
          <ActivityIndicatorBox>
            <ActivityIndicator size="large" color="#f94d6a" />
          </ActivityIndicatorBox>
        ) : (
          renderListOrNot()
        )}
      </Container>
    </Background>
  );
}

Subscription.navigationOptions = {
  tabBarLabel: 'Incrições',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Subscription.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscription);
