import React, {useEffect, useState, Profiler} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ThemeConsumer, Text, ListItem, Avatar} from 'react-native-elements';

import avatar from '../../../assets/images/default-avatar.png';
import AsyncStorage from '@react-native-community/async-storage';

const getPatientData = async () => {
  try {
    const value = await AsyncStorage.getItem('@LoginData');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

Profile = props => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPatientData().then(resp => {
      setData(resp.payload);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#1EB5FC" />
    </View>
  ) : (
    <ThemeConsumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <ScrollView>
              <View style={{alignItems: 'center', padding: 30}}>
                <Avatar
                  source={avatar}
                  rounded
                  containerStyle={{
                    borderWidth: 4,
                    borderColor: theme.colors.success,
                    elevation: 11,
                    width: 95,
                    height: 95,
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}
                />
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 22,
                    marginTop: 10,
                  }}>
                  Welcome, {data.firstname}.
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  padding: 30,
                }}>
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontSize: 17,
                      fontFamily: 'Montserrat-Bold',
                    }}>
                    Personal Information
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                      marginTop: 15,
                    }}>
                    {data.firstname} {data.lastname}
                  </Text>
                  <Text
                    style={{
                      color: '#3D3D3D',
                      fontSize: 14,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    {new Date(data.DOB).toISOString().substring(0, 10)}
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <View style={styles.row}>
                    <Text>Email</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.email}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>Username</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.username}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>Phone</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.phone}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>Address</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.street}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>State</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.state}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>City</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.city}
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text>Postal Code</Text>
                    <Text style={{fontFamily: 'Montserrat-Bold'}}>
                      {data.postalcode}
                    </Text>
                  </View>
                </View>

                {/* <View style={{alignItems: 'center', marginTop: 30}}>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: 17,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Vital Signs
                </Text>
              </View> */}
              </View>
            </ScrollView>
          </SafeAreaView>
        </>
      )}
    </ThemeConsumer>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1EB5FC',
  },
  row: {
    borderBottomColor: '#EAEAEA',
    borderBottomWidth: 1,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
