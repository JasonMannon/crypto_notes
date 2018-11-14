import React from 'react';
import { connect } from 'react-redux'
import Actions from '../reducers/note'
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

    this.state = {
      note: ''
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ addNote: this.handleAddNote })
  }

  handleChangeText = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleAddNote = () => {
    const { note } = this.state

    this.props.addNote(note)
  }

  render() {
    const { note } = this.state

    return(
      <Animatable.View ref={ref => this.viewRef = ref} animation='fadeIn' style={NewNoteStyles.view}>
        <View style={{alignItems: 'center'}}>
          <AutoGrowingTextInput
            underlineColorAndroid="transparent"
            placeholder="Add Note"
            style={{width: '90%', fontSize: 25}}
            vaule={note}
            onChangeText={(note) => this.handleChangeText('note', note)}
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

const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(Actions.createNoteRequest(note)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NoteModal);
