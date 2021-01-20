import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Animated,
  ActivityIndicator,
  Keyboard, ScrollView, TouchableOpacity, SafeAreaView,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
// import {requestCode} from '../../services/auth';
// import Toast from 'react-native-simple-toast';
import logo from '../../../assets/images/logo.png';
import {signIn, useAuthDispatch, useAuthState} from '../../../context/AuthContext';

const SignInScreen = ({navigation}) => {

  const authDispatch = useAuthDispatch();
  const authState = useAuthState();

  const [email, setEmail] = useState('rexfng@gmail.com');
  // const [token, setToken] = useState('889761');
  // const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const keyboardHeight = useRef(new Animated.Value(160)).current;
  const imageTransform = useRef(new Animated.Value(1)).current;
  const contentTransform = useRef(new Animated.Value(0)).current;

  // console.log("Sign in screen ===> ", flag, ENV_MULTI_TENANCY, config)

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (event) => {
    console.log('event ==> ', event);
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        // toValue: event.endCoordinates.height,
        useNativeDriver: true,
      }),
      Animated.timing(imageTransform, {
        duration: event.duration,
        toValue: 0.6,
        useNativeDriver: true,
      }),
      Animated.timing(contentTransform, {
        duration: event.duration,
        toValue: -40,
        useNativeDriver: true,
      }),
    ]).start();

  };

  const _keyboardDidHide = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 160,
        useNativeDriver: true,
      }),
      Animated.timing(imageTransform, {
        duration: event.duration,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(contentTransform, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();

  };

  const onRequestCode = () => {
    /*if (!email) {
        Alert.alert('Please enter your email.');
        return;
    } else {
        setLoading(true);
        requestCode({email}).then((res) => {
            setLoading(false);
            // setEmail('');
            Toast.showWithGravity('You have received the Code. Please check your email.', Toast.LONG, Toast.BOTTOM, [
                'RCTModalHostViewController',
            ]);
        }).catch(err => {
            console.log(err);
            Toast.showWithGravity('Request Code failed. Please try again.', Toast.LONG, Toast.BOTTOM, [
                'RCTModalHostViewController',
            ]);
            setLoading(false);
            // setEmail('');
        });
    }*/
  };

  /*if (loading) {
      return <LoadingSpinner/>
  }*/

  return (
    <SafeAreaView style={styles.container}>
      {/*{flag && <View style={styles.backContainer}>
                <Button
                    type="clear"
                    icon={
                        <Icon name='arrow-left' type="material-community"/>
                    }
                    buttonStyle={{borderRadius: 100,}}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{fontWeight: 'bold', fontSize: 16,}}>Back</Text>
            </View>}*/}
      <Animated.View
        // style={[styles.header, {transform: [{translateY: keyboardHeight}]}]}
        style={[styles.header]}
        behavior="padding"
      >
        <Animated.Image
          source={logo}
          style={{width: 160, height: 150, transform: [{scale: imageTransform}]}}/>
        <Animated.View style={{...styles.inputContainer, transform: [{translateY: contentTransform}]}}>
          <Input
            label="Email"
            placeholder="Enter Your Email"
            leftIcon={{name: 'mail-outline'}}
            value={email}
            onChangeText={
              (text) => {
                setEmail(text.toLowerCase());
              }
            }
          />
          <Input
            label="Code"
            placeholder="Enter Your Code"
            leftIcon={{name: 'lock-outline'}}
            value={token}
            onChangeText={
              (text) => {
                setToken(text);
              }
            }
          />
          <View style={styles.btnBackground}>
            <Button
              color="#000"
              buttonStyle={styles.loginBtn}
              title="Login"
              onPress={() => signIn(authDispatch, {email: email.trim(), token: token.trim()})}
              loading={authState.isLoading}
            />
          </View>
          <View style={styles.requestBackground}>
            <TouchableOpacity onPress={() => onRequestCode()}>
              <Text style={styles.requestLink}>Retrieve code via email</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // backgroundColor: 'red'
  },
  header: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 0,
    width: '100%',
    // backgroundColor: 'blue'
  },
  inputContainer: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '500',
    paddingBottom: 20,
  },
  input: {
    borderWidth: 1,
    width: '100%',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,

  },
  loginBtn: {
    width: '100%',
    backgroundColor: 'blue',
  },
  btnBackground: {
    width: '100%',
    height: 40,
    borderRadius: 4,
  },
  requestBackground: {
    paddingVertical: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  requestLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    padding: 5,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
});

export default SignInScreen;
