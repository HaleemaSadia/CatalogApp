import * as React from 'react';
import {Text, View} from 'react-native';
import {COMMON_STYLES} from 'src/styles/common-styles';

interface PlaceholderScreenProps {
  message: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  message,
}: {
  message: string;
}) => {
  return (
    <View style={COMMON_STYLES.flexCenter}>
      <Text style={COMMON_STYLES.textColor}>{message}</Text>
    </View>
  );
};

export default PlaceholderScreen;
