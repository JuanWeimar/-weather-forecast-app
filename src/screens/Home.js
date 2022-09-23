/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, Image} from 'react-native';
import MeuButton from '../components/MeuButton';
import ButtonPesquisa from '../components/ButtonPesquisa';
import ButtonSalvar from '../components/ButtonSalvar';
import ButtonListar from '../components/ButtonListar';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from './SignUp/styles';
//import getCurrentWeather from '../api/consultApi';
import firestore from '@react-native-firebase/firestore';
import {AuthUserContext} from '../context/AuthUserProvider';

import {WheaterContext} from '../context/WheaterProvider';

const Home = ({navigation}) => {
  const [city_name, setCityName] = useState('');
  const [city_ask, setCityAsk] = useState('');
  const [description, setDescription] = useState('');
  const [umidity, setUmidity] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [dataWeather, setWeather] = useState('');
  const { getUserCache, signOut} = useContext(AuthUserContext);

  const {savePrev, getCurrentWeather} = useContext(WheaterContext);


  useEffect(() => {
    console.log('Montou o componente');
  }, []);

  const consultar = async () => {
    if (city_ask !== '') {
      let data = await getCurrentWeather(city_ask);
      setCityName(data.cidade);
      setDescription(data.descricao);
      setUmidity(String(data.umidade));
      setTemperatura(String(data.temperatura));
      setTime(data.time);
      setVelocity(data.velocidade);
      setWeather(data);
      console.log(dataWeather);
      //return data;
    }
    else {
      Alert.alert('Você precisa informar uma cidade');
    }
  };

  const guardar = async () => {
    // let userF = auth().currentUser;
    // firestore()
    // .collection('wheater')
    // .doc(userF.uid)
    // .collection('cities')
    // .add(dataWeather)
    // .then(() => {
    //     console.log('Previsao cadastrada!');
    //     navigation.navigate('ListPrev');
    // })
    // .catch((e) => {
    //     console.log('Previsao: erro em cadastrar' + e);
    // });
    savePrev(dataWeather);
    try {
      navigation.navigate('ListPrev');
    } catch (error) {
      console.log(error);
    }
  };

  const listar = () => {
    navigation.navigate('ListPrev');
  };

  const sair = () => {
    // auth()
    // .signOut()
    // .then(() => {
      signOut();
      navigation.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
        }),
    );
    // });

  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.divSuperior}>
    <Image
            style={styles.image}
            source={require('../assets/images/nuvem.png')}
            accessibilityLabel="logo do app"
        />
    <TextInput style={styles.name}
          placeholder="Cidade"
          placeholderTextColor="#000"
          value={city_name}/>
    <TextInput style={styles.name}
          placeholder="Descrição"
          placeholderTextColor="#000"
          value={description}/>
    <TextInput style={styles.name}
          placeholder="Umidade"
          placeholderTextColor="#000"
          value={umidity}/>
    <TextInput style={styles.name}
          placeholder="Temperatura"
          placeholderTextColor="#000"
          value={temperatura}/>
    <TextInput style={styles.name}
          placeholder="Horário"
          placeholderTextColor="#000"
          value={time}/>
    <TextInput style={styles.name}
          placeholder="Velocidade do vento"
          placeholderTextColor="#000"
          value={velocity}/>

    </View>
    <View style={styles.buttons}>
       <TextInput
          style={styles.input}
          placeholder="Digite uma cidade para pesquisa"
          placeholderTextColor="#000"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setCityAsk(t)}
        />
      <MeuButton style={styles.pesquisar} texto="Pesquisar" onClick={consultar} />
      <View style={styles.botoes}>
        <ButtonListar   onClick={listar} />
        <ButtonSalvar   onClick={guardar} />
        <ButtonPesquisa onClick={sair} />
      </View>
    </View>
    </SafeAreaView>
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    height: 150,
  },
  buttons: {
    flexDirection: 'column',

  },
  divSuperior: {
    backgroundColor: '#E1DCE3',
    height: 450,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 70,
    padding: 40,
  },
  name:{
    color: '#000',
    height: 40,
  },
  pesquisar: {
    width: 0,
    color: '#bbb',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
