import React, {useState, useEffect, useRef} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {data} from './const';

export default function Timer() {
  const [minutes, setMinutes] = useState(data.timer);
  const [seconds, setSeconds] = useState(0);
  const [정답확인, set정답확인] = useState(0);
  const [input, setInput] = useState('');
  const [display, setDisplay] = useState('');
  const [stopTime, setStopTime] = useState(true);
  const [buttonName, setButtonName] = useState('START');
  const [state, setState] = useState({
    input: '',
    image: '',
    correct: false,
  });
  const inputRef = useRef();
  useEffect(() => {
    const countdown = setInterval(async () => {
      let date;
      await AsyncStorage.getItem('sc', (e, r) => (date = r));
      if (date !== null) {
        date = new Date(date);
        const realNow = new Date();
        let sSe = Math.round((realNow - date) / 1000);
        let sMn = Math.ceil(sSe / 60);
        sSe = Math.round(sSe % 60);
        if (sMn === 0 && sSe === 0) {
          setSeconds(0);
        }
        if (data.timer - sMn < 0) {
          setMinutes(0);
          setSeconds(0);
        } else {
          setMinutes(data.timer - sMn);
          setSeconds(60 - sSe === 60 ? 0 : 60 - sSe);
        }
      }
    }, 0);
    stopTime && clearInterval(countdown);
    return () => clearInterval(countdown);
  }, [minutes, seconds, stopTime]);

  useEffect(async () => {
    let date;
    await AsyncStorage.getItem('sc', (e, r) => (date = r));
    if (date !== null) {
      date = new Date(date);
      const realNow = new Date();
      let sSe = Math.round((realNow - date) / 1000);
      let sMn = Math.ceil(sSe / 60);
      sSe = Math.round(sSe % 60);
      if (minutes - sMn < 0) {
        setMinutes(0);
        setSeconds(0);
      } else {
        setMinutes(minutes - sMn);
        setSeconds(60 - sSe);
      }
      setStopTime(false);
      setButtonName('HINT');
    }
  }, []);

  const onPress = async () => {
    if (buttonName === 'START') {
      await AsyncStorage.setItem('sc', await new Date().toString());
    }
    stopTime && (setStopTime(false), setButtonName('HINT'));
    if (data[input] === undefined) {
      setInput('');

      return;
    }
    if (data[input].힌트 === 'admin') {
      input === 'btc' && set정답확인(0);
      setInput('');
      setStopTime(true);
      setButtonName('START');
      await AsyncStorage.setItem('sc', '');
      await setMinutes(data.timer);
      await setSeconds(0);
    } else {
      setState({
        text: data[input].힌트,
        correct: true,
        image: data[input].이미지,
      });
    }
  };

  return (
    <View className="Timer" style={{flex: 1, alignItems: 'center'}}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center',
          width: '86%',
        }}>
        <Text style={{fontSize: 15, marginBottom: -30}}>
          정답 사용 횟수: {정답확인}
        </Text>
        <Text style={{...styles.timerText, top: state.correct ? 0 : '50%'}}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>

        <ScrollView style={{width: '100%'}}>
          {state.image !== '' && ( //
            <Image source={state.image} />
          )}
          <Text style={styles.textArea}>{state.text}</Text>
        </ScrollView>
      </View>

      {state.correct ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={e => {
              setState({
                text: data[input].정답,
                correct: true,
                image: data[input].답이미지,
              });
              setDisplay('display');
              set정답확인(정답확인 + 1);
            }}>
            <Text ref={inputRef} style={styles['정답버튼' + display]}>
              정답
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setState({
                text: '',
                correct: false,
              });
              setDisplay('');
              setInput('');
            }}>
            <Text
              style={{
                fontSize: 30,
                paddingRight: 15,
                paddingLeft: 15,
                borderRadius: 10,
                margin: 15,
                backgroundColor: '#C4C4C4',
              }}>
              뒤로가기
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.bottomView}>
          <TextInput
            value={input}
            style={[styles.textInput]}
            onChangeText={text => {
              setInput(text);
            }}
          />
          <TouchableOpacity onPress={onPress} style={[styles.button]}>
            <Text style={{fontSize: 20}}>{buttonName}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timerText: {
    fontWeight: 'bold',
    fontSize: 100,
  },
  view: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  bottomView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 15,
    alignItems: 'flex-end',
  },

  textInput: {
    flex: 3,
    marginRight: 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
  },

  button: {
    flex: 1,
    height: 40,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  textArea: {
    fontSize: 20,
    margin: 10,
    width: '95%',
  },
  정답버튼: {
    fontSize: 30,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
    margin: 15,
    backgroundColor: '#C4C4C4',
  },
  정답버튼display: {
    fontSize: 30,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
    margin: 15,
    backgroundColor: '#C4C4C4',
    display: 'none',
  },
});
