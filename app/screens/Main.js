import React from 'react';
import { connect } from 'react-redux'
import { Platform, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'
import GlobalStyles from '../styles/GlobalStyles.style'
import MainStyles from '../styles/screens/Main.style'
import * as Animatable from 'react-native-animatable'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
    }
  }

  render() {
    return (
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={GlobalStyles.defaultView}>
        <View style={{alignItems: 'center'}}>
          <Text style={Platform.OS === 'ios' ? GlobalStyles.subtitleFontIOS : GlobalStyles.subtitleFontAndroid}>You haven't created any notes yet.</Text>
          <Button
            icon={
              <Icon
                name='plus'
                size={35}
                color='white'
              />
            }
            buttonStyle={MainStyles.circleButton}
            title=''
            containerStyle={{ marginTop: 20, marginBottom: 10 }}
          />
        </View>
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {
  return{
  }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
