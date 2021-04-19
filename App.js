import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Dimensions, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const config = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height
}

const sendClicked = () => {
  alert("you pressed send key!!!");
}

const Flex = () => {
  return (
    <SafeAreaView style={[styles.container, {
      flexDirection: "column", margin: 20
    }]}>

      <View style={{ flex: 3, backgroundColor: "white", borderBottomColor: "#C0C0C0", borderBottomWidth: 1, flexDirection: "row" }} >
       <Image source={require('./img/profile.jpg')} style={{ width: 40, height: 40, borderRadius: 20 }} />
       <View style={{flexDirection:"column"}}>
        <Text style={{ marginLeft: config.deviceWidth * 0.01, fontWeight: "bold", fontSize: 17 }}>Mr. Robot</Text>
        <Text style={{ marginLeft: config.deviceWidth * 0.01, color: "#C0C0C0", fontSize: 14 }}>Active Now</Text>
       </View>
      </View>

      <View style={{ flex: 25, backgroundColor: "white" }} >
        <Text>hello</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: "white", flexDirection: "row-reverse" }} >
        <TouchableOpacity activeOpacity = { .5 } onPress={ sendClicked }>
          {/* <Image source={require('./img/send.png')} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} /> */}
          <FontAwesome name="send" size={24} color="blue" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          // onChangeText={onChangeText}
          // value={text}
          placeholder={"    Type a message..."}
        />
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
});

export default Flex;