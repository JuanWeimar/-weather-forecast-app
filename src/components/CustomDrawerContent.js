/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import DrawerHeader from './DrawerHeader';
// import {AuthUserContext} from '../context/AuthUserProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';

import {COLORS} from '../assets/colors';

const Page = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  background-color: ${COLORS.primaryDark};
`;

const Body = styled.View`
  flex: 6;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 18px;
  padding-top: 30px;
  border-color: 'red';
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const DivItem = styled.View`
  width: 100%;
  height: auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
`;

const ItemMenuText = styled.Text`
  font-size: 20px;
  margin: 10px;
  color: ${COLORS.primaryDark};
`;

const CustomDrawerContent = ({navigation}) => {
  // const {sigOut} = useContext(AuthUserContext);

  async function removeUserSession() {
    try {
      await EncryptedStorage.removeItem('user_session');
    } catch (e) {
      console.error('CustomDrawerContent, removeUserSession: ' + e);
    }
  }

  const signOut = async () => {
    auth()
      .signOut()
      .then(async () => {
        await removeUserSession();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          }),
        );
      })
      .catch(e => {
        console.error('CustomDrawerContent, signOut: ' + e);
      });
  };

  return (
    <Page>
      <Header>
        <DrawerHeader />
      </Header>
      <Body>
        <ScrollView>
          <DivItem>
            <Icon name="partly-sunny-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('ListPrev');
              }}>
              Listar Previsões
            </ItemMenuText>
          </DivItem>
          <DivItem>
            <Icon name="school-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                navigation.navigate('Advogados');
              }}>
              Listar Advogados
            </ItemMenuText>
          </DivItem>
          <DivItem>
            <Icon name="exit-outline" size={25} color={COLORS.primaryDark} />
            <ItemMenuText
              onPress={() => {
                signOut();
              }}>
              Sair
            </ItemMenuText>
          </DivItem>
        </ScrollView>
      </Body>
    </Page>
  );
};
export default CustomDrawerContent;