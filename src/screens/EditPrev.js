/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {View, TextInput, SafeAreaView, StyleSheet, ToastAndroid, Alert} from 'react-native';
import { COLORS } from '../assets/colors';
import MeuButton from '../components/MeuButton';
import ButtonDelete from '../components/ButtonDelete';
import Loading from '../components/Loading';
//import getCurrentWeather from '../api/consultApi';
import {WheaterContext} from '../context/WheaterProvider';


const EditPrev = ({route, navigation}) => {
    //console.log(route.params.prev);
  const [city_name, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [umidity, setUmidity] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [time, setTime] = useState('');
  const [velocity, setVelocity] = useState('');
  const [id, setId] = useState('');
  const [dataWeather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const {extinguish, update, getCurrentWeather} = useContext(WheaterContext);



  useEffect(() => {
    setCityName(route.params.prev.nome);
    setDescription(route.params.prev.descricao);
    setUmidity(String(route.params.prev.umidade));
    setTemperatura(String(route.params.prev.temperatura));
    setTime(route.params.prev.time);
    setVelocity(route.params.prev.velocidade);
    setId(route.params.prev.id);
  }, []);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const consulta = async () => {
    try {
        console.log('cidade' + '=>' + city_name);
        let data = await getCurrentWeather(city_name);
        console.log('dados' + '=>' + data);
        return data;
    } catch (error) {
        console.log(error);
    }
  };

  const atualizar = async () => {
    try {
        let data = await consulta();
        console.log('em cima do dataWeather');
        console.log(data.cidade);
        update(id, data);
        navigation.goBack();
        } catch (error) {
            console.log(error);
        }
  };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir a previsão?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          extinguish(id);
          setLoading(false);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
        <TextInput style={styles.name} value={city_name} editable={false}/>
        <TextInput style={styles.name} value={description} editable={false}/>
        <TextInput style={styles.name} value={umidity} editable={false}/>
        <TextInput style={styles.name} value={temperatura} editable={false}/>
        <TextInput style={styles.name} value={time} editable={false}/>
        <TextInput style={styles.name} value={velocity} editable={false}/>
        <MeuButton texto="Atualizar" onClick={atualizar} style={styles.atualizar} />
        {id ? <ButtonDelete texto="Excluir" onClick={excluir} /> : null}
        {loading && <Loading />}
    </SafeAreaView>
  );
};

export default EditPrev;

const styles = StyleSheet.create({
    name:{
        width: '95%',
        height: 50,
        borderBottomColor: COLORS.grey,
        color: '#bbb',
        borderBottomWidth: 2,
        fontSize: 16,
        paddingLeft: 2,
        paddingBottom: 1,
        marginLeft: 10,
    },
});
