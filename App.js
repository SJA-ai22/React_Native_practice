import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/LoginPage';
import HomePage from './src/pages/Home';
import ReservationPage from './src/pages/Seat_Reserve';
import Room1 from './src/pages/DetailPages/room1Page';
import MySeat from './src/pages/MySeat';
import LibraryCard from './src/pages/LibraryCard';
import GroupRoom from './src/pages/GroupRoom';
import { SeatProvider } from './src/pages/DetailPages/SeatControl';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <SeatProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name='ReservePage' component={ReservationPage}/>
          <Stack.Screen name='GroupRoom' component={GroupRoom}/>
          <Stack.Screen name='MySeat' component={MySeat}/>
          <Stack.Screen name='LibraryCard' component={LibraryCard}/>
          <Stack.Screen name="room1" component={Room1} />
        </Stack.Navigator>
      </SeatProvider>
    </NavigationContainer>
  );
};

export default App;
