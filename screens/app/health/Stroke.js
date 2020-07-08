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
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

export default () => {
  const [isLoading, setIsLoading] = useState(true);
  const [percentage, setPercentage] = useState('<00%');

  const [gender, setGender] = useState('m');
  const [age, setAge] = useState(0);
  const [education, setEducation] = useState('');
  const [renalDisease, setRenalDisease] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [congestiveHeartFailure, setCongestiveHeartFailure] = useState(false);
  const [peripheralArterialDisease, setPeripheralArterialDisease] = useState(
    false,
  );
  const [highBloodPressure, setHighBloodPressure] = useState(false);
  const [ischemicHeartDisease, setIschemicHeartDisease] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [formerSmoker, setFormerSmoker] = useState(false);
  const [alcoholicDrinks, setAlcoholicDrinks] = useState(0);
  const [formerDrinker, setFormerDrinker] = useState(false);
  const [physicalActivity, setPhysicalActivity] = useState(0);
  const [indicatorsOfAnger, setIndicatorsOfAnger] = useState(false);
  const [depression, setDepression] = useState(false);
  const [anxiety, setAnxiety] = useState(false);

  const educationDropdown = React.createRef();

  const educationList = [
    {
      value: 'secondary',
    },
    {
      value: 'secondary diploma',
    },
    {
      value: 'postsecondary diploma',
    },
  ];

  useEffect(() => {
    getPatientData().then(data => {
      // setGender(data.gender.toLowerCase());
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
                  Stroke Rick Predictor
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
                  fill={percentage.substring(1, percentage.length - 1)}
                  duration={500}
                  tintColor="#CAF369"
                  lineCap="round"
                  rotation={-90}
                  lineCap="round"
                  useNativeDriver={false}
                  backgroundColor="#FFF">
                  {fill => (
                    <Text style={styles.progressInsideText}>{percentage}</Text>
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
                  ref={educationDropdown}
                  onChangeText={(value, index, data) => {
                    setEducation(value);
                  }}
                  overlayStyle={{backgroundColor: '#00000055'}}
                  label="Education"
                  data={educationList}
                />

                <CheckBox
                  title="Renal Disease"
                  checked={renalDisease}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setRenalDisease(renalDisease ? false : true);
                  }}
                />

                <CheckBox
                  title="Diabetes"
                  checked={diabetes}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setDiabetes(diabetes ? false : true);
                  }}
                />

                <CheckBox
                  title="Congestive Heart Failure"
                  checked={congestiveHeartFailure}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setCongestiveHeartFailure(
                      congestiveHeartFailure ? false : true,
                    );
                  }}
                />

                <CheckBox
                  title="Peripheral Arterial Disease"
                  checked={peripheralArterialDisease}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setPeripheralArterialDisease(
                      peripheralArterialDisease ? false : true,
                    );
                  }}
                />

                <CheckBox
                  title="High Blood Pressure"
                  checked={highBloodPressure}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setHighBloodPressure(highBloodPressure ? false : true);
                  }}
                />

                <CheckBox
                  title="Ischemic Heart Disease"
                  checked={ischemicHeartDisease}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setIschemicHeartDisease(
                      ischemicHeartDisease ? false : true,
                    );
                  }}
                />

                <CheckBox
                  title="Smoking"
                  checked={smoking}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setSmoking(smoking ? false : true);
                  }}
                />

                <CheckBox
                  title="Former Smoker"
                  checked={formerSmoker}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setFormerSmoker(formerSmoker ? false : true);
                  }}
                />

                <View style={[styles.row, {marginTop: 15}]}>
                  <View>
                    <Text>Alcoholic Drinks ({alcoholicDrinks.toFixed(1)})</Text>
                    <Text>(Per Week)</Text>
                  </View>
                  <Slider
                    style={{width: 150}}
                    minimumValue={0}
                    maximumValue={30}
                    value={alcoholicDrinks}
                    step={0.5}
                    onValueChange={value => {
                      setAlcoholicDrinks(value);
                    }}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.primary}
                  />
                </View>

                <CheckBox
                  title="Former Drinker"
                  checked={formerDrinker}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setFormerDrinker(formerDrinker ? false : true);
                  }}
                />

                <View style={[styles.row, {marginTop: 15}]}>
                  <View>
                    <Text>
                      Physical Activity ({physicalActivity.toFixed(1)})
                    </Text>
                    <Text>(Per Week)</Text>
                  </View>
                  <Slider
                    style={{width: 150}}
                    minimumValue={0}
                    maximumValue={30}
                    value={physicalActivity}
                    step={1}
                    onValueChange={value => {
                      setPhysicalActivity(value);
                    }}
                    minimumTrackTintColor={theme.colors.primary}
                    maximumTrackTintColor="#E5E5E5"
                    thumbTintColor={theme.colors.primary}
                  />
                </View>

                <CheckBox
                  title="Indicators Of Anger"
                  checked={indicatorsOfAnger}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setIndicatorsOfAnger(indicatorsOfAnger ? false : true);
                  }}
                />

                <CheckBox
                  title="Depression"
                  checked={depression}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setDepression(depression ? false : true);
                  }}
                />

                <CheckBox
                  title="Anxiety"
                  checked={anxiety}
                  containerStyle={styles.checkboxContainer}
                  textStyle={styles.checkboxText}
                  onPress={() => {
                    setAnxiety(anxiety ? false : true);
                  }}
                />

                <Button
                  title="Calculate Risk"
                  containerStyle={{marginTop: 20}}
                  buttonStyle={{backgroundColor: theme.colors.primary}}
                  onPress={() => {
                    setPercentage(
                      RiskPrediction.strokeRS({
                        gender,
                        age,
                        education,
                        renalDisease,
                        diabetes,
                        congestiveHeartFailure,
                        peripheralArterialDisease,
                        highBloodPressure,
                        ischemicHeartDisease,
                        smoking,
                        formerSmoker,
                        alcoholicDrinks,
                        formerDrinker,
                        physicalActivity,
                        indicatorsOfAnger,
                        depression,
                        anxiety,
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
  checkboxContainer: {
    flex: 1,
    marginLeft: 0,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  checkboxText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'normal',
  },
});
