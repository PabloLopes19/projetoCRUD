// screens/AddUserScreen.js

import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../../database/firebaseDb';

class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('users');
    this.state = {
      name: '',
      email: '',
      mobile: '',
      profissao: '',
      empresa: '',
      cargo: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() {
    if(this.state.name === ''){
     alert('Preencha pelo menos seu nome!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        name: this.state.name,
        email: this.state.email,
        mobile: this.state.mobile,
        profissao: this.state.profissao,
        empresa: this.state.empresa,
        cargo: this.state.cargo,
      }).then((res) => {
        this.setState({
          name: '',
          email: '',
          mobile: '',
          profissao: '',
          empresa: '',
          cargo: '',
          isLoading: false,
        });
        this.props.navigation.navigate('UserScreen')
      })
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
    }
  }

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
              placeholder={'Empresa'}
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
            title='Adicionar Usuário'
            onPress={() => this.storeUser()} 
            color="#19AC52"
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

export default AddUserScreen;