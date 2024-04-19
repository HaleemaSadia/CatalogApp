import {Colors} from '@utils/color';
import * as React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {COMMON_STYLES} from 'src/styles/common-styles';

const LoadingScreen: React.FC = () => {
  return (
    <View style={COMMON_STYLES.flexCenter}>
      <ActivityIndicator
        testID="screen-loader"
        size="large"
        color={Colors.grayFour}
      />
    </View>
  );
};

export default LoadingScreen;
