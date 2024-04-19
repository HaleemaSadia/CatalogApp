import AnimeListItem from 'src/components/anime-list-item';
import SearchBar from 'src/components/search-bar';
import ScreenLoading from '../components/loading-screen';
import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useGetAllAnimes, Anime} from 'src/api/anime';
import {AnimeListScreenProps} from 'src/navigation/types';
import {RouteNames} from 'src/navigation/route-names';
import PlaceholderScreen from 'src/components/placeholder-screen';
import SplashScreen from 'react-native-splash-screen';

type Props = AnimeListScreenProps;

const AnimeListScreen: React.FC<Props> = ({navigation, route}) => {
  const {status} = route.params;
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState<Anime[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const {
    data: fetchedAnimeList,
    isLoading,
    isFetching,
    isError,
  } = useGetAllAnimes(page, status);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if (fetchedAnimeList) {
      // Reset or append data based on the page number
      setAnimeList(prevList => {
        if (page === 1) {
          return fetchedAnimeList.data || [];
        } else {
          return [...prevList, ...(fetchedAnimeList.data || [])];
        }
      });
    }
  }, [fetchedAnimeList, page]);

  const fetchNextPage = () => {
    // Check if data is still loading or fetching or user is searching
    if (isLoading || isFetching || searchQuery) {
      return;
    }

    // Check if there is a next page and increment the page count
    if (fetchedAnimeList?.pagination?.has_next_page === true) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      // If search query is empty, show the entire list
      setAnimeList(fetchedAnimeList?.data || []);
      return;
    }
    const filtered = animeList.filter(anime =>
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredAnimeList(filtered || []);
  };

  // Determine the data to render based on search state
  const dataToRender = searchQuery ? filteredAnimeList : animeList;

  const renderEmptyView = () => (
    <PlaceholderScreen message="No results found" />
  );

  const renderErrorView = () => (
    <PlaceholderScreen message="Error fetching data" />
  );

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

  const renderFlatList = () => (
    <FlatList
      data={dataToRender}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      keyExtractor={getKeyExtractor}
      renderItem={renderAnimeItem}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.6}
    />
  );

  const renderContent = () => {
    if ((isLoading || isFetching) && animeList.length === 0) {
      return <ScreenLoading />;
    }
    if (isError) {
      return renderErrorView();
    }
    if (dataToRender.length === 0) {
      return renderEmptyView();
    }
    return renderFlatList();
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={searchQuery}
        onTermChange={setSearchQuery}
        onTermSubmit={() => handleSearch(searchQuery)}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 20,
  },
});

export default AnimeListScreen;
