import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Timer from './timer';

export default function App() {
  return (
    <SafeAreaView style={styles.safeView}>
      <Timer style={styles.aa} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    height: '100%',
  },
});
