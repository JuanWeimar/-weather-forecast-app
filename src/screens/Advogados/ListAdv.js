/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, Alert} from 'react-native';
import Item from './Item';
import AddFloatButton from '../../components/AddFloatButton';
import { CommonActions } from '@react-navigation/native';
import MeuButton from '../../components/MeuButton';
import Loading from '../../components/Loading';
import {AdvContext} from '../../context/AdvProvider';


const ListAdv = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(false);
  const {getAdv, adv, getAdvogados, advogados} = useContext(AdvContext);

  const fetchData = async () => {
    await getAdvogados();
  };

  useEffect(() => {
    //getAdvs();
    fetchData();
  }, []);

  useEffect(() => {
    setData(advogados);
  }, [advogados]);
  // const getAdvs = async () => {
  //   try {
  //       setLoading(true);
  //   let resp = await getAdv();
  //   console.log(resp);
  //   setData(resp);
  //   } catch (error) {
  //       console.log(error);
  //   }

  //   setLoading(false);

  // };

  const pesquisar =  (t) => {

      if (t !== '') {
        let users = [];
        advogados.forEach(o => {
          if (
            o.nome.toLowerCase().includes(t.toLowerCase())
            //o.registration.toLowerCase().includes(value.toLowerCase())
          ) {
            users.push(o);
          }
        });
        if (users.length > 0) {
          setDataTemp(users);
        } else {
          Alert.alert('Atenção', 'Nenhum usuário encontrado.');
          setDataTemp([]);
          setPesquisa('');
        }
      } else {
        setDataTemp([]);
      }

  };



  const routeAdvogados = (item) => {
    //console.log(item);
    navigation.dispatch(
        CommonActions.navigate({
            name: 'CreateAdv',
            params: {advogados: item},
        }),
    );
  };

  const routeAddAdvogados = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'CreateAdv',
        params: {advogados: null},
      }),
    );
  };

  const renderItem = ({item}) => {
    return (
    <Item item={item} onPress={() => routeAdvogados(item)} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            style={styles.flatlist}
            data={(dataTemp.length > 0 ? dataTemp : advogados)}
            renderItem={renderItem}
            keyExtractor={item => item.uid}
        />
        {/* <TextInput style={styles.input}
            placeholder="Pesquise por um advogado"
            placeholderTextColor="#000"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => pesquisar(t)}
            /> */}
        <AddFloatButton onClick={routeAddAdvogados} />
        {/* <MeuButton texto="Pesquisar" onClick={pesquisar} style={styles.pesquisar} /> */}
        {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ListAdv;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatlist: {
        width: '95%',
        height: '100%',
    },
    input: {
        color: '#000',
    },
});
