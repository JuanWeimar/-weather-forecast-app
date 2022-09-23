/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import {View, StyleSheet, Text, Image, TextInput, ScrollView, Alert} from 'react-native';
import MeuButton from '../components/MeuButton';
import {COLORS} from '../assets/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import {CommonActions} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Loading from '../components/Loading';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AuthUserContext} from '../context/AuthUserProvider';


const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState('');
  const {signIn, user} = useContext(AuthUserContext);


  const recuperarSenha = () => {
        navigation.navigate('ForgotPassword');
  };

//   async function storeUserSession(value) {
//     try {
//         console.log(value);
//       await EncryptedStorage.setItem('user_session', JSON.stringify(value));
//     } catch (error) {
//       console.error('SignIn, storeUserSession: ' + error);
//     }
//   }

//   async function retrieveUserSession() {
//     try {
//       const session = await EncryptedStorage.getItem('user_session');
//       if (session !== undefined) {
//         console.log(JSON.parse(session));
//       }
//     } catch (error) {
//       console.error('SignIn, storeUserSession: ' + error);
//     }
//   }

  const entrar = async () => {
    if (email !== '' && pass !== '') {
        setLoading(true);
        await signIn(email, pass);
        if (user) {
            navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{name: 'AppStack'}],
                    }),
                );
        }
        setLoading(false);
    } else {
        Alert.alert('Erro', 'Por favor, digite email e senha');
    }
  };

  const cadastrar = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.divSuperior}>
        <Image
            style={styles.image}
            source={require('../assets/images/logo.png')}
            accessibilityLabel="logo do app"
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbc"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
            //onEndEditing={() => this.passTextInput.focus()}
        />
        <TextInput
            // ref={(ref) => {
            //     this.passTextInput = ref;
            // }}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="#bbc"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setPass(t)}
        />
        <Text style={styles.textEsqueceuSenha} onPress={recuperarSenha}>Esqueceu sua senha?</Text>
        <MeuButton texto="ENTRAR" onClick={entrar}/>
      </View>
      <View style={styles.divInferior}>
        <View style={styles.divOuHr}>
            <View style={styles.divHr} />
            <Text style={styles.textOu}>OU</Text>
            <View style={styles.divHr} />
        </View>
        <View style={styles.divCadastrarSe}>
            <Text style={styles.textNormal}>Não tem uma conta?</Text>
            <Text style={styles.textCadastrarSe} onPress={cadastrar}>Cadastre-se</Text>
        </View>
      </View >
      {loading && <Loading /> }
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    divSuperior: {
        flex: 5,
        alignItems: 'center',
    },
    divInferior: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
        margin: 5,
        borderRadius: 70,
    },
    input: {
        width: '95%',
        height: 50,
        borderBottomColor: COLORS.grey,
        color: '#bbb',
        borderBottomWidth: 2,
        fontSize: 16,
        paddingLeft: 2,
        paddingBottom: 1,
    },
    textEsqueceuSenha: {
        fontSize: 15,
        color: COLORS.accentSecundary,
        alignSelf: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
    },
    divOuHr: {
        width: '100%',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    divHr: {
        width: '30%',
        height: 1,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 2,
    },
    textOu: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 20,
        color: COLORS.grey,
    },
    divCadastrarSe: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textNormal: {
        fontSize: 18,
        color: '#010',
    },
    textCadastrarSe: {
        fontSize: 16,
        color: COLORS.accentSecundary,
        marginLeft: 5,
    },
});
