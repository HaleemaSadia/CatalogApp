import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import favoriteScreen from '../screens/favorites';
import AnimeListsTabNavigator from './anime-lists-tab';
import {RouteNames} from './route-names';
import {AnimeStackParamList} from './types';
import {StyleSheet, View} from 'react-native';
import {Colors} from '@utils/color';

const Drawer = createDrawerNavigator<AnimeStackParamList>();

const CustomDrawerContent = (props: any) => {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

const DrawerNavigator = (): JSX.Element => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: styles.header,
        headerShadowVisible: false,
        headerTitleStyle: styles.headerTitle,
        drawerStyle: {
          backgroundColor: Colors.primaryGray,
        },
        headerTintColor: Colors.white,
        drawerActiveTintColor: Colors.white,
        drawerInactiveTintColor: Colors.grayThree,
        drawerActiveBackgroundColor: Colors.grayFive,
      }}>
      <Drawer.Screen
        name={RouteNames.animeList}
        component={AnimeListsTabNavigator}
      />
      <Drawer.Screen name={RouteNames.favorite} component={favoriteScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryGray,
  },
  headerTitle: {
    color: Colors.white,
  },
  drawerContainer: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: Colors.primaryGray,
  },
});
export default DrawerNavigator;
