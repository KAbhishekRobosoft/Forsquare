import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import OtpScreen from '../screens/OtpScreen';
import ResetPassword from '../screens/ResetPassword';
import ParticularHotel from '../screens/ParticularHotel';
import ReviewScreen from '../screens/ReviewScreen';
import NearYou from '../screens/NearYou';
import DrawerNavigation from './DrawerNavigation';
import SearchScreen from '../screens/SearchScreen';
import ParameterWithHeaderList from '../components/ParameterWithHeaderList';
import FilterScreen from '../screens/FilterScreen';
import EmailEntryScreen from '../screens/EmailEntryScreen';
import AboutUs from '../screens/AboutUs';
import IndividualImageDisplay from '../screens/IndividualImageDisplay';
import ImageDisplay from '../screens/ImageDisplay';

const Stack = createStackNavigator();

function NonAccountNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="login"
        component={Login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="register"
        component={Register}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="emailEntry"
        component={EmailEntryScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="otp"
        component={OtpScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="resetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="drawer"
        component={DrawerNavigation}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="near"
        component={NearYou}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="particular"
        component={ParticularHotel}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="review"
        component={ReviewScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="aboutUs"
        component={AboutUs}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="search"
        component={SearchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="imgDisplay"
        component={ImageDisplay}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="IndividualImg"
        component={IndividualImageDisplay}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="parameterHeader"
        component={ParameterWithHeaderList}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="filter"
        component={FilterScreen}
      />
    </Stack.Navigator>
  );
}

export default NonAccountNavigation;
