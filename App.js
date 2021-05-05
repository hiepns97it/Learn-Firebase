import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { 
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

var Firebase = require('firebase');

export default class App extends Component {
  constructor(props) {
    super(props);
    var root = new Firebase("https://demoreactnt-default-rtdb.firebaseio.com/");
    this.itemsRef = root;

    this.state = {
      data: []
    }
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
    this.itemsRef.child("HiepNS/IOS").once("value")
      .then(function (snapshot) {
        debugger
        alert(snapshot.val());
      });
  }

  componentDidMount() {
    this.fectchData();
  }

  fectchData() {
    let item = [];
    this.itemsRef.on('child_added', (data) => {
      item.push({
        id: data.key(),
        value: data.val()
      })

      this.setState({
        data : item
      })
    });
  }

  renderItemComponent = (data) =>(
    <View style={ styles.item }>
      <TouchableOpacity>
                <Text> { data.item.id } </Text>
      </TouchableOpacity>
    </View>
     
  );
  

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={() => this.saveSet()}>
          <Text>Lưa dữ liệu firebase Set()</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => this.savePush()}>
          <Text>Lưa dữ liệu firebase Put()</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity onPress={() => this.addData()}>
          <Text>Lưa dữ liệu firebase AddData()</Text>
        </TouchableOpacity> */}
        
        <SafeAreaView>
            <FlatList
                data={this.state.data}
                renderItem={item => this.renderItemComponent(item)}
                keyExtractor={item => item.id.toString()}
            />  
        </SafeAreaView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
