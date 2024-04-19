import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Anime} from 'src/api/anime';
import {COMMON_STYLES} from 'src/styles/common-styles';
import FastImage from 'react-native-fast-image';
import {Colors} from '@utils/color';
interface AnimeListItemProps {
  item: Anime;
}

const AnimeListItem: React.FC<AnimeListItemProps> = React.memo(({item}) => {
  return (
    <View style={styles.container}>
      <FastImage
        fallback={true}
        style={styles.imageStyle}
        source={{
          uri: item.images.jpg.image_url,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={styles.descriptionContainer}>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.subTitleStyle}>Year: {item.year}</Text>
        <Text style={styles.subTitleStyle} numberOfLines={1}>
          Rating: {item.rating}
        </Text>
        <Text style={styles.subTitleStyle}>Score: {item.score}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: Colors.grayEleven,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    height: COMMON_STYLES.itemHeight,
  },
  descriptionContainer: {
    marginLeft: 8,
    marginTop: 8,
    flex: 1,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 2,
  },
  subTitleStyle: {
    fontWeight: 'normal',
    fontSize: 13,
    color: Colors.grayThree,
  },
  imageStyle: {
    width: 110,
  },
});
export default AnimeListItem;
