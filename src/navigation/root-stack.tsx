import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailScreen from '../screens/anime-detail';
import DrawerNavigator from './drawer';
import {RouteNames} from './route-names';
import {AnimeStackParamList} from './types';
import {Colors} from '@utils/color';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<AnimeStackParamList>();

const RootStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      initialRouteName={RouteNames.drawer}
      screenOptions={{
        headerStyle: styles.header,
        headerShadowVisible: false,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name={RouteNames.drawer}
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RouteNames.animeDetail}
        component={DetailScreen}
        options={{headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryGray,
  },
  headerTitle: {
    color: Colors.white,
  },
});
export default RootStack;
