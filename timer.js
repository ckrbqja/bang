import React, {useState, useEffect} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { data } from './const';

export default function Timer() {
  const [minutes, setMinutes] = useState(70);
  const [seconds, setSeconds] = useState(0);
  const [input, setInput] = useState('');
  const [textArea, setTextArea] = useState('');
  const [image, setImage] = useState('');
  // const [정답맞춤, set정답맞춤] = useState(false)
  const [state, setState] = useState({
    input : '',
    image : '',
    correct : false
  })
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
    data[input] && setState({
      text : data[input],
      correct : true,
    })
  };

  return (
    <View className="Timer" style={{flex : 1,alignItems : 'center'}}>

      <View style={{flex : 3, justifyContent : 'center', alignItems : 'center', width : '86%'}}>
        
        <Text style={styles.timerText}>
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
        
        <ScrollView>
          <Image source = {require('./aa.png')} />
          <Text style={styles.textArea}>{state.text}</Text>
        </ScrollView>
      </View>


      
      {
        state.correct 
        ? 
        <View style={{flexDirection : 'row'}}>
          <TouchableOpacity onPress={()=> {setState({text : '병신 ㅋㅋ', correct : true})}}>
            <Text style={{fontSize : 30, paddingRight : 15, paddingLeft: 15, borderRadius : 10, margin : 15, backgroundColor : '#C4C4C4'}}>정답</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
            setState({
              text : '',
              correct : false,

            })
          }}>
            <Text style={{fontSize : 30, paddingRight : 15, paddingLeft: 15, borderRadius : 10, margin : 15, backgroundColor : '#C4C4C4'}}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
        : 
        <View style={styles.bottomView}>  
          <TextInput
            value={input}
            style={[styles.textInput]}
            onChangeText={text => {
              setInput(text);
            }}
          />
          <TouchableOpacity 
            onPress={onPress}
            style={[styles.button]}
          >
            <Text style={{fontSize :20}}>HINT</Text>
          </TouchableOpacity>
        </View>
        
      }
      



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
    flex : 1,
    flexDirection : 'row',
    marginBottom : 15,
    marginRight : 15,
    marginLeft : 15,
    alignItems : 'flex-end'
  },

  textInput: {
    flex : 3,
    marginRight : 15,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    height : 40
  },

  button :{
    flex : 1,
    height : 40,
    backgroundColor : '#C4C4C4',
    borderRadius : 10,
    alignItems : 'center',
    justifyContent : 'center',
    elevation : 1,
  },
  textArea: {
    fontSize : 20,
    margin: 10,
    width: '80%',

  },
});