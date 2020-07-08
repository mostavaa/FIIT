import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ThemeConsumer, Text, Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppleButton } from '@invertase/react-native-apple-authentication'

import { AuthContext } from '../../components/auth/AuthContext';

export default props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signUpWithAppleId } = React.useContext(AuthContext);

  const tryLogin = async () => {
    // if (validateForm()) {
    signIn({ email, password });
    // }
  };

  validateForm = () => {
    const emailRE = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    let status = true,
      invalid = 'Invalid',
      required = 'Required field.';
    //email
    if (email == '') {
      status = false;
      alert(required);
    } else if (!emailRE.test(email.trim().toLowerCase())) {
      status = false;
      alert(invalid);
    }

    //password
    if (password == '') {
      status = false;
      alert(required);
    }

    return status;
  };

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <Text
              style={{
                color: theme.colors.secondary,
                textAlign: 'center',
                fontSize: 26,
                fontFamily: 'Montserrat-Bold',
                marginBottom: 40,
              }}>
              SIGN IN
            </Text>
            <View style={{ width: '85%' }}>
              <Input
                placeholder="Email"
                leftIcon={
                  <Icon name="user" size={20} color={theme.colors.secondary} />
                }
                value={email}
                onChangeText={value => {
                  setEmail(value);
                }}
              />
              <Input
                placeholder="Password"
                secureTextEntry={true}
                leftIcon={
                  <Icon name="lock" size={20} color={theme.colors.secondary} />
                }
                value={password}
                onChangeText={value => {
                  setPassword(value);
                }}
              />
              <Button
                title="Login"
                containerStyle={{ marginTop: 40 }}
                onPress={tryLogin}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text>Forgot your password? </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Click here
                </Text>
              </TouchableOpacity>
              {Platform.OS === "ios" ? (


                <TouchableOpacity>

                  <AppleButton
                    style={{
                      width: 200,
                      height: 60,
                      margin: 10,
                    }}
                    cornerRadius={5}
                    buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    onPress={() => signUpWithAppleId()}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </SafeAreaView>
        </>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
});
