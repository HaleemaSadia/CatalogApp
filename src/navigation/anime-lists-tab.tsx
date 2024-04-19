import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AnimeListScreen from '../screens/anime-list';
import {upcomingShows, completedShows, airingShows} from '@utils/assets/images';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {AnimeTabParamList} from './types';
import {Colors} from '@utils/color';

const Tab = createBottomTabNavigator<AnimeTabParamList>();

const tabIcon = (image: ImageSourcePropType | undefined, color: string) => {
  return <Image source={image} style={styles.tabIcon} tintColor={color} />;
};

const AnimeListsTab = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.grayThree,
        tabBarStyle: {
          backgroundColor: Colors.secondaryGray,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Airing"
        options={{
          tabBarLabel: 'Airing',
          tabBarIcon: ({color}) => tabIcon(airingShows, color),
        }}
        component={AnimeListScreen}
        initialParams={{status: 'airing'}}
      />
      <Tab.Screen
        name="Complete"
        options={{
          tabBarLabel: 'Complete',
          tabBarIcon: ({color}) => tabIcon(completedShows, color),
        }}
        component={AnimeListScreen}
        initialParams={{status: 'complete'}}
      />
      <Tab.Screen
        name="Upcoming"
        options={{
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({color}) => tabIcon(upcomingShows, color),
        }}
        component={AnimeListScreen}
        initialParams={{status: 'upcoming'}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.grayThree,
    marginTop: 4,
  },
  bottomBar: {
    backgroundColor: Colors.secondaryGray,
  },
  headerTitle: {
    color: Colors.white,
  },
});

export default AnimeListsTab;
