
// import { StatusBar } from 'expo-status-bar';
// import React, { Component } from 'react';
// import { 
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   View,
//   TouchableOpacity,
//   Text
// } from 'react-native';

// var Firebase = require('firebase');

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     var root = new Firebase("https://demoreactnt-default-rtdb.firebaseio.com/");
//     this.itemsRef = root;

//     this.state = {
//       data: []
//     }
//   }

//   saveSet() {
//     this.itemsRef.set({
//       reactNative: "HiepsNS",
//       Firebase: "React Native",
//       IOS: "oki main"
//     })
//   }

//   savePush() {
//     this.itemsRef.child("TEST PUT").push({
//       PUSH: "Firebase test push"
//     })
//   }

//   addData() {
//     // this.itemsRef.child("HiepNS/IOS").once("value", function (snapshot) {
//     //   alert(snapshot.val());
//     // })
//     this.itemsRef.child("HiepNS/IOS").once("value")
//       .then(function (snapshot) {
//         debugger
//         alert(snapshot.val());
//       });
//   }

//   componentDidMount() {
//     this.fectchData();
//   }

//   fectchData() {
//     let item = [];
//     this.itemsRef.on('child_added', (data) => {
//       item.push({
//         id: data.key(),
//         value: data.val()
//       })

//       this.setState({
//         data : item
//       })
//     });
//   }

//   renderItemComponent = (data) =>(
//     <View style={ styles.item }>
//       <TouchableOpacity>
//                 <Text> { data.item.id } </Text>
//       </TouchableOpacity>
//     </View>
     
//   );
  

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* <TouchableOpacity onPress={() => this.saveSet()}>
//           <Text>Lưa dữ liệu firebase Set()</Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity onPress={() => this.savePush()}>
//           <Text>Lưa dữ liệu firebase Put()</Text>
//         </TouchableOpacity> */}

//         {/* <TouchableOpacity onPress={() => this.addData()}>
//           <Text>Lưa dữ liệu firebase AddData()</Text>
//         </TouchableOpacity> */}
        
//         <SafeAreaView>
//             <FlatList
//                 data={this.state.data}
//                 renderItem={item => this.renderItemComponent(item)}
//                 keyExtractor={item => item.id.toString()}
//             />  
//         </SafeAreaView>
//       </View>
//     );
//   }

// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'green',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   item: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
// */



// app todo
import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  AppRegistry,
  Alert
} from 'react-native';

var Firebase = require('firebase');

export default class App extends Component {
  constructor(props) {
    super(props);
    var root = new Firebase("https://demoreactnt-default-rtdb.firebaseio.com/");
    this.itemsRef = root.child('AppTodo');

    this.state = {
      todoSource : [],
      textTodo : ''
    }
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
        todoSource : item
      })
    });
    
    this.itemsRef.on('child_removed', (data) => {
      item = item.filter((x) => x.id != data.key());
      this.setState({
        todoSource : item
      })
    });

  }

  pushTextTodo() {
    if(this.state.textTodo != ''){
      this.itemsRef.push({
        todo: this.state.textTodo
      })
      this.setState({
        textTodo: ''
      })
      this.fectchData();
    }else{
      console.log('empty string text!');
    }
    
  }

  remove(property) {
    // Alert.alert(
    //   'Remove?',
    //   'Are you sure?',
    //   [
    //     {
    //       text: "OK",
    //       onPress: () => this.itemsRef.child(property.id).remove()
    //     },
    //     {
    //       text: "Cancel",
    //       onPress: () => console.log('Cancel')
    //     }
    //   ]
    // );
    this.itemsRef.child(property.id).remove()
  }

  renderItemComponent = (data) =>(
    <View>
      <TouchableOpacity
        onPress = {() => this.remove(data.item)}
      >
        <Text> { data.item.value.todo } </Text>
      </TouchableOpacity>
    </View> 
  );

  render() {
    return (
      <View style={styles.appContainer}>

          <View style={styles.titleView}>
            <Text style={styles.titleText}>App to do hipns</Text>
          </View>

          <View style={styles.inputContainer}>

            <TextInput style={styles.input}
              onChangeText = { (text) => this.setState({
                textTodo: text
              })}
              value  = {this.state.textTodo}
            >

            </TextInput>
            <TouchableOpacity style={styles.button}
              onPress = {() => this.pushTextTodo()}
            >
              <Text style={styles.btnTex}>ADD</Text>
            </TouchableOpacity>

          </View>
          <SafeAreaView>
              <FlatList
                  data={this.state.todoSource}
                  renderItem={item => this.renderItemComponent(item)}
                  keyExtractor={item => item.id.toString()}
              />
          </SafeAreaView>
          
      </View>
    );
  }

}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleView: {
    backgroundColor: "#48afbd",
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText: {
    color: 'while',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20
  },
  inputContainer: {
    marginTop: 5,
    padding: 22,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: "#48afbd",
    justifyContent: 'center',
    textAlign: 'center',
    color: '#ffffff',
    borderRadius: 4

  },
  btnTex: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6
  },

  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48afbd",
    borderRadius: 4,
    color: '#48afbd'
  }
});

AppRegistry.registerComponent('App', () => App);