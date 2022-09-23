/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import {StatusBar} from 'react-native';
import {COLORS} from './src/assets/colors';
import ForgotPassword from './src/screens/ForgotPassword';
import Preload from './src/screens/Preload';
import ListPrev from './src/screens/ListPrev';
import EditPrev from './src/screens/EditPrev';
import Navigator from './src/navigation/Navigator';
import Providers from './src/navigation';

//const Stack = createNativeStackNavigator();

//const App = () => <Navigator />;
  // return (
  //   <NavigationContainer>
  //     <StatusBar backgroundColor={COLORS.primaryDark} />
  //     <Stack.Navigator initialRouteName="Preload">
  //       <Stack.Screen name="SignIn" component={SignIn} options={SignInStyle} />
  //       <Stack.Screen name="Home" component={Home} />
  //       <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
  //       <Stack.Screen
  //         name="ForgotPassword"
  //         component={ForgotPassword}
  //         options={ForgotPasswordStyle}
  //       />
  //       <Stack.Screen
  //         name="Preload"
  //         component={Preload}
  //         options={SignUpStyle}
  //       />
  //       <Stack.Screen
  //         name="ListPrev"
  //         component={ListPrev}
  //         options={ListPrevStyle}
  //       />
  //       <Stack.Screen
  //         name="EditPrev"
  //         component={EditPrev}
  //         options={EditPrevStyle}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

export default function App() {
  return <Providers />;
}

// const SignInStyle = {
//   title: 'Bem vindo',
//   headerStyle: {backgroundColor: COLORS.primary},
//   headerTitleStyle: {color: COLORS.white},
// };
// const ForgotPasswordStyle = {
//   title: 'Recuperar Senha',
//   headerStyle: {backgroundColor: COLORS.primary},
//   headerTitleStyle: {color: COLORS.white},
//   headerTintColor: COLORS.white,
// };
// const SignUpStyle = {
//   title: 'Cadastre-se',
//   headerStyle: {backgroundColor: COLORS.primary},
//   headerTitleStyle: {color: COLORS.white},
//   headerTintColor: COLORS.white,
// };
// const ListPrevStyle = {
//   title: 'Listagem',
//   headerStyle: {backgroundColor: COLORS.primary},
//   headerTitleStyle: {color: COLORS.white},
//   headerTintColor: COLORS.white,
// };
// const EditPrevStyle = {
//   title: 'Atualização',
//   headerStyle: {backgroundColor: COLORS.primary},
//   headerTitleStyle: {color: COLORS.white},
//   headerTintColor: COLORS.white,
// };
