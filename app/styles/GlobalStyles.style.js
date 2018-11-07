import { iOSUIKit, material } from 'react-native-typography'

export default {
  defaultView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#EEE5E9'
  },
  defaultButton: {
    height: 50,
    backgroundColor: '#FF4264',
    borderColor: '#FF4264',
    borderRadius: 3,
    borderColor: 'transparent',
    width: '50%',
    alignSelf: 'center'
  },
  defaultInput: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  bodyFontAndroid:
    [
      material.subheading,
      {color: '#383D3B'}
    ],
  bodyFontIOS:
    [
      material.body,
      {color: '#383D3B'}
    ],
  titleFontAndroid:
    [
      material.display2,
      {color: '#383D3B'}
    ],
  titleFontIOS:
    [
      iOSUIKit.largeTitleEmphasized,
      {color: '#383D3B'}
    ],
  errorFontAndroid:
    [
      material.body2,
      {color: 'red'}
    ],
  errorFontIOS:
    [
      iOSUIKit.callout,
      {color: 'red'}
    ]
};
