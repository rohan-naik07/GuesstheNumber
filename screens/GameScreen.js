import React, { useState,useRef,useEffect } from 'react';
import {View,Text,StyleSheet,Button,Alert,FlatList} from 'react-native';
import Colors from '../constants/colors';
import Card from '../components/Card';
import {Ionicons} from '@expo/vector-icons';
import MyButton from '../components/MyButton'
import NumberContainer from '../components/NumberContainer';

function generateRandomBetween(min,max,exclude){
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomBetween = Math.floor(Math.random()*(max-min))+min;
    if(randomBetween===exclude){
        generateRandomBetween(min,max,exclude);
    }
    else{
        return randomBetween;
    }
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
      <Text>#{listLength - itemData.index}</Text>
      <Text>{itemData.item}</Text>
    </View>
  );

const GameScreen = (props)=>{
    const initialGuess = generateRandomBetween(1,100,props.userChoice);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    var currentLow = useRef(1); // when the component is rerendered the values survive
    var currentHigh = useRef(100);
    const {userChoice,onGameOver} = props;

    useEffect(()=>{
        if(userChoice === currentGuess || isNaN(currentGuess)){
            onGameOver(pastGuesses.length);
        }
    },[currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction => {
        if (
          (direction === 'lower' && currentGuess < props.userChoice) ||
          (direction === 'greater' && currentGuess > props.userChoice)
        ) {
          Alert.alert("Don't lie!", 'You know that this is wrong...', [
            { text: 'Sorry!', style: 'cancel' }
          ]);
          return;
        }
        if (direction === 'lower') {
          currentHigh.current = currentGuess;
        } else {
          currentLow.current = currentGuess+1;
        }
        const nextNumber = generateRandomBetween(
          currentLow.current,
          currentHigh.current,
          currentGuess
        );
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [
            nextNumber.toString(),
            ...curPastGuesses
          ]);
      };
      const onExitPressed = ()=>{
          props.onRestart();
      }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <MyButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MyButton>
                <MyButton onPress={nextGuessHandler.bind(this, 'greater')}>
                     <Ionicons name="md-add" size={24} color="white" />
                </MyButton>
            </Card>
            <View style={styles.button}><MyButton onPress={onExitPressed}>Exit</MyButton></View>
            <View style={styles.listContainer}>
            <FlatList
                keyExtractor={item => item}
                data={pastGuesses}
                renderItem={renderListItem.bind(this, pastGuesses.length)}
                contentContainerStyle={styles.list}/>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex :1,
        padding : 10,
        alignItems : 'center'
    },
    buttonContainer : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginTop : 10,
        width : 300,
        maxWidth : '80%'
    },
    button : {
        marginTop : 10,
        width : '100%',
        justifyContent : 'center',
        margin : 10
    },
    list : {    // applied to flat list
        flexGrow : 1,
        justifyContent : 'center'
    },
    listContainer : {  //applied to container which contains flat list
        flex: 1,
        width: '60%'
    },
    listItem: {  // applied to each list item
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    }
});

export default GameScreen;
