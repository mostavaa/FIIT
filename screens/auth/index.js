import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ThemeConsumer, Text, Button} from 'react-native-elements';

import landingBG from '../../assets/images/landing.png';

export default props => {
  return (
    <ThemeConsumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <Image source={landingBG} style={styles.landingBG} />
            <View style={{width: '70%'}}>
              <Text
                style={{
                  color: theme.colors.primary,
                  textAlign: 'center',
                  fontSize: 26,
                  fontFamily: 'Montserrat-Bold',
                  marginBottom: 50,
                }}>
                Upgrade Your Healthy Lifestyle
              </Text>
              <Button
                title="Create Account"
                onPress={() => {
                  props.navigation.navigate('SignUp');
                }}
              />
              <Button
                title="Sign In"
                buttonStyle={{
                  backgroundColor: '#FFFFFF00',
                  borderWidth: 2,
                  borderColor: theme.colors.secondary,
                  paddingVertical: 12,
                }}
                titleStyle={{color: theme.colors.secondary}}
                containerStyle={{marginBottom: 30}}
                onPress={() => {
                  props.navigation.navigate('Login');
                }}
              />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
              </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  landingBG: {
    position: 'absolute',
    top: '-25%',
  },
});
