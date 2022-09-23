/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../assets/colors';
import {AuthUserContext} from '../context/AuthUserProvider';

const LogoutButton = () => {
  const {signOut} = useContext(AuthUserContext);

  return (
    <Icon
      name="exit-outline"
      size={25}
      color={COLORS.white}
      onPress={() => signOut()}
    />
  );
};
export default LogoutButton;
