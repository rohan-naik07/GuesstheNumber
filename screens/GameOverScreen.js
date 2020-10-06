import React, { useState,useRef,useEffect } from 'react';
import {View,Text,StyleSheet,Button,Image} from 'react-native';
import Colors from '../constants/colors';

const BodyText = (props)=>{
    return (
        <Text style={props.style}>{props.children}</Text>
    );
}

const GameOverScreen = (props)=>{
    return(
        <View style={styles.screen}>
            <Text style={styles.bodyText}>Game is Over!!</Text>
            <View style={styles.imageContainer}>
            <Image source={require('../assets/success.png')} style = {styles.image} resizeMode='cover'/>
            </View>
            <View style={styles.txt}>
                <BodyText style={styles.bodyText}>
                We took {' '}<Text style={styles.highlight}>{props.roundsNumber}</Text> 
                {' '} rounds to guess <Text style={styles.highlight}> {props.userNumber}</Text>
                </BodyText>
            </View>
            <Button  title = "NEW GAME" onPress={props.onRestart}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    txt : {
        alignItems : 'center',
        justifyContent : 'center'
    },
    imageContainer : {
        width : 300,
        height : 300,
        borderRadius : 150,
        borderWidth : 1,
        borderColor : 'black',
        overflow : "hidden",
        marginVertical : 30
    },
    image : {
        width : '100%',
        height : '100%'
    },
    highlight : {
        color : Colors.primary
    },
    bodyText : {
        fontFamily : 'open-sans-bold',
        fontSize : 20 ,
        textAlign : 'center'
    },
    txt : {margin : 10}
});
export default GameOverScreen;