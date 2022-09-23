/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {AuthUserContext} from '../context/AuthUserProvider';
// import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DivIcon = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
const DivText = styled.View`
  flex: 4;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const TextWelcome = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: ${COLORS.white};
`;

const TextUserName = styled.Text`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 19px;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${COLORS.white};
`;

const DrawerHeader = () => {
   const {user} = useContext(AuthUserContext);
   console.log(user);

  return (
    <Container>
      <DivIcon>
        {/* <Icon name="person-outline" size={40} color={COLORS.white} /> */}
      </DivIcon>
      <DivText>
        <TextWelcome>Bem vindo,</TextWelcome>
        <TextUserName>{user ? user.nome : ''}</TextUserName>
      </DivText>
    </Container>
  );
};
export default DrawerHeader;
