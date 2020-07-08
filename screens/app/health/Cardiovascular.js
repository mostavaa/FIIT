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
import {RiskPrediction} from '../../../util/RiskCalculator';

import header from '../../../assets/images/risk-header.png';
import AsyncStorage from '@react-native-community/async-storage';

getPatientData = async () => {
  try {
    const value = await AsyncStorage.getItem('@LoginData');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const [hdl, setHdl] = useState(1.0);
  const [cholesterol, setCholesterol] = useState(4.0);
  const [bloodPressure, setBloodPressure] = useState(120);
  const [bloodPressureTreated, setBloodPressureTreated] = useState(true);
  const [smoker, setSmoker] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [gender, setGender] = useState('m');
  const [age, setAge] = useState(0);

  useEffect(() => {
    getPatientData().then(data => {
      // setGender(data.gender.toLowerCase());
      // let dobArray = data.dateofbirth.split('/');
      new Date(Date.now()).getFullYear() - new Date(data.DOB).getFullYear(),
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
                  Estimation of 10-year Cardiovascular Disease
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
                  fill={percentage}
                  duration={500}
                  tintColor="#CAF369"
                  lineCap="round"
                  rotation={-90}
                  lineCap="round"
                  useNativeDriver={false}
                  backgroundColor="#FFF">
                  {fill => (
                    <Text style={styles.progressInsideText}>
                      {percentage} %
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
                <View style={styles.row}>
                  <Text>HDL-C ({hdl.toFixed(1)})</Text>
                  <Slider
                    style={{width: 150}}
                    minimumValue={0.5}
                    maximumValue={2}
                    value={hdl}
                    step={0.1}
                    onValueChange={value => {
                      setHdl(value);
                    }}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.primary}
                  />
                </View>
                <View style={styles.row}>
                  <Text>Cholesterol ({cholesterol.toFixed(1)})</Text>
                  <Slider
                    style={{width: 150}}
                    minimumValue={0}
                    maximumValue={10}
                    value={cholesterol}
                    step={0.1}
                    onValueChange={value => {
                      setCholesterol(value);
                    }}
                    minimumTrackTintColor={theme.colors.secondary}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.secondary}
                  />
                </View>
                <View style={styles.row}>
                  <Text>Blood Pressure ({bloodPressure.toFixed(1)})</Text>
                  <Slider
                    style={{width: 150}}
                    minimumValue={50}
                    maximumValue={200}
                    value={bloodPressure}
                    step={10}
                    onValueChange={value => {
                      setBloodPressure(value);
                    }}
                    minimumTrackTintColor={theme.colors.error}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.error}
                  />
                </View>
                <CheckBox
                  title="Blood Pressure Treated"
                  checked={bloodPressureTreated}
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
                    setBloodPressureTreated(
                      bloodPressureTreated ? false : true,
                    );
                  }}
                />

                <CheckBox
                  title="Smoker"
                  checked={smoker}
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
                    setSmoker(smoker ? false : true);
                  }}
                />

                <CheckBox
                  title="Have Diabetes"
                  checked={diabetes}
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
                    setDiabetes(diabetes ? false : true);
                  }}
                />
                <Button
                  title="Calculate Risk"
                  containerStyle={{marginTop: 20}}
                  buttonStyle={{backgroundColor: theme.colors.primary}}
                  onPress={() => {
                    setPercentage(
                      RiskPrediction.FRS({
                        gender,
                        age,
                        hdl,
                        cholesterol,
                        bloodPressure,
                        bloodPressureTreated,
                        smoker,
                        diabetes,
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
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
