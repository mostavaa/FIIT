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
import {AuthContext} from '../../../components/auth/AuthContext';

export default props => {
  const [isLoading, setIsLoading] = useState(true);
  const [visits, setVisits] = useState(null);

  const {createRequest} = React.useContext(AuthContext);

  const getVisitsData = new Promise((resolve, reject) => {
    createRequest('GET', 'users/get-visits', null, null)
      .then(response => response.json())
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        console.log(error);
      });
  });

  useEffect(() => {
    getVisitsData.then(data => {
      if (data.sucess) {
        setVisits(data.payload);
      }
      setIsLoading(false);
    });
  }, []);

  const [search, setSearch] = useState('');

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
              {visits.map((item, i) => (
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
                  title={new Date(item.admitdate).toUTCString()}
                  titleStyle={{
                    color: theme.colors.primary,
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    marginLeft: 10,
                  }}
                  subtitle={
                    <View style={{marginLeft: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Doctor: </Text>
                        <Text style={{fontFamily: 'Montserrat-Bold'}}>
                          {item.doctor}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text>Case: </Text>
                        <Text style={{fontFamily: 'Montserrat-Bold'}}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  }
                  onPress={() => {
                    props.navigation.navigate('Documents', {
                      visitId: item.visitid,
                    });
                  }}
                  subtitleStyle={{marginLeft: 10}}
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
