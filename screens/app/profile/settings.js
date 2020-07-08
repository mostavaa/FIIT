import * as React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {ThemeConsumer, Text, ListItem} from 'react-native-elements';
import {AuthContext} from '../../../components/auth/AuthContext';

export default ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  return (
    <ThemeConsumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate('PROVIDERS')}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                }}>
                My Providers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={() => signOut()}>
              <Text
                style={{
                  color: theme.colors.primary,
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                }}>
                Sign out
              </Text>
            </TouchableOpacity>
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
  },
  row: {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
});
