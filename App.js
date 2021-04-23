import React, { useState } from "react";
import {
  StyleSheet, Text, View, Image, SafeAreaView,
  TextInput, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Api from './api/Api';

const config = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height
}

const Flex = () => {
  // reply from chatbot
  const [data, setData] = useState('Chat with me, The AI.');
  //input from user
  const [input, setInput] = useState('');
  // save text of user
  const onChangeText = (text) => {
    data ? setData('') : 
    setInput(text)
  }
  const sendClicked = async () => {
    // alert("you pressed send key!!!");
    if (input) {
      setData('Processing...')
      try {
        // post user input to api
        axios({
          method: 'post',
          url: 'https://chatbot-api-00.herokuapp.com/post/',
          data: {
            input: input
          }
        });
      } catch (err) {
        setData('Error occured while sending. Might be the weak internet connection.')
        console.log(err)
        return
      }
      try {
        // get reply from AI
        const response = await Api.get('/get', {
          params: {
            format: 'json'
          }
        });
        setData(response.data.output);
      } catch (err) {
        setData('Error Occured while receiving. Might be weak internet connection.')
      }
    } else {
      setData('Please type something.')
    }
  }
  return (
    <SafeAreaView style={[styles.container, {
      flexDirection: "column"
    }]}>
        {/* upper body profile, robot name, active now */}
        <View style={ styles.profile } >
        <Image source={require('./img/profile.jpg')} style={{ width: 45, height: 45, borderRadius: 20 }} />
        <View style={{flexDirection:"column"}}>
        <Text style={{ marginLeft: config.deviceWidth * 0.01, fontWeight: "bold", fontSize: 17 }}>
          Mr. Robot
        </Text>
        <Text style={{ marginLeft: config.deviceWidth * 0.01, color: "#C0C0C0", fontSize: 14 }}>
          Active Now
        </Text>
        </View>
      </View>

      {/* body of chat, input and reply from chatbot */}
      <View style={{ flex: 1, flexDirection: "column-reverse",  backgroundColor: "white" }} >
        {/* <ScrollView> */}
          {data ? <View style={{height: 90, flexDirection: "row"}}>
            <Image source={require('./img/profile.jpg')} style={{ width: 45, height: 45, borderRadius: 20 }} />
            <Text style={styles.outputData}>{data}</Text>
          </View> : null}

          {input ? <View style={{height: 90, marginBottom: 30}}>
            <Text style={styles.outputInput}>{input}</Text>
          </View> : null}
          
        {/* </ScrollView> */}
      </View>

      {/* input area and send bottom */}
      <View style={{ height: 20, backgroundColor: "white", flexDirection: "row-reverse", marginTop: 10, marginBottom: 8 }} >
        <TouchableOpacity activeOpacity = { .5 } onPress={ sendClicked }>
          {/* <Image source={require('./img/send.png')} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} /> */}
          <FontAwesome name="send" size={24} color="blue" style={{marginTop: 6}} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          defaultValue={input}
          placeholder={"    Type a message..."}
        />
      </View>   
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  input: {
    padding: 10,
    flex: 1,
    height: 40,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: 20,
  },
  outputData: {
    textAlign: "left",
    backgroundColor: "#C0C0C0",
    color: "black",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 10,
    marginRight: 60,
    marginLeft: 10,
    marginTop: 3, 
  },
  outputInput: {
    marginLeft: 60,
    flexDirection: "row",
    textAlign: "right",
    backgroundColor: "blue",
    color: "white",
    alignSelf: "flex-end",
    borderRadius: 10,
    padding: 10,
  },
  profile: {
    backgroundColor: "white",
    borderBottomColor: "#C0C0C0",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 50,
    marginBottom: 10
  }
});

export default Flex;