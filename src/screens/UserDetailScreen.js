// screens/UserDetailScreen.js

import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDb';

class UserDetailScreen extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      mobile: '',
      empresa: '',
      profissao: '',
      cargo: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          name: user.name,
          email: user.email,
          mobile: user.mobile,
          profissao: user.profissao,
          empresa: user.empresa,
          cargo: user.cargo,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  updateUser() {
    
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('users').doc(this.state.key);
    updateDBRef.set({
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      profissao: this.state.profissao,
      empresa: this.state.empresa,
      cargo: this.state.cargo,
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        email: '',
        mobile: '',
        empresa: '',
        cargo: '',
        profissao: '',
        isLoading: false,
      });
      this.props.navigation.navigate('UserScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

  deleteUser() {
    const dbRef = firebase.firestore().collection('users').doc(this.props.route.params.userkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('UserScreen');
      })
  }

  /*openTwoButtonAlert=()=>{
    
    return Alert.alert(
      'Excluir Usuário',
      'Você tem certeza?',
      [
        {text: 'Sim', onPress: () => this.deleteUser()},
        {text: 'Não', onPress: () => console.log('Nenhum item foi excluido'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  */

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={this.state.name}
              onChangeText={(val) => this.inputValueUpdate(val, 'name')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={this.state.email}
              onChangeText={(val) => this.inputValueUpdate(val, 'email')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Profissão'}
              value={this.state.profissao}
              onChangeText={(val) => this.inputValueUpdate(val, 'profissao')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={"Empresa"}
              value={this.state.empresa}
              onChangeText={(val) => this.inputValueUpdate(val, 'empresa')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Cargo'}
              value={this.state.cargo}
              onChangeText={(val) => this.inputValueUpdate(val, 'cargo')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Atualizar'
            onPress={() => this.updateUser()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Excluir'
            onPress={() => this.deleteUser()}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default UserDetailScreen;