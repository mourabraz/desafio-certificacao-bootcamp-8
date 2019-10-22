import styled, { css } from 'styled-components/native';

export const Container = styled.View``;

export const DateForm = styled.View`
  margin: 0 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: 30px;
  color: #fff;
`;

export const DateButton = styled.TouchableOpacity.attrs(props => ({
  disabled: props.isMinDate,
}))`
  padding: 15px;

  ${props =>
    props.isMinDate &&
    css`
      opacity: 0.5;
    `}
`;
