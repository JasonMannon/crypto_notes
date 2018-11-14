import React from 'react';
import { connect } from 'react-redux'
import { ActivityIndicator, AsyncStorage, StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'

class AuthLoading extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    let userToken = await AsyncStorage.getItem('user');
    console.log(userToken, '2')
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
       <ActivityIndicator />
      </View>
    );
  }

}

const mapStateToProps = (state) => {

  return {
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
