/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MeuButton from '../components/MeuButton';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [contador, setContador] = useState(0);


  useEffect(() => {
    console.log('Montou o componente');
  }, []);

  const contar = () => {
    setContador(contador + 1);
  };

  const reset = () => {
    setContador(0);
  };

  const sair = () => {
    auth()
    .signOut()
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
        }),
    );
    });

  };

  return (
    <View>
      <Text style={styles.texto}>Teste da Aplicação</Text>
      <Text style={styles.texto}>Contador = {contador}</Text>
      <MeuButton texto="Contar" onClick={sair} />
      <MeuButton texto="Contar" onClick={contar} />
      <MeuButton texto="Reset" onClick={reset} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  texto: {
    fontSize: 40,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffe51f',
    padding: 10,
    margin: 10,
  },
});
