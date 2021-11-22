// App.js

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AddUserScreen from './src/screens/AddUserScreen';
import UserScreen from './src/screens/UserScreen';
import UserDetailScreen from './src/screens/UserDetailScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    initialRouteName="UserScreen"
      screenOptions={{
          headerStyle: {
            backgroundColor: '#621FF7',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Adicionar Usuário' }}
      />
      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 

        options={{ title: 'Lista de Usuários' }}
      />
      <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'Detalhes do Usuário' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}