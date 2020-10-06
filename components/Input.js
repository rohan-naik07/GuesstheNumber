import React from 'react';
import {View,Text, TextInput, Button,StyleSheet} from 'react-native';

const Input = (props)=>{
    return (
        <TextInput {...props} style={{...styles.inputText,...props.input}}>
        </TextInput>
    );
}
const styles = StyleSheet.create({
    inputText: {
      height: 30,
      borderColor: 'black',
      borderWidth: 2,
      borderColor : 10,
      marginVertical: 10
    }
  });
export default Input;