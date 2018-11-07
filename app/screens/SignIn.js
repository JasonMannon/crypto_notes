import React from 'react';
import { connect } from 'react-redux'
import UserActions from '../reducers/user'
import { NavigationActions } from 'react-navigation'
import { Platform, Text, View, TextInput, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements'
import GlobalStyles from '../styles/GlobalStyles.style'

class SignIn extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      email: '',
      password: ''
    }
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

    await AsyncStorage.setItem('user', JSON.stringify(userData))

    this.props.navigation.navigate('Main')
  }

  render() {
    const { email, password } = this.state
    const { errorMessage, userLoggedIn } = this.props

    if (userLoggedIn) {
      this._signInAsync()
    }

    return (
      <View style={GlobalStyles.defaultView}>
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
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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
              title="Sign In"
              color="#841584"
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={Platform.OS === 'ios' ? GlobalStyles.bodyFontIOS : GlobalStyles.bodyFontAndroid} onPress={() => this.props.navigation.navigate('SignUp')}>New here? Sign up now!</Text>
          </View>
        </View>
      </View>
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
  signInUserRequest: (email, password) => dispatch(UserActions.signInUserRequest(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
