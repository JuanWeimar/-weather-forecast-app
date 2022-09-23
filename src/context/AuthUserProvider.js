/* eslint-disable prettier/prettier */
import React, {useState, createContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonActions} from '@react-navigation/native';

export const AuthUserContext = createContext({});

export const AuthUserProvider = ({children, navigation}) => {
  const [user, setUser] = useState(null);

  const storeUserCache = async (value) => {
    try {
      //console.log(value);
      //setUser(value);
      await EncryptedStorage.setItem('user_session', JSON.stringify(value));
    } catch (error) {
      console.error('SignIn, storeUserSession: ' + error);
    }
  };

  const getUserCache = async () => {
    try {
      const jsonValue = await EncryptedStorage.getItem('user_session');
      return jsonValue !== null ? jsonValue : null;
    } catch (e) {
      console.error('AuthUserProvider: erro ao ler o user no cache: ' + e);
    }
  };
  /* Fim Asyncstorage */

  /* SignUp, SignIn, e SignOut */
  const signUp = async (usuario, pass) => {
    console.log('entrei');
    await auth()
      .createUserWithEmailAndPassword(usuario.email, pass)
      .then(async () => {
        let userF = auth().currentUser;
        await firestore()
          .collection('users')
          .doc(userF.uid)
          .set(usuario)
          .then(() => {
            console.error('AuthUserProvider, signUp: usuário cadastrado.');
            userF
              .sendEmailVerification()
              .then(() => {
                Alert.alert(
                  'Informação',
                  'Foi enviado um email para: ' +
                    usuario.email +
                    ' para verificação.',
                );
              })
              .catch((e) => {
                console.error('AuthUserProvider, signUp: ' + e);
              });
          })
          .catch((e) => {
            console.error('AuthUserProvider, signUp: ' + e);
          });
      })
      .catch((e) => {
        console.error('AuthUserProvider, signUp: ' + e);
        switch (e.code) {
          case 'auth/email-already-in-use':
            Alert.alert('Erro', 'Email já está em uso.');
            break;
          case 'auth/operation-not-allowed':
            Alert.alert('Erro', 'Problemas ao cadastrar o usuário.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/weak-password':
            Alert.alert(
              'Erro',
              'Senha é fraca, por favor, digite uma senha forte.',
            );
            break;
        }
      });
  };

  const signIn = async (email, pass) => {
    //console.log(email, pass);
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async() => {
        if (auth().currentUser.emailVerified) {
          let localUser = {};
          localUser = await getUser();

          localUser.pass = pass;
          console.log('Dados do User' + '=>' + localUser);
          console.log(localUser);
          setUser(localUser);

          // console.log('Dados do getUser' + '=>' + await getUser());
          // console.log(await getUser());
          //console.log('entrou aqui');
          await storeUserCache(
                localUser
                  );
        } else {
          Alert.alert(
            'Erro',
            'Você deve verificar o seu email para prosseguir.',
          );
          auth()
            .signOut()
            .then(() => {})
            .catch((e) => {
              console.error('AuthUserProvider, signIn: ' + e);
            });
        }
        return true;
      })
      .catch((e) => {
        console.error('AuthUserProvider: erro em signIn: ' + e);
        switch (e.code) {
          case 'auth/user-not-found':
            Alert.alert('Erro', 'Usuário não cadastrado.');
            break;
          case 'auth/wrong-password':
            Alert.alert('Erro', 'Erro na senha.');
            break;
          case 'auth/invalid-email':
            Alert.alert('Erro', 'Email inválido.');
            break;
          case 'auth/user-disabled':
            Alert.alert('Erro', 'Usuário desabilitado.');
            break;
        }
        return false;
      });
  };

  const signOut = () => {
    setUser(null);
    EncryptedStorage.removeItem('user_session')
      .then(() => {
        auth()
          .signOut()
          .then(() => {})
          .catch((e) => {
            console.error('AuthUserProvider, sigOut: ' + e);
          });
      })
      .catch((e) => {
        console.error('AuthUserProvider, sigOut chache: ' + e);
      });
  };
  /* Fim SignUp, SignIn, e SignOut */

  //busca os detalhes do user no nó users e faz cache
  const getUser = async () => {
    let data = {};
    let doc = await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .get();

        if (doc.exists) {
          //console.log('Document data:', doc.data());
          // setUser(doc.data());
          // console.log('Dados do getUser' + '=>' + doc.data());
          // console.log(doc.data());
          return doc.data();
          //return doc.data();
        // } else {
        //   console.log('AuthUserProvider, getUser: documento não localizado');
        // }
      }

      return null;

  };

  return (
    <AuthUserContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        user,
        setUser,
        getUser,
        getUserCache,
      }}>
      {children}
    </AuthUserContext.Provider>
  );
};
