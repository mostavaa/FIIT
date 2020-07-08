import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  ThemeConsumer,
  CheckBox,
  Text,
  ListItem,
  Image,
  Icon,
} from 'react-native-elements';
import ActionButton from 'react-native-action-button';

import Checked from '../../../assets/images/checked';
import Unchecked from '../../../assets/images/unchecked';

export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const [enabledReminder, setEnabledReminder] = useState(false);
  const [enabledReminder1, setEnabledReminder1] = useState(false);

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
            <ScrollView contentContainerStyle={{padding: 30}}>
              <View
                style={{
                  paddingTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 24,
                    }}>
                    Medication Tracker
                  </Text>
                  <Text style={{color: '#BCBCBC'}}>Set Medicines Reminder</Text>
                </View>
                <Icon
                  type="octicon"
                  name="calendar"
                  size={36}
                  color={theme.colors.dark}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#E7E7E7',
                  marginTop: 30,
                }}>
                <View style={{justifyContent: 'space-between'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                      color: theme.colors.primary,
                    }}>
                    Next Medicine
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: theme.colors.error,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 15,
                      }}>
                      Adderall
                    </Text>
                    <Text style={{color: '#9A9A9A'}}>Does: 1</Text>
                  </View>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Icon
                    type="antdesign"
                    name="clockcircleo"
                    color={theme.colors.primary}
                    size={42}
                  />
                  <Text
                    style={{
                      color: theme.colors.primary,
                      fontSize: 16,
                      marginTop: 10,
                    }}>
                    3 hrs, 19 min
                  </Text>
                </View>
              </View>

              <View style={{marginTop: 30}}>
                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                      color: theme.colors.primary,
                    }}>
                    1:00 PM
                  </Text>

                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        color: theme.colors.error,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 15,
                      }}>
                      Adderall
                    </Text>
                    <Text style={{color: '#9A9A9A'}}>Does: 1</Text>
                  </View>

                  <CheckBox
                    checkedIcon={<Checked />}
                    uncheckedIcon={<Unchecked />}
                    checked={enabledReminder}
                    onPress={() => {
                      setEnabledReminder(!enabledReminder);
                    }}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      paddingHorizontal: 0,
                    }}
                  />
                </View>

                <View style={styles.row}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                      color: theme.colors.primary,
                    }}>
                    9:00 PM
                  </Text>

                  <View style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        color: theme.colors.error,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 15,
                      }}>
                      Alprazolam
                    </Text>
                    <Text style={{color: '#9A9A9A'}}>Does: 1</Text>
                  </View>

                  <CheckBox
                    checkedIcon={<Checked />}
                    uncheckedIcon={<Unchecked />}
                    checked={enabledReminder1}
                    onPress={() => {
                      setEnabledReminder1(!enabledReminder1);
                    }}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                      paddingHorizontal: 0,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
            <ActionButton
              buttonColor={theme.colors.primary}
              autoInactive={true}
              size={52}
              hideShadow={false}
              renderIcon={() => (
                <Icon name="plus" type="font-awesome" size={27} color="#FFF" />
              )}>
              <ActionButton.Item
                buttonColor={theme.colors.primary}
                title="Add New Medicine"
                size={42}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  lineHeight: 34,
                }}
                textContainerStyle={{
                  paddingHorizontal: 20,
                  height: 40,
                  marginTop: -12,
                }}
                onPress={() => props.navigation.navigate('CreateReminder')}>
                <Icon name="ios-add" type="ionicon" color="#FFF" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={theme.colors.primary}
                title="Populate From Records"
                size={42}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  lineHeight: 34,
                }}
                textContainerStyle={{
                  paddingHorizontal: 20,
                  height: 40,
                  marginTop: -12,
                }}
                onPress={() => {}}>
                <Icon name="md-notifications-off" type="ionicon" color="#FFF" />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor={theme.colors.primary}
                title="Connect To Alexa"
                size={42}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Bold',
                  lineHeight: 34,
                }}
                textContainerStyle={{
                  paddingHorizontal: 20,
                  height: 40,
                  marginTop: -12,
                }}
                onPress={() => {}}>
                <Icon
                  name="amazon-alexa"
                  type="material-community"
                  color="#FFF"
                />
              </ActionButton.Item>
            </ActionButton>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
  },
});
