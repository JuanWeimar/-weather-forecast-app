/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LogoutButton from '../components/LogoutButton';
import Preload from '../screens/Preload';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import EditPrev from '../screens/EditPrev';
import ListPrev from '../screens/ListPrev';
import CreateAdv from '../screens/CreateAdv';
import ListAdv from '../screens/Advogados/ListAdv';
import ForgotPassword from '../screens/ForgotPassword';
import {COLORS} from '../assets/colors';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Advogados from '../screens/Advogados';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
    const AppStack = () => (
            <Drawer.Navigator
                initialRouteName="Home"
                // screenOptions={{
                //   headerShown: 'true',
                //   headerStyle: {
                //     backgroundColor: COLORS.primary,
                //     paddingRight: 5,
                //   },
                //   headerTintColor: COLORS.white,
                //   headerRight: () => <LogoutButton />,
                // }}
                drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
                name="Home"
                component={Home}
                />
                <Drawer.Screen name="ListPrev" component={ListPrev} />
                <Drawer.Screen name="EditPrev" component={EditPrev} />
                <Drawer.Screen name="CreateAdv" component={CreateAdv} />
                <Drawer.Screen name="Advogados" component={Advogados} options={advStyle} />

            </Drawer.Navigator>
    );
    const AuthStack = () => {
        return (
            <Stack.Navigator initialRouteName="Preload">
                <Stack.Screen
                    name="Preload"
                    component={Preload}
                    options={SignUpStyle}
                />
                <Stack.Screen name="SignIn" component={SignIn} options={SignInStyle} />
                {/* <Stack.Screen name="Home" component={Home} /> */}
                <Stack.Screen name="SignUp" component={SignUp} options={SignUpStyle} />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={ForgotPasswordStyle}
                />
                {/* <Stack.Screen
                    name="ListPrev"
                    component={ListPrev}
                    options={ListPrevStyle}
                />
                <Stack.Screen
                    name="EditPrev"
                    component={EditPrev}
                    options={EditPrevStyle}
                /> */}
            </Stack.Navigator>
        );
    };
  return (
    <NavigationContainer>
        <StatusBar backgroundColor={COLORS.primaryDark} />
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

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
  const ListPrevStyle = {
    title: 'Listagem',
    headerStyle: {backgroundColor: COLORS.primary},
    headerTitleStyle: {color: COLORS.white},
    headerTintColor: COLORS.white,
  };
  const EditPrevStyle = {
    title: 'Atualização',
    headerStyle: {backgroundColor: COLORS.primary},
    headerTitleStyle: {color: COLORS.white},
    headerTintColor: COLORS.white,
  };
  const advStyle = {
    title: 'Advogados',
    headerStyle: {backgroundColor: COLORS.primary},
    headerTitleStyle: {color: COLORS.white},
    headerTintColor: COLORS.white,
  };
