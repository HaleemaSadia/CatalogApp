import React from 'react';
import {View, StyleSheet, TextInput, Image} from 'react-native';
import {search} from '@utils/assets/images';
import {Colors} from '@utils/color';

interface SearchBarProps {
  term: string;
  onTermChange: (term: string) => void;
  onTermSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  term,
  onTermChange,
  onTermSubmit,
}) => {
  return (
    <View style={styles.containerStyle}>
      <Image source={search} style={styles.iconStyle} />
      <TextInput
        placeholder="Search anime by name"
        placeholderTextColor={Colors.graySeven}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        value={term}
        onChangeText={newTerm => onTermChange(newTerm)}
        onEndEditing={() => onTermSubmit()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.graySix,
    height: 40,
    borderRadius: 4,
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    color: Colors.white,
  },
  iconStyle: {
    alignSelf: 'center',
    marginHorizontal: 15,
    width: 20,
    height: 20,
    tintColor: Colors.grayThree,
  },
});

export default SearchBar;
