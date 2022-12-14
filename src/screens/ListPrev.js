/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, TextInput, Alert} from 'react-native';
import Item from '../components/Item';
import { CommonActions } from '@react-navigation/native';
import MeuButton from '../components/MeuButton';
import {WheaterContext} from '../context/WheaterProvider';


const ListPrev = ({navigation}) => {
  const [data, setData] = useState([]);
  const [dataTemp, setDataTemp] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const {getPrev} = useContext(WheaterContext);


  const getPrevs = async () => {

    let resp = await getPrev();
    setData(resp);

  };

  const pesquisar =  (t) => {

      if (t !== '') {
        let users = [];
        data.forEach(o => {
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

  useEffect(() => {
    getPrevs();
  }, []);

  const routeUser = (item) => {
    //console.log(item);
    navigation.dispatch(
        CommonActions.navigate({
            name: 'EditPrev',
            params: {prev: item},
        }),
    );
  };
  const renderItem = ({item}) => {
    return (
    <Item item={item} onPress={() => routeUser(item)} />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
        <FlatList
            style={styles.flatlist}
            data={(dataTemp.length > 0 ? dataTemp : data)}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
        <TextInput style={styles.input}
            placeholder="Pesquise por uma cidade"
            placeholderTextColor="#000"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => pesquisar(t)}
            />
        <MeuButton texto="Pesquisar" onClick={pesquisar} style={styles.pesquisar} />
    </SafeAreaView>
  );
};

export default ListPrev;

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
