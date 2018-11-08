import React from 'react';
import { connect } from 'react-redux'
import { Platform, Text, View } from 'react-native';
import GlobalStyles from '../styles/GlobalStyles.style'
import MainStyles from '../styles/screens/Main.style'
import * as Animatable from 'react-native-animatable';

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
    }
  }

  render() {
    return (
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={MainStyles.View}>
        <View style={{alignItems: 'center'}}>
          <Text style={Platform.OS === 'ios' ? GlobalStyles.subtitleFontIOS : GlobalStyles.subtitleFontAndroid}>You haven't created any notes yet.</Text>
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
