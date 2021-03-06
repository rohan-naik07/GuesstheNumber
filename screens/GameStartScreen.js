import React, { useState } from 'react';
import {View,Text,StyleSheet,Button,
  TouchableWithoutFeedback,Keyboard,Alert,Dimensions,KeyboardAvoidingView,ScrollView} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';


const GameStartScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth,setbuttonWidth] = useState(Dimensions.get('window').width * 0.3 );

  const numberInputHandler = inputText => {
    setEnteredValue(inputText);
  };

  useEffect = ()=>{
    const updateLayout = ()=> {
      console.log('screen tilted');
      setbuttonWidth(Dimensions.get('window').width/3)
    }
    Dimensions.addEventListener('change',updateLayout);
    return ()=>{
      Dimensions.removeEventListener('change',updateLayout);
    }
  }

  const resetInputHandler = () => {
    console.log('into')
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="START GAME" onPress={()=>{ props.onStartGame(selectedNumber);}} />
      </Card>
    );
  }

  if(Dimensions.get('window').height < 500){
    return (
       <ScrollView>
    <KeyboardAvoidingView behavior = 'position' keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            input={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false} // all these props must be passed to derived component props using {...props}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}/>

          <View style={styles.buttonContainer}>
            <View style={{width : buttonWidth}}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
            </View>
            <View style={{width : buttonWidth}}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
    );
  }

  return (
    <ScrollView>
    <KeyboardAvoidingView behavior = 'position' keyboardVerticalOffset={30}>
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            input={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false} // all these props must be passed to derived component props using {...props}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}/>
          <View style={styles.buttonContainer}>
            <View style={{width : buttonWidth}}>
              <Button title="Reset" onPress={resetInputHandler} color={Colors.accent}/>
            </View>
            <View style={{width : buttonWidth}}>
              <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary}/>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily : 'open-sans-bold'
  },
  inputContainer: {
    width: '80%', // never hardcode width
    minWidth: 300,
    maxWidth : '95%',
    alignItems: 'center'
  },
  inputContainerhorizontal : {
    flexDirection : 'row',
    width: '80%', // never hardcode width
    minWidth: 300,
    maxWidth : '95%',
    alignItems: 'center',
    justifyContent : 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  input: {
    width: 120
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default GameStartScreen;
