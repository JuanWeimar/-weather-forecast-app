/* eslint-disable prettier/prettier */
import React from 'react';
import {Button, Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Item = ({item, onPress}) => {
    console.log('Item: ' + item);
  return (
    <TouchableHighlight style={styles.button} onPress={onPress} underlayColor="transparent">
        <>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.temperatura}>{item.oab}</Text>
        </>
    </TouchableHighlight>
  );
};

export default Item;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#8000FF',
        padding: 20,
        marginTop: 10,
        borderRadius: 10,
    },
    nome: {
        fontSize: 24,
        color: '#fff',
    },
    temperatura: {
        fontSize: 16,
        color: '#fff',
    },
});