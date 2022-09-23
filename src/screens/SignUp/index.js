/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import {Alert} from 'react-native';
import MeuButton from '../../components/MeuButton';
import { Body, TextInput } from './styles';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../components/Loading';

import {AuthUserContext} from '../../context/AuthUserProvider';


const SignUp = ({navigation}) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const {signUp} = useContext(AuthUserContext);



    const cadastrar = async () => {
        if (nome !== '' && email !== '' && pass !== '' && confirmPass !== '') {
            if (pass === confirmPass) {
            // auth()
            // .createUserWithEmailAndPassword(email, pass)
            //.then(() => {
                //let userF = auth().currentUser;
                let user = {};
                user.nome = nome;
                user.email = email;
                setLoading(true);
                await signUp(user, pass);
                setLoading(false);
            //     firestore()
            //         .collection('users')
            //         .doc(userF.uid)
            //         .set(user)
            //         .then(() => {
            //             console.log('SignUp, cadastrar: Usuário adicionado!');
            //             userF.sendEmailVerification()
            //             .then(() => {
            //                 Alert.alert('Informação', 'Foi enviado um email para:' + email + 'para verificação.');
                                // navigation.dispatch(
                                //     CommonActions.reset({
                                //         index: 0,
                                //         routes: [{name: 'SignIn'}],
                                //     }),
                                // );
            //             })
            //             .catch((e) => {
            //                 console.log('SignUp: erro em entrar: ' + e);
            //             });
            //         })
            //         .catch((e) => {
            //             console.log('SignUp: erro em cadastrar' + e);
            //         });
            // })
            // .catch((e) => {
            //     console.log('SignUp: erro em entrar: ' + e);
            //     switch (e.code) {
            //         case 'auth/email-already-in-use':
            //             Alert.alert('Erro', 'Email já está em uso');
            //             break;
            //         case 'auth/operation-not-allowed':
            //             Alert.alert('Erro', 'Problemas ao cadastrar o usuário');
            //             break;
            //         case 'auth/invalid-email':
            //             Alert.alert('Erro', 'Email inválido');
            //             break;
            //         case 'auth/weak-password':
            //             Alert.alert('Erro', 'Senha é Fraca, por favor digite uma senha forte');
            //             break;
            //     }
            // });
            } else {
                Alert.alert('Erro', 'As senhas digitadas estão diferentes');
            }
        } else {
            Alert.alert('Erro', 'Por favor, digite um nome, email, senha e a confirmação da senha');
        }
    };
  return (
    <Body>
        <TextInput
            placeholder="Nome Completo"
            placeholderTextColor="#bbc"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={t => setNome(t)}
        />
        <TextInput
            placeholder="Email"
            placeholderTextColor="#bbc"
            keyboardType="email-address"
            returnKeyType="next"
            onChangeText={t => setEmail(t)}
        />
        <TextInput
            secureTextEntry={true}
            placeholder="Senha"
            placeholderTextColor="#bbc"
            keyboardType="default"
            returnKeyType="next"
            onChangeText={t => setPass(t)}
        />
        <TextInput
            secureTextEntry={true}
            placeholder="Confirmar Senha"
            placeholderTextColor="#bbc"
            keyboardType="default"
            returnKeyType="go"
            onChangeText={t => setConfirmPass(t)}
        />

        <MeuButton texto="Cadastrar" onClick={cadastrar} />
        {loading && <Loading />}
    </Body>
  );
};

export default SignUp;
