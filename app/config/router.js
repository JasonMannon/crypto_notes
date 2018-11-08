import React from 'react'
import { Text, Image, Button, TouchableOpacity } from 'react-native'
import { NavigationActions, createMaterialTopTabNavigator, DrawerActions, createDrawerNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Main from '../screens/Main'
import AuthLoading from '../screens/AuthLoading'
import Icon from 'react-native-vector-icons/FontAwesome';
import DrawerScreen from '../screens/DrawerScreen'

const UnAuthenticatedTabs = createSwitchNavigator({
  SignIn: { screen: SignIn },
  SignUp: { screen: SignUp }
})

const Tabs = createMaterialTopTabNavigator({
    Main: Main,
    Alternate: Main
},{
    tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: '#fff',
        },
        indicatorStyle: {
            backgroundColor: '#000',
        },
    }
});

const DrawerNavigator = createDrawerNavigator({
    Main:{
        screen: Main
    }
},{
    initialRouteName: 'Main',
    contentComponent: DrawerScreen,
    drawerWidth: 300
});

const AuthenticatedTabs = createStackNavigator({
    DrawerNavigator:{
        screen: DrawerNavigator
    }
  },{
    navigationOptions: ({ navigation }) => ({
        title: 'React Boilerplate',  // Title to appear in status bar
        headerLeft:
        <TouchableOpacity  style={{marginLeft: 5}} onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer())} }>
          <Icon name="bars" color='white' size={35} navigation={navigation} />
        </TouchableOpacity>,
        headerStyle: {
            backgroundColor: '#FF4264',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    })
});

export const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Auth: UnAuthenticatedTabs,
    App: AuthenticatedTabs
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
