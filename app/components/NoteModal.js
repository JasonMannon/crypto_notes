import React from 'react';
import { connect } from 'react-redux'
import { Platform, Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo'
import GlobalStyles from '../styles/GlobalStyles.style'
import MainStyles from '../styles/screens/Main.style'
import NewNoteStyles from '../styles/screens/NewNote.style'
import * as Animatable from 'react-native-animatable'
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';

class NoteModal extends React.Component {
  constructor(props) {
    super(props)
    console.log('here')
  }

  render() {
    return(
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={NewNoteStyles.view}>
        <View style={{alignItems: 'center'}}>
          <AutoGrowingTextInput
            underlineColorAndroid="transparent"
            placeholder="Add Nssssote"
            style={{width: '90%', fontSize: 25}}
            enableScrollToCaret/>
        </View>
      </Animatable.View>
    )
  }
}

const mapStateToProps = (state) => {

  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);
