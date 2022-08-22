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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primaryDark} />
      <Stack.Navigator initialRouteName="Preload">
        <Stack.Screen name="SignIn" component={SignIn} options={SignInStyle} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={ForgotPasswordStyle}
        />
        <Stack.Screen
          name="Preload"
          component={Preload}
          options={SignUpStyle}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const SignInStyle = {
  title: 'Bem vindo',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
};
const ForgotPasswordStyle = {
  title: 'Recuperar Senha',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
const SignUpStyle = {
  title: 'Cadastre-se',
  headerStyle: {backgroundColor: COLORS.primary},
  headerTitleStyle: {color: COLORS.white},
  headerTintColor: COLORS.white,
};
