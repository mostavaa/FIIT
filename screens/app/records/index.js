import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import {ThemeConsumer, Text, ListItem} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-community/async-storage';

export default props => {
  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState([
    {
      title: 'Allergies',
      icon: <FontAwesome5Icon name="allergies" size={34} color="#1EB5FC" />,
      navigateTo: 'Allergies',
    },
    {
      title: 'Medicatios',
      icon: <FontistoIcon name="pills" size={34} color="#1EB5FC" />,
      navigateTo: 'Medications',
    },
    {
      title: 'Immunizations',
      icon: <FontistoIcon name="laboratory" size={34} color="#1EB5FC" />,
      navigateTo: 'Immunizations',
    },
    {
      title: 'Conditions',
      icon: <FontistoIcon name="bed-patient" size={34} color="#1EB5FC" />,
      navigateTo: 'Conditions',
    },
    // {
    //   title: 'Visits',
    //   icon: <FontistoIcon name="prescription" size={34} color="#1EB5FC" />,
    //   navigateTo: 'Visits',
    // },
  ]);

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
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: 26,
                fontFamily: 'Montserrat-Bold',
                marginTop: 30,
              }}>
              Records
            </Text>
            <Text>All your medical records information.</Text>
            <View style={{marginTop: 30}}>
              {list.map((item, i) => (
                <ListItem
                  key={i}
                  containerStyle={{
                    paddingHorizontal: 0,
                    paddingVertical: 30,
                    borderBottomColor: '#EAEAEA',
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    props.navigation.navigate(item.navigateTo);
                  }}
                  title={item.title}
                  titleStyle={{
                    color: theme.colors.secondary,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    marginLeft: 10,
                  }}
                  subtitle={item.subtitle}
                  subtitleStyle={{marginLeft: 10}}
                  leftIcon={item.icon}
                  chevron={{size: 30, color: theme.colors.error}}
                />
              ))}
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
    backgroundColor: '#FFF',
    padding: 30,
  },
});
