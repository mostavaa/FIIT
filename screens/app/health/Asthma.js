import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  ThemeConsumer,
  Text,
  Button,
  Slider,
  CheckBox,
} from 'react-native-elements';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Dropdown} from 'react-native-material-dropdown';

import {RiskPrediction} from '../../../util/RiskCalculator';

import header from '../../../assets/images/risk-header.png';
import AsyncStorage from '@react-native-community/async-storage';

getPatientData = async () => {
  try {
    const value = await AsyncStorage.getItem('@LoginData');
    if (value !== null) {
      return JSON.parse(value).payload;
    }
  } catch (e) {
    console.log(e);
  }
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  const [gender, setGender] = useState('m');
  const [age, setAge] = useState(0);
  const [race, setRace] = useState('');
  const [bmi, setBmi] = useState(0);
  const [oralContraceptives, setOralContraceptives] = useState(false);

  const raceDropdown = React.createRef();

  const raceList = [
    {
      value: 'Non-Hispanic White',
    },
    {
      value: 'Hispanic',
    },
    {
      value: 'Black',
    },
    {
      value: 'Asian',
    },
    {
      value: 'Pacific Islander',
    },
    {
      value: 'American Indian',
    },
    {
      value: 'American native',
    },
    {
      value: 'Other',
    },
  ];

  useEffect(() => {
    getPatientData().then(data => {
      // setGender(data.gender.toLowerCase());
      // let dobArray = data.dateofbirth.split('/');
      setAge(
        new Date(Date.now()).getFullYear() - new Date(data.DOB).getFullYear(),
      );
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
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 0,
                paddingHorizontal: 0,
              }}>
              <View style={{paddingHorizontal: 30, marginTop: 30}}>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: 26,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Asthma Attack Chances more than normal
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 200,
                  marginTop: 30,
                }}>
                <Image
                  source={header}
                  style={{position: 'absolute', width: '100%', height: '100%'}}
                />
                <AnimatedCircularProgress
                  size={130}
                  width={7}
                  fill={percentage / 7.04}
                  duration={500}
                  tintColor="#CAF369"
                  lineCap="round"
                  rotation={-90}
                  lineCap="round"
                  useNativeDriver={false}
                  backgroundColor="#FFF">
                  {fill => (
                    <Text style={styles.progressInsideText}>
                      {percentage / 100} times
                    </Text>
                  )}
                </AnimatedCircularProgress>
              </View>
              <View style={{paddingHorizontal: 30, marginTop: 30}}>
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Risk Factors
                </Text>
              </View>
              <View style={{paddingHorizontal: 30, marginTop: 20}}>
                <Dropdown
                  ref={raceDropdown}
                  onChangeText={(value, index, data) => {
                    setRace(value);
                  }}
                  overlayStyle={{backgroundColor: '#00000055'}}
                  label="Race"
                  data={raceList}
                />

                <View style={[styles.row, {marginTop: 15}]}>
                  <Text>BMI ({bmi.toFixed(1)})</Text>
                  <Slider
                    style={{width: 150}}
                    minimumValue={10}
                    maximumValue={100}
                    value={bmi}
                    step={0.1}
                    onValueChange={value => {
                      setBmi(value);
                    }}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.primary}
                  />
                </View>

                {gender !== 'male' && (
                  <CheckBox
                    title="Oral contraceptives"
                    checked={oralContraceptives}
                    containerStyle={{
                      flex: 1,
                      marginLeft: 0,
                      justifyContent: 'space-between',
                      backgroundColor: '#FFF',
                      borderWidth: 0,
                      paddingHorizontal: 0,
                    }}
                    textStyle={{
                      marginLeft: 10,
                      fontFamily: 'Montserrat-Regular',
                      fontWeight: 'normal',
                    }}
                    onPress={() => {
                      setOralContraceptives(oralContraceptives ? false : true);
                    }}
                  />
                )}

                <Button
                  title="Calculate Risk"
                  containerStyle={{marginTop: 20}}
                  buttonStyle={{backgroundColor: theme.colors.primary}}
                  onPress={() => {
                    setPercentage(
                      RiskPrediction.asthmaRS({
                        gender,
                        age,
                        race,
                        BMI: bmi,
                        oralContraceptives,
                      }).percentage,
                    );
                  }}
                />
              </View>
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
  progressInsideText: {
    color: '#FFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
