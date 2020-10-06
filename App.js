import React , {useState} from 'react';
import { StyleSheet,View } from 'react-native';
import Header from './components/Header';
import GameStartScreen from './screens/GameStartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

const fetchFonts = ()=>{
  Font.loadAsync({
    'open-sans' : require('./fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [selectedNo,setselectedNo] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataloaded, setDataloaded] = useState(false);

  if(!dataloaded){
    console.log('font fetch');
    return <AppLoading 
            startAsync = {fetchFonts} 
            onFinish={()=>{setDataloaded(true)}}
            onError={()=>{console.log(error)}}/>
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setselectedNo(null);
  };

  const startGameHandler = selectedNumber => {
    setselectedNo(selectedNumber);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content = <GameStartScreen onStartGame={startGameHandler} />;

  if (selectedNo && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={selectedNo} onGameOver={gameOverHandler}  onRestart={configureNewGameHandler}/>
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={selectedNo}
        onRestart={configureNewGameHandler}
      />
    );
  }
  return (
    <View style={styles.screen}>
    <Header title= "Guess the number"/>
    {content}
    </View>
  );
}

const styles = StyleSheet.create({
 screen: {
   flex : 1 // will occupy entire space of parent element
 }
});
