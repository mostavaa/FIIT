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
import {ThemeConsumer, Text, Image, Icon} from 'react-native-elements';

// import HealingIcon from '../assets/images/healing-icon.svg';
// import hospital from '../assets/images/hospital.png';
// import hospital2 from '../assets/images/hospital2.png';

export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [list, setList] = useState([
    {
      title: 'RWJ HOSPITAL',
      image: hospital,
    },
    {
      title: 'RWJ HOSPITAL',
      image: hospital,
    },
    {
      title: 'MAYO Clinic',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      image: hospital,
    },
    {
      title: 'MAYO Clinic',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      image: hospital,
    },
    {
      title: 'RWJ',
      image: hospital,
    },
    {
      title: 'MAYO Clinic',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      image: hospital,
    },
    {
      title: 'MAYO Clinic',
      image: hospital2,
    },
  ]);

  updateSearch = search => {
    setSearch({search});
  };

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
            <ScrollView contentContainerStyle={{padding: 20}}>
              <View
                style={{
                  paddingTop: 20,
                  alignItems: 'center',
                }}>
                <HealingIcon />
                <Text
                  style={{
                    color: theme.colors.secondary,
                    fontFamily: 'Montserrat-Bold',
                    fontSize: 24,
                    marginTop: 20,
                  }}>
                  MY PROVIDERS
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginTop: 30,
                }}>
                {list.map((item, i) => (
                  <View style={{padding: 15, marginVertical: 5}} key={i}>
                    <View
                      style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#EAEAEA',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={item.image}
                        style={{width: 100, height: 100}}
                        containerStyle={{marginHorizontal: 10}}
                      />
                      <Text
                        style={{
                          color: theme.colors.primary,
                          fontSize: 16,
                          fontFamily: 'Montserrat-Bold',
                          marginHorizontal: 10,
                          marginVertical: 10,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 5,
                      }}>
                      <Icon
                        type="ionicon"
                        name="md-close-circle"
                        size={30}
                        color="#E5432C"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
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
});
