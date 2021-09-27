import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function Timer() {
  const [minutes, setMinutes] = useState(70);
  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState('');
  const [textArea, setTextArea] = useState('');
  const [image, setImage] = useState('vue.png');

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const onPress = () => {
    // data[input] && setTextArea(data[input]);
    // data[input] && setImage(data);
  };

  return (
    <View className="Timer">
      <View style={styles.view}>
        <Text style={styles.timerText}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
        <ScrollView>
          <Text style={styles.textArea}>{textArea}</Text>
        </ScrollView>
        <View style={styles.bottomView}>
          <TextInput
            value={input}
            style={styles.textInput}
            onChangeText={text => {
              setInput(text);
            }}
          />
          <Button title="HINT" onPress={onPress} />
        </View>
      </View>
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
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    width: 300,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  bottomView: {
    backgroundColor: 'white',
    width: '100%',
    marginTop: 'auto',
    display: 'flex',
  },
  textArea: {
    margin: 'auto 0',
    width: '80%',
  },
});
