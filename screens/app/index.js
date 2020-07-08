import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';

import Profile from './profile';
import Providers from './profile/Providers';
import Settings from './profile/settings';

import Reminders from './reminders';
import CreateReminder from './reminders/CreateReminder';

import Records from './records';
import AllergiesList from './records/AllergiesList';
import ConditionsList from './records/ConditionsList';
import ImmunizationsList from './records/ImmunizationsList';
import MedicationsList from './records/MedicationsList';
import VisitsList from './records/VisitsList';

import Health from './health';
import Cardiovascular from './health/Cardiovascular';
import Asthma from './health/Asthma';
import Stroke from './health/Stroke';
import Temperature from './health/Temperature';
import Weight from './health/Weight';
import Height from './health/Height';
import BMI from './health/BMI';
import Pulse from './health/Pulse';
import Pressure from './health/Pressure';

import ClinicalNotes from './document';
import DocumentsList from './document/documents';
import DocViewer from './document/DocViewer';

const Tab = createBottomTabNavigator();
const RecordsNavigator = createStackNavigator();
const RemindersNavigator = createStackNavigator();
const HealthNavigator = createStackNavigator();
const ProfileNavigator = createStackNavigator();
const DocumentsNavigator = createStackNavigator();

const recordsStackOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#1EB5FC',
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  headerTitleAlign: 'center',
};

RecordsStack = () => {
  return (
    <RecordsNavigator.Navigator>
      <RecordsNavigator.Screen
        name="Records"
        component={Records}
        options={{headerShown: false}}
      />

      <RecordsNavigator.Screen
        name="Allergies"
        component={AllergiesList}
        options={recordsStackOptions}
      />

      <RecordsNavigator.Screen
        name="Medications"
        component={MedicationsList}
        options={recordsStackOptions}
      />

      <RecordsNavigator.Screen
        name="Immunizations"
        component={ImmunizationsList}
        options={recordsStackOptions}
      />

      <RecordsNavigator.Screen
        name="Conditions"
        component={ConditionsList}
        options={recordsStackOptions}
      />

      <RecordsNavigator.Screen
        name="Visits"
        component={VisitsList}
        options={recordsStackOptions}
      />
    </RecordsNavigator.Navigator>
  );
};

const remindersStackOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#1EB5FC',
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  headerTitleAlign: 'center',
};

RemindersStack = () => {
  return (
    <RemindersNavigator.Navigator>
      <RemindersNavigator.Screen
        name="MEDICINES"
        component={Reminders}
        options={remindersStackOptions}
      />
      <RemindersNavigator.Screen
        name="CreateReminder"
        component={CreateReminder}
        options={{...remindersStackOptions, title: 'ADD MEDICINE'}}
      />
    </RemindersNavigator.Navigator>
  );
};

const ProfileStack = props => {
  return (
    <ProfileNavigator.Navigator>
      <ProfileNavigator.Screen
        name="PROFILE"
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1EB5FC',
            elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Icon
              name="md-settings"
              type="ionicon"
              size={24}
              color="white"
              underlayColor="transparent"
              containerStyle={{paddingHorizontal: 20}}
              onPress={navigation => {
                props.navigation.navigate('SETTINGS');
              }}
            />
          ),
        }}
      />
      <ProfileNavigator.Screen
        name="SETTINGS"
        component={Settings}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1EB5FC',
            elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
        }}
      />
      <ProfileNavigator.Screen
        name="PROVIDERS"
        component={Providers}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1EB5FC',
            elevation: 0,
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Montserrat-Bold',
            fontSize: 16,
            alignSelf: 'center',
          },
          headerTitleAlign: 'center',
        }}
      />
    </ProfileNavigator.Navigator>
  );
};

const options = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#1EB5FC',
    elevation: 0,
  },
  headerTitleStyle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  headerTitleAlign: 'center',
};

HealthStack = () => {
  return (
    <HealthNavigator.Navigator>
      <HealthNavigator.Screen
        name="Health"
        component={Health}
        options={{headerShown: false}}
      />
      <HealthNavigator.Screen
        name="Cardiovascular"
        component={Cardiovascular}
        options={options}
      />
      <HealthNavigator.Screen
        name="Asthma"
        component={Asthma}
        options={options}
      />
      <HealthNavigator.Screen
        name="Stroke"
        component={Stroke}
        options={options}
      />
      <HealthNavigator.Screen
        name="Temperature"
        component={Temperature}
        options={options}
      />
      <HealthNavigator.Screen
        name="Weight"
        component={Weight}
        options={options}
      />
      <HealthNavigator.Screen
        name="Height"
        component={Height}
        options={options}
      />
      <HealthNavigator.Screen name="BMI" component={BMI} options={options} />
      <HealthNavigator.Screen
        name="Pulse"
        component={Pulse}
        options={options}
      />
      <HealthNavigator.Screen
        name="Pressure"
        component={Pressure}
        options={options}
      />
    </HealthNavigator.Navigator>
  );
};

DocumentsStack = () => {
  return (
    <DocumentsNavigator.Navigator>
      <DocumentsNavigator.Screen
        name="Visits"
        component={ClinicalNotes}
        options={{headerShown: false}}
      />

      <DocumentsNavigator.Screen
        name="Documents"
        component={DocumentsList}
        options={{headerShown: false}}
      />

      <DocumentsNavigator.Screen
        name="DocViewer"
        component={DocViewer}
        options={{headerShown: false}}
      />
    </DocumentsNavigator.Navigator>
  );
};

export default props => {
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#1EB5FC" />
    </View>
  ) : (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Profile') {
            iconName = 'user-circle';
          } else if (route.name === 'Reminders') {
            iconName = 'medkit';
          } else if (route.name === 'Records') {
            iconName = 'file-text-o';
          } else if (route.name === 'Health') {
            iconName = 'heartbeat';
          } else if (route.name === 'Clinical Notes') {
            iconName = 'stethoscope';
          }

          // You can return any component that you like here!
          return (
            <Icon name={iconName} type="font-awesome" size={24} color={color} />
          );
        },
      })}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#FF4A31',
        inactiveTintColor: '#A4E1FD',
        style: {
          borderTopWidth: 1,
          borderTopColor: '#EEE',
          height: 67,
          paddingBottom: 7,
          paddingTop: 7,
        },
      }}>
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Reminders" component={RemindersStack} />
      <Tab.Screen name="Records" component={RecordsStack} />
      <Tab.Screen name="Health" component={HealthStack} />
      <Tab.Screen name="Clinical Notes" component={DocumentsStack} />
    </Tab.Navigator>
  );
};
