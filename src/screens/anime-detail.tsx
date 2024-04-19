import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Anime, useGetAnimeById} from 'src/api/anime';
import {favorite, notfavorite} from '@utils/assets/images';
import LoadingScreen from 'src/components/loading-screen';
import {AnimeDetailScreenProps} from 'src/navigation/types';
import {useAnimeActions, useFavoriteAnimes} from '../store/anime';
import PlaceholderScreen from 'src/components/placeholder-screen';
import FastImage from 'react-native-fast-image';
import {Colors} from '@utils/color';

type Props = AnimeDetailScreenProps;

const AnimeDetailScreen: React.FC<Props> = ({route}) => {
  const {data, isLoading, isSuccess, isError} = useGetAnimeById(
    route.params.id,
  );
  const [animeDetail, setAnimeDetail] = useState<Anime | null>(null);
  const [isfavorite, setIsfavorite] = useState(false);

  const {addToFavorite, removeFromFavorite} = useAnimeActions();

  const favourtieAnimes = useFavoriteAnimes();

  // Effect for setting up initial filteredAnimeList
  useEffect(() => {
    if (data) {
      setAnimeDetail(data);
      const isFav = favourtieAnimes.some(anime => anime.mal_id === data.mal_id);
      setIsfavorite(isFav);
    }
  }, [data, favourtieAnimes]);

  const onAddToFavoritePress = React.useCallback(
    (anime: Anime) => () => {
      if (
        favourtieAnimes.find(
          favourtieAnime => favourtieAnime.mal_id === anime.mal_id,
        )
      ) {
        removeFromFavorite(anime.mal_id);
        setIsfavorite(false);
      } else {
        addToFavorite(anime);
        setIsfavorite(true);
      }
    },
    [addToFavorite, favourtieAnimes, removeFromFavorite],
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (!animeDetail) {
    return null;
  }

  return (
    <View style={styles.safeArea}>
      {isError && <PlaceholderScreen message="Error loading data" />}
      {isSuccess && (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <FastImage
            fallback={true}
            style={styles.imageStyle}
            source={{
              uri: animeDetail.images.jpg.image_url,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.titleRow}>
            <Text style={styles.titleStyle}>{animeDetail.title}</Text>
            <TouchableOpacity
              onPress={onAddToFavoritePress(animeDetail)}
              style={styles.iconContainer}>
              {isfavorite ? (
                <Image
                  style={[styles.favoriteIcon, styles.favoriteColor]}
                  source={favorite}
                />
              ) : (
                <Image style={styles.favoriteIcon} source={notfavorite} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.subTitleStyle}>Year: {animeDetail.year}</Text>
          <Text style={styles.subTitleStyle}>Rating: {animeDetail.rating}</Text>
          <Text style={styles.subTitleStyle}>Score: {animeDetail.score}</Text>
          <Text style={styles.descriptionText}>{animeDetail.synopsis}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 5,
  },
  safeArea: {
    flex: 1,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    width: '80%',
  },
  subTitleStyle: {
    fontWeight: 'normal',
    fontSize: 13,
    color: Colors.grayThree,
    marginTop: 2,
  },
  imageStyle: {
    height: 195,
    borderRadius: 5,
  },
  descriptionText: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'justify',
    color: Colors.grayNine,
  },
  titleRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    height: 23,
    width: 23,
    tintColor: Colors.grayThree,
  },
  iconContainer: {
    height: 60,
    width: 60,
    alignItems: 'flex-end',
  },
  favoriteColor: {
    tintColor: Colors.red,
  },
});

export default AnimeDetailScreen;
