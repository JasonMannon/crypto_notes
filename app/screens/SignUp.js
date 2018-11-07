import React from 'react';
import { connect } from 'react-redux'
import UserActions from '../reducers/user'
import PropTypes from 'prop-types';
import { Platform, Text, View, TextInput, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements'
import GlobalStyles from '../styles/GlobalStyles.style'
import * as Animatable from 'react-native-animatable';

class SignUp extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    passwordConfirmation: PropTypes.string,
    resetError: PropTypes.func,
    createUserRequest: PropTypes.func,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state ={
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  componentWillUnmount() {
    this.props.resetError()
  }

  handleChangeText = (key, value) => {
    this.setState({
      [key]: value
    })
  }

  handleOnSubmit = () => {
    const { email, username, password, passwordConfirmation } = this.state

    this.props.createUserRequest(email, username, password, passwordConfirmation)
  }

  _signInAsync = async () => {
    const { userData } = this.props

    await AsyncStorage.setItem('user', JSON.stringify(userData))

    this.props.navigation.navigate('Main')
  }

  render() {
    const { email, username, password, passwordConfirmation } = this.state
    const { errorMessage, userLoggedIn } = this.props

    if (userLoggedIn) {
      this._signInAsync()
    }

    return (
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={GlobalStyles.defaultView}>
        <View style={{alignItems: 'center'}}>
          <Text style={Platform.OS === 'ios' ? GlobalStyles.titleFontIOS : GlobalStyles.titleFontAndroid}>Sign Up</Text>
          <Text style={Platform.OS === 'ios' ? GlobalStyles.errorFontIOS : GlobalStyles.errorFontAndroid}>{errorMessage}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Input
            inputContainerStyle={GlobalStyles.defaultInput}
            placeholder='Email'
            onChangeText={(email) => this.handleChangeText('email', email)}
            value={email}
          />
          <Input
            inputContainerStyle={GlobalStyles.defaultInput}
            placeholder='Username'
            onChangeText={(username) => this.handleChangeText('username', username)}
            value={username}
          />
          <Input
            inputContainerStyle={GlobalStyles.defaultInput}
            textContentType='password'
            secureTextEntry={true}
            placeholder='Password'
            value={password}
            onChangeText={(password) => this.handleChangeText('password', password)}
          />
          <Input
            inputContainerStyle={GlobalStyles.defaultInput}
            textContentType='password'
            secureTextEntry={true}
            placeholder='Password Confirmation'
            value={passwordConfirmation}
            onChangeText={(passwordConfirmation) => this.handleChangeText('passwordConfirmation', passwordConfirmation)}
          />
        </View>
        <View style={{marginBottom: 5}}>
          <Button
            onPress={() => this.handleOnSubmit()}
            buttonStyle={GlobalStyles.defaultButton}
            title="Sign Up"
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={Platform.OS === 'ios' ? GlobalStyles.bodyFontIOS : GlobalStyles.bodyFontAndroid} onPress={() => this.props.navigation.navigate('SignIn')}>Already have an account? Sign In!</Text>
        </View>
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  const { errorMessage, userData, userLoggedIn} = state.user

  return{
    errorMessage,
    userData,
    userLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  createUserRequest: (email, username, password, passwordConfirmation) => dispatch(UserActions.createUserRequest(email, username, password, passwordConfirmation)),
  resetError: () => dispatch(UserActions.resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
