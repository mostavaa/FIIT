import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {ThemeConsumer, Text, Icon, ListItem} from 'react-native-elements';

import bg from '../../../assets/images/risk-button.png';

import {ScrollView} from 'react-native-gesture-handler';

export default props => {
  const vitalScreens = [
    {
      name: 'Temperature',
      screen: 'Temperature',
      description: 'Track your body Temperature',
      icon: (
        <Icon
          type="font-awesome"
          name="thermometer"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
    {
      name: 'Weight',
      screen: 'Weight',
      description: 'Track your body Weight',
      icon: (
        <Icon
          type="material-community"
          name="weight-pound"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
    {
      name: 'Height',
      screen: 'Height',
      description: 'Track your body Height',
      icon: (
        <Icon
          type="entypo"
          name="ruler"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
    {
      name: 'BMI',
      screen: 'BMI',
      description: 'Track your body Body Mass Index',
      icon: (
        <Icon
          type="ionicon"
          name="ios-body"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
    {
      name: 'Pulse',
      screen: 'Pulse',
      description: 'Track your Heart Pulse',
      icon: (
        <Icon
          type="ionicon"
          name="ios-pulse"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
    {
      name: 'Blood Pressure',
      screen: 'Pressure',
      description: 'Track your Blood Pressure',
      icon: (
        <Icon
          type="material-community"
          name="blood-bag"
          size={42}
          color="#1EB5FC"
          containerStyle={{width: 50}}
        />
      ),
    },
  ];

  return (
    <ThemeConsumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{padding: 30}}>
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontSize: 26,
                  fontFamily: 'Montserrat-Bold',
                  marginTop: 30,
                }}>
                Health Check
              </Text>
              <Text>Keep track of all your conditions.</Text>
              <View style={{marginVertical: 20}}>
                <View style={styles.row}>
                  <View style={styles.col}>
                    <TouchableOpacity
                      style={[
                        styles.card,
                        {backgroundColor: theme.colors.error},
                      ]}
                      onPress={() => {
                        props.navigation.navigate('Asthma');
                      }}
                      activeOpacity={0.85}>
                      <Image source={bg} style={styles.btnBg} />
                      <Text style={styles.btnTitle}>Asthma{'\n'}Attack</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.col}>
                    <TouchableOpacity
                      style={[
                        styles.card,
                        {backgroundColor: theme.colors.secondary},
                      ]}
                      onPress={() => {
                        props.navigation.navigate('Stroke');
                      }}
                      activeOpacity={0.85}>
                      <Image source={bg} style={styles.btnBg} />
                      <Text style={styles.btnTitle}>Stroke</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.col}>
                    <TouchableOpacity
                      style={[
                        styles.card,
                        {backgroundColor: theme.colors.primary},
                      ]}
                      onPress={() => {
                        props.navigation.navigate('Cardiovascular');
                      }}
                      activeOpacity={0.85}>
                      <Image source={bg} style={styles.btnBg} />
                      <Text style={styles.btnTitle}>Cardiovascular</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{marginBottom: 20}}>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: 26,
                    fontFamily: 'Montserrat-Bold',
                    marginTop: 30,
                  }}>
                  Track Vitals
                </Text>
                <Text>Keep track of all your vitals.</Text>
              </View>

              {vitalScreens.map((vital, i) => (
                <ListItem
                  key={i}
                  containerStyle={{
                    paddingHorizontal: 0,
                    paddingBottom: 20,
                    borderBottomColor: '#EAEAEA',
                    borderBottomWidth: vitalScreens.length === i + 1 ? 0 : 1,
                  }}
                  onPress={() => {
                    props.navigation.navigate(vital.screen);
                  }}
                  title={vital.name}
                  titleStyle={{
                    color: theme.colors.secondary,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    marginLeft: 10,
                  }}
                  subtitle={vital.description}
                  subtitleStyle={{marginLeft: 10}}
                  leftElement={vital.icon}
                  chevron={{size: 30, color: theme.colors.error}}
                />
              ))}
            </ScrollView>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
  },
  col: {
    paddingHorizontal: 10,
    flexGrow: 1,
    marginTop: 20,
  },
  card: {
    minHeight: 150,
    paddingTop: 70,
    paddingLeft: 25,
    paddingBottom: 25,
    borderRadius: 10,
    paddingRight: 25,
  },
  btnBg: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  btnTitle: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
  },
});
