import React, { useState } from 'react';
import AppNavigator from './AppNavigator';
import LoginNavigator from './LoginNavigator';

const Navigator = () => {
     const [isLoggedIn, setIsLoggedIn] = useState(false);
  return <>{isLoggedIn ? <AppNavigator /> : <LoginNavigator />}</>;
};

export default Navigator;
