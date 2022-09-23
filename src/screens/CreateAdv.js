/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import { TextInput, SafeAreaView, StyleSheet, ToastAndroid, Alert} from 'react-native';
import { COLORS } from '../assets/colors';
import MeuButton from '../components/MeuButton';
import ButtonDelete from '../components/ButtonDelete';
import Loading from '../components/Loading';
import {AdvContext} from '../context/AdvProvider';


const CreateAdv = ({route, navigation}) => {
    //console.log(route.params.prev);
  const [name, setName] = useState('');
  const [oab, setOab] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [uid, setUid] = useState('');
  const [dataAdv, setDataAdv] = useState([]);
  const [loading, setLoading] = useState(false);
  const {saveAdvogados, updateAdvogados, deleteAdvogados} = useContext(AdvContext);



  useEffect(() => {
    console.log(route.params);
    setName('');
    setOab('');
    setLatitude('');
    setLongitude('');
    setUid('');
    if (route.params.advogados) {
      setName(route.params.advogados.nome);
      setOab(route.params.advogados.oab);
      setLatitude(route.params.advogados.latitude);
      setLongitude(route.params.advogados.longitude);
      setUid(route.params.advogados.uid);
    }
    return () => {
      console.log('desmontou o componente');
    };
  }, [route]);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

    const salvar = async () => {

        if (name !== '' && oab !== '' && latitude !== '' && longitude !== '') {
                let data = {};
                data.uid = uid;
                data.nome = name;
                data.oab = oab;
                data.latitude = latitude;
                data.longitude = longitude;
                setLoading(true);
                //console.log(data);
                if (uid) {
                  await updateAdvogados(data);
                } else {
                  await saveAdvogados(data);
                }
                setLoading(false);
                navigation.navigate('Advogados');
        }
        else {
            Alert.alert('Por favor preencha os campos acima');
        }
    };

  const excluir = async () => {
    Alert.alert('Atenção', 'Você tem certeza que deseja excluir o advogado?', [
      {
        text: 'Não',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          setLoading(true);
          await deleteAdvogados(uid);
          setLoading(false);
          navigation.navigate('Advogados');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
        <TextInput style={styles.name}
          placeholder="Digite seu nome"
          placeholderTextColor="#000"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setName(t)}
          value={name}/>
        <TextInput style={styles.name}
          placeholder="Digite sua Inscrição da OAB"
          placeholderTextColor="#000"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setOab(t)}
          value={oab}/>
        <TextInput style={styles.name}
          placeholder="Digite sua Latitude"
          placeholderTextColor="#000"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setLatitude(t)}
          value={latitude}/>
        <TextInput style={styles.name}
          placeholder="Digite sua Longitude"
          placeholderTextColor="#000"
          keyboardType="default"
          returnKeyType="next"
          onChangeText={t => setLongitude(t)}
          value={longitude}/>
        <MeuButton texto="Salvar" onClick={salvar} style={styles.atualizar} />
        {uid ? <ButtonDelete texto="Excluir" onClick={excluir} /> : null}
        {loading && <Loading />}
    </SafeAreaView>
  );
};

export default CreateAdv;

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
