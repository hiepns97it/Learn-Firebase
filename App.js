import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

var Firebase = require('firebase');

export default class App extends Component {
  constructor(props) {
    super(props);
    var root = new Firebase("https://demoreactnt-default-rtdb.firebaseio.com/");
    this.itemsRef = root;
  }

  saveSet() {
    this.itemsRef.set({
      reactNative: "HiepsNS",
      Firebase: "React Native",
      IOS: "oki main"
    })
  }

  savePush() {
    this.itemsRef.child("TEST PUT").push({
      PUSH: "Firebase test push"
    })
  }

  addData() {
    // this.itemsRef.child("HiepNS/IOS").once("value", function (snapshot) {
    //   alert(snapshot.val());
    // })
    this.itemsRef.child("HiepNS").once("value")
      .then(function (snapshot) {
        debugger
        alert(snapshot.val());
      });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => this.saveSet()}>
          <Text>Lưa dữ liệu firebase Set()</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => this.savePush()}>
          <Text>Lưa dữ liệu firebase Put()</Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => this.addData()}>
          <Text>Lưa dữ liệu firebase AddData()</Text>
        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
