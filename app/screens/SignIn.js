import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import UserActions from '../reducers/user'
import { NavigationActions } from 'react-navigation'
import { Platform, Text, View, TextInput, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements'
import GlobalStyles from '../styles/GlobalStyles.style'
import * as Animatable from 'react-native-animatable';

class SignIn extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
    resetError: PropTypes.func,
    signInUserRequest: PropTypes.func,
    loading: PropTypes.bool,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state ={
      email: '',
      password: ''
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
    const { email, password } = this.state

    this.props.signInUserRequest(email, password)
  }

  _signInAsync = async () => {
    const { userData } = this.props
    console.log(userData, '1')

    await AsyncStorage.setItem('user', JSON.stringify(userData))

    this.props.navigation.navigate('Main')
  }

  render() {
    const { email, password } = this.state
    const { errorMessage, loading, userLoggedIn } = this.props

    if (userLoggedIn) {
      this._signInAsync()
    }

    return (
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={GlobalStyles.defaultView}>
        <View style={{justifyContent: 'center'}}>
          <View style={{alignItems: 'center', marginBottom: 3}}>
            <Text style={Platform.OS === 'ios' ? GlobalStyles.titleFontIOS : GlobalStyles.titleFontAndroid}>Sign In</Text>
            <Text style={Platform.OS === 'ios' ? GlobalStyles.errorFontIOS : GlobalStyles.errorFontAndroid}>{errorMessage}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Input
              placeholder='Email'
              inputContainerStyle={GlobalStyles.defaultInput}
              onChangeText={(email) => this.handleChangeText('email', email)}
              value={email}
            />
            <Input
              textContentType='password'
              secureTextEntry={true}
              inputContainerStyle={GlobalStyles.defaultInput}
              placeholder='Password'
              value={password}
              onChangeText={(password) => this.handleChangeText('password', password)}
            />
          </View>
          <View style={{marginBottom: 5}}>
            <Button
              onPress={() => this.handleOnSubmit()}
              buttonStyle={GlobalStyles.defaultButton}
              loading={loading}
              disable={loading}
              title="Sign In"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={Platform.OS === 'ios' ? GlobalStyles.bodyFontIOS : GlobalStyles.bodyFontAndroid} onPress={() => this.props.navigation.navigate('SignUp')}>New here? Sign up now!</Text>
          </View>
        </View>
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  const { errorMessage, loading, userData, userLoggedIn} = state.user

  return{
    errorMessage,
    loading,
    userData,
    userLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => ({
  signInUserRequest: (email, password) => dispatch(UserActions.signInUserRequest(email, password)),
  resetError: () => dispatch(UserActions.resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
