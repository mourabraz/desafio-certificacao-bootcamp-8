import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;

  display: flex;
  align-items: stretch;
  justify-content: flex-start;

  opacity: ${props => (props.past ? 0.8 : 1)};
`;

export const Banner = styled.Image`
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const InfoBox = styled.View`
  padding: 20px;
`;

export const Info = styled.View`
  margin: 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const Time = styled.Text`
  font-size: 13px;
  color: #999;
  margin-bottom: 5px;
`;

export const Localization = styled.Text`
  font-size: 13px;
  color: #999;
  margin-bottom: 5px;
`;

export const Owner = styled.Text`
  font-size: 13px;
  color: #999;
`;

export const OwnerHimself = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #f94d6a;
`;

export const SubscriptionText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const SubmitSubscription = styled(RectButton)`
  background: #f94d6a;
  height: 46px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
