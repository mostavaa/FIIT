import React, {useEffect, useState} from 'react';
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
  Text,
  ListItem,
  Image,
  SearchBar,
  Icon,
} from 'react-native-elements';

import hospital from '../assets/images/hospital.png';
import hospital2 from '../assets/images/hospital2.png';

export default props => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [list, setList] = useState([
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital2,
    },
    {
      title: 'RWJ HOSPITAL',
      date: '2015-03-25',
      case: 'Bike Accident',
      image: hospital,
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 30,
              }}>
              <SearchBar
                placeholder="Search by provider name"
                onChangeText={updateSearch}
                value={search}
                lightTheme={true}
                round={true}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  paddingHorizontal: 0,
                  flex: 1,
                }}
                inputContainerStyle={{
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  paddingVertical: 0,
                  borderRadius: 23,
                  paddingLeft: 10,
                  alignItems: 'center',
                }}
                inputStyle={{fontSize: 14, paddingLeft: 10}}
                searchIcon={{size: 32, color: theme.colors.primary}}
              />
              <TouchableOpacity style={{marginLeft: 10}}>
                <Icon
                  type="material"
                  name="filter-list"
                  size={30}
                  color={theme.colors.primary}
                />
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: 13,
                    fontFamily: 'Montserrat-Bold',
                  }}>
                  Filter
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{paddingHorizontal: 30}}>
              {list.map((item, i) => (
                <ListItem
                  key={i}
                  containerStyle={{
                    paddingHorizontal: 0,
                    paddingVertical: 20,
                    borderBottomColor: '#EAEAEA',
                    borderBottomWidth: 1,
                  }}
                  //   onPress={() => {
                  //     props.navigation.navigate(item.navigateTo);
                  //   }}
                  title={item.title}
                  titleStyle={{
                    color: theme.colors.primary,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    marginLeft: 10,
                  }}
                  subtitle={
                    <View style={{marginLeft: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Date: </Text>
                        <Text style={{fontFamily: 'Montserrat-Bold'}}>
                          {item.date}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Case: </Text>
                        <Text style={{fontFamily: 'Montserrat-Bold'}}>
                          {item.case}
                        </Text>
                      </View>
                    </View>
                  }
                  subtitleStyle={{marginLeft: 10}}
                  leftElement={
                    <Image
                      source={item.image}
                      style={{width: 65, height: 65}}
                      containerStyle={{
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: theme.colors.primary,
                      }}
                    />
                  }
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
});
