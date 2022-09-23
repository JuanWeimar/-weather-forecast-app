/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useContext} from 'react';
import {Container, Image} from './styles';
import {AuthUserContext} from '../../context/AuthUserProvider';
import {WheaterContext} from '../../context/WheaterProvider';
import {AdvContext} from '../../context/AdvProvider';
import {ApiContext} from '../../context/ApiProvider';
import {CommonActions} from '@react-navigation/native';

const Preload = ({navigation}) => {
  const { getUserCache, signIn} = useContext(AuthUserContext);
  const {getPrev} = useContext(WheaterContext);
  const {getAdv} = useContext(AdvContext);
  const {getApi} = useContext(ApiContext);

  useEffect(() => {
    //buscarDadosNaCache();
    entrar();
    getPrev();
    //getAdv();
    getApi();
  }, []);

  const entrar = async (email, password) => {
      //se está logado
      const jsonValue = await getUserCache();
      let localUser = JSON.parse(jsonValue);
      console.log('Cache' + '=>' + jsonValue);
    if (jsonValue !== null) {
      await signIn(localUser.email, localUser.pass);
      console.log('AppStack');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'AppStack'}],
        }),
      );
    } else {
      //se está null, refaz o login usando a cache
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'SignIn'}],
            }),
          );
    }
  };

  // const buscarDadosNaCache = async () => {
  //   let login = await retrieveUserSession();
  //   console.log('Dados da cache');
  //   console.log(login);
  //   if (login) {
  //     entrar(login.email, login.pass);
  //   } else {
  //     navigation.navigate('SignIn');
  //   }
  // };

  return (
    <Container>
      <Image
        source={require('../../assets/images/logo.png')}
        accessibilityLabel="logo do app"
      />
    </Container>
  );
};

export default Preload;
