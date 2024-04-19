import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RouteNames} from './route-names';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

export type AnimeStackParamList = {
  [RouteNames.animeList]: {status: 'airing' | 'complete' | 'upcoming'};
  [RouteNames.favorite]: undefined;
  [RouteNames.animeDetail]: {id: number};
  [RouteNames.drawer]: undefined;
};

export type AnimeTabParamList = {
  Airing: {status: 'airing'};
  Complete: {status: 'complete'};
  Upcoming: {status: 'upcoming'};
};

export type AnimeListScreenProps = {
  navigation: BottomTabNavigationProp<
    AnimeTabParamList & AnimeStackParamList,
    'Airing' | 'Complete' | 'Upcoming'
  >;
  route: RouteProp<
    AnimeTabParamList & AnimeStackParamList,
    'Airing' | 'Complete' | 'Upcoming'
  >;
};

export type AnimeDetailScreenProps = NativeStackScreenProps<
  AnimeStackParamList,
  RouteNames.animeDetail
>;

export type favoriteScreenProps = NativeStackScreenProps<
  AnimeStackParamList,
  RouteNames.favorite
>;
