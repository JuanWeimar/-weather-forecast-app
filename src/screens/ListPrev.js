/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import Item from '../components/Item';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CommonActions } from '@react-navigation/native';



const ListPrev = ({navigation}) => {
  const [data, setData] = useState([]);

  const getPrevs = () => {
    let userF = auth().currentUser;
    firestore()
        .collection('wheater')
        .doc(userF.uid)
        .collection('cities')
        .onSnapshot((querySnapshot) => {
                let d = [];
                querySnapshot.forEach((doc) => {
                    //console.log(doc.id, ' => ', doc);
                    const prevs = {
                        id: doc.id,
                        nome: doc.data().cidade,
                        descricao: doc.data().descricao,
                        umidade: doc.data().umidade,
                        temperatura: doc.data().temperatura,
                        time: doc.data().time,
                        velocidade: doc.data().velocidade,
                    };
                    d.push(prevs);
                });
                //console.log(d);
                setData(d);
            },
            (e) => {
            console.log('ListPrev, getPrevs: ' + e);
            }
        );
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
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
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
});
