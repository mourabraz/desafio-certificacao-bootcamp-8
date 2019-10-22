import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator, Alert } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format } from 'date-fns';

import api from '~/services/api';

import { store } from '~/store';

import Background from '~/components/Background';
import Header from '~/components/Header';
import DateInput from '~/components/DateInput';
import Meetup from '~/components/Meetup';

import { Container, ActivityIndicatorBox, List } from './styles';

function Dashboard({ isFocused }) {
  const { profile } = store.getState().user;
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastCall, setLastCall] = useState(false);
  const [loadingMoreMeetups, setLoadingMoreMeetups] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    async function loadMeetups() {
      try {
        const response = await api.get('/meetups', {
          params: {
            page: 1,
            date: format(date, 'yyyy-MM-dd'),
          },
        });

        const meetupsList = response.data.map(m => ({
          ...m,
          subscribed: m.subscribers.some(s => s.email === profile.email),
        }));
        setMeetups(meetupsList);
      } catch (error) {
        console.tron.error(error);
        Alert.alert('Oops!', 'Algo correu mal.');
      }

      setLoading(false);
    }

    if (isFocused) loadMeetups();
  }, [date, isFocused, profile.email, profile.name]);

  function refreshOrGetData(page) {
    async function loadMeetups() {
      const response = await api.get('/meetups', {
        params: {
          page,
          date: format(date, 'yyyy-MM-dd'),
        },
      });

      if (!response.data.length) {
        if (page === 1) {
          setRefreshing(false);
        } else {
          setLoadingMoreMeetups(false);
        }

        setLastCall(true);

        return;
      }

      const meetupsList = response.data.map(m => ({
        ...m,
        subscribed: m.subscribers.some(s => s.email === profile.email),
      }));

      if (page === 1) {
        setMeetups(meetupsList);
        setRefreshing(false);
      } else {
        setMeetups([...meetups, ...meetupsList]);
        setLoadingMoreMeetups(false);
      }
    }

    if (meetups.length) {
      if (page === 1) {
        setRefreshing(true);
        setLastCall(false);
      } else {
        setLoadingMoreMeetups(true);
      }

      loadMeetups();
    }

    setCurrentPage(page);
  }

  async function handleSubscribe(meetup) {
    try {
      await api.post('/subscriptions', { meetup_id: meetup.id });
      meetup.subscribed = true;
    } catch (error) {
      console.tron.error(error);
      Alert.alert('Oops!', 'Algo correu mal.');
    }
  }

  function handleLoadMore() {
    if (!lastCall) {
      refreshOrGetData(currentPage + 1);
    }
  }

  function handleRefresh() {
    refreshOrGetData(1);
  }

  function renderFooterLoading() {
    return loadingMoreMeetups ? (
      <ActivityIndicator size="large" color="#f94d6a" />
    ) : null;
  }

  return (
    <Background>
      <Container>
        <Header />

        <DateInput date={date} onChange={setDate} />

        {loading ? (
          <ActivityIndicatorBox>
            <ActivityIndicator size="large" color="#f94d6a" />
          </ActivityIndicatorBox>
        ) : (
          <List
            onEndReachedThreshold={0.2}
            onEndReached={handleLoadMore}
            data={meetups}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup meetup={item} onSubscribe={handleSubscribe} />
            )}
            ListFooterComponent={renderFooterLoading}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
