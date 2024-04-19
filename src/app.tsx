import React from 'react';
import RootNavigator from './navigation/root-stack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Colors} from '@utils/color';
import {StatusBar} from 'react-native';

const queryClient = new QueryClient();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.primaryGray,
    primary: Colors.primaryGray,
    secondary: Colors.primaryGray,
  },
};

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
