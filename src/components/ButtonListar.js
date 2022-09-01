/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, TouchableHighlight, Image} from 'react-native';
import {COLORS} from '../assets/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ButtonListar = (props) => {
  console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
        <Icon name="list-alt" size={20} color="#fff" />
    </TouchableHighlight>
  );
};
export default ButtonListar;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: COLORS.white,
  },
  button: {
    width: '25%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 5,
    margin: 5,
    borderRadius: 70,
    padding: 40,
  }
});