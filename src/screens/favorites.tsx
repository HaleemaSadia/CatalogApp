import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useFavoriteAnimes} from '../store/anime';
import {favoriteScreenProps} from '../navigation/types';
import AnimeListItem from 'src/components/anime-list-item';
import {RouteNames} from 'src/navigation/route-names';
import {Anime} from 'src/api/anime';
import PlaceholderScreen from 'src/components/placeholder-screen';
import {Colors} from '@utils/color';

type Props = favoriteScreenProps;

const favoriteScreen: React.FC<Props> = ({navigation}) => {
  const favourtieAnimes = useFavoriteAnimes();

  const renderAnimeItem = ({item}: {item: Anime}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(RouteNames.animeDetail, {id: item.mal_id})
        }>
        <AnimeListItem item={item} />
      </TouchableOpacity>
    );
  };

  const getKeyExtractor = (item: Anime, index: number) => {
    // Generate a unique key based on item's ID and index
    return item.mal_id.toString() + index.toString();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>Favorite List</Text>
      {favourtieAnimes.length > 0 ? (
        <FlatList
          data={favourtieAnimes}
          showsVerticalScrollIndicator={false}
          keyExtractor={getKeyExtractor}
          renderItem={renderAnimeItem}
        />
      ) : (
        <PlaceholderScreen message="No favorite animes found." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  heading2: {
    color: Colors.grayFour,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default favoriteScreen;
