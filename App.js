import React from 'react';
import type {Node} from 'react';
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
import Timer from './component/timer';

const App: () => Node = () => {
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

export default App;
