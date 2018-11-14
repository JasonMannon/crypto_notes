import React, {Component} from 'react';
import { connect } from 'react-redux'
import {NavigationActions} from 'react-navigation';
import UserActions from '../reducers/user'
import {AsyncStorage, ScrollView, Text, View} from 'react-native';
import { DrawerActions } from 'react-navigation';

class DrawerScreen extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  _signOutAsync = async () => {
    console.log('here')
    await AsyncStorage.clear();
    this.props.signOutUser()
  };

  componentDidUpdate() {
    const { userLoggedOut } = this.props

    if (userLoggedOut) {
      this.props.navigation.navigate('SignIn')
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View>
            <View style={{
              padding: 10,
              borderWidth: 0.5,
              borderColor: '#d6d7da'
            }}>
              <Text onPress={this.navigateToScreen('Main')}>
                Home
              </Text>
            </View>
            <View style={{
              padding: 10,
              borderWidth: 0.5,
              borderColor: '#d6d7da'
            }}>
              <Text onPress={this.navigateToScreen('Main')}>
               About
              </Text>
            </View>
          </View>
        </ScrollView>
          <View>
            <View style={{
              padding: 10,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              justifyContent: 'space-between'
            }}>
              <Text onPress={() => this._signOutAsync()}>
                Sign Out
              </Text>
            </View>
          </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { userLoggedOut } = state.user

  return{
    userLoggedOut
  }
}

const mapDispatchToProps = (dispatch) => ({
  signOutUser: () => dispatch(UserActions.signOutUserRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerScreen);
