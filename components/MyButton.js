import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';

const MyButton = props => {
  return (
    <TouchableOpacity  activeOpacity={0.8} onPress={props.onPress}>
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor : Colors.primary,
   padding : 10,
   borderRadius : 25,
   alignItems : 'center'
  },
  text: {
    color: 'white',
    fontFamily : 'opens-sans-bold',
    fontSize : 20,
    
  }
});

export default MyButton;