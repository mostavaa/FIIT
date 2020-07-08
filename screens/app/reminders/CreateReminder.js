import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Picker,
} from 'react-native';
import {ThemeConsumer, Text, Icon, Input} from 'react-native-elements';

import Pills from '../../../assets/images/pills.svg';

export default props => {
  const [medicineName, setMedicineName] = React.useState('');
  const [frequency, setFrequency] = React.useState('');

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
              <View style={{marginTop: 50, alignItems: 'center'}}>
                <Pills />
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: 'Montserrat-Bold',
                    color: theme.colors.secondary,
                    marginTop: 20,
                  }}>
                  ADD NEW MEDICINe
                </Text>
              </View>
              <View style={styles.row}>
                <Input
                  placeholder="Medicine Name"
                  leftIcon={
                    <Icon
                      name="pill"
                      type="material-community"
                      size={20}
                      color={theme.colors.secondary}
                    />
                  }
                  value={medicineName}
                  onChangeText={value => {
                    setMedicineName(value);
                  }}
                />
              </View>

              <View style={[styles.row, {paddingHorizontal: 5}]}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#EAEAEA',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Icon
                    name="repeat"
                    type="font-awesome"
                    size={20}
                    color={theme.colors.secondary}
                    containerStyle={{paddingLeft: 5, paddingRight: 20}}
                  />
                  <Picker
                    selectedValue={frequency}
                    style={{
                      height: 50,
                      flexGrow: 1,
                    }}
                    itemStyle={{marginLeft: 10}}
                    onValueChange={(itemValue, itemIndex) =>
                      setFrequency(itemValue)
                    }>
                    <Picker.Item label="Daily" value="daily" />
                    <Picker.Item label="Weekly" value="weekly" />
                    <Picker.Item label="Monthly" value="monthly" />
                  </Picker>
                </View>
              </View>

              <View style={[styles.row, {paddingHorizontal: 5}]}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#EAEAEA',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Icon
                    name="clock-o"
                    type="font-awesome"
                    size={20}
                    color={theme.colors.secondary}
                    containerStyle={{paddingLeft: 5, paddingRight: 20}}
                  />
                  <Picker
                    selectedValue={frequency}
                    style={{
                      height: 50,
                      flexGrow: 1,
                    }}
                    itemStyle={{marginLeft: 10}}
                    onValueChange={(itemValue, itemIndex) =>
                      setFrequency(itemValue)
                    }>
                    <Picker.Item label="5 day" value="daily" />
                    <Picker.Item label="2 days" value="weekly" />
                    <Picker.Item label="3 days" value="monthly" />
                  </Picker>
                </View>
              </View>

              <View style={[styles.row, {paddingHorizontal: 5}]}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: '#EAEAEA',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5,
                  }}>
                  <Icon
                    name="repeat"
                    type="font-awesome"
                    size={20}
                    color={theme.colors.secondary}
                    containerStyle={{paddingLeft: 5, paddingRight: 20}}
                  />
                  <Picker
                    selectedValue={frequency}
                    style={{
                      height: 50,
                      flexGrow: 1,
                    }}
                    itemStyle={{marginLeft: 10}}
                    onValueChange={(itemValue, itemIndex) =>
                      setFrequency(itemValue)
                    }>
                    <Picker.Item label="3 times / day" value="daily" />
                    <Picker.Item label="Weekly" value="weekly" />
                    <Picker.Item label="Monthly" value="monthly" />
                  </Picker>
                </View>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -10,
    marginVertical: 10,
  },
});
