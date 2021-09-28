import React from 'react';
import {SafeAreaView} from 'react-native';
import Timer from './timer';

export default function App() {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Timer />
    </SafeAreaView>
  );
}
