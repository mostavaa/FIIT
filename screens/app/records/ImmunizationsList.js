import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ThemeConsumer, Text, ListItem, Icon} from 'react-native-elements';
import {AuthContext} from '../../../components/auth/AuthContext';

export default props => {
  const [isLoading, setIsLoading] = useState(true);
  const [immunizations, setImmunizations] = useState();

  const {createRequest} = React.useContext(AuthContext);

  const getImmunizationsData = new Promise((resolve, reject) => {
    createRequest('GET', 'users/get-immunizations', null, null)
      .then(response => response.json())
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        console.log(error);
      });
  });

  useEffect(() => {
    getImmunizationsData.then(data => {
      if (data.sucess) {
        setImmunizations(data.payload);
      }
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
            <ScrollView contentContainerStyle={{padding: 30}}>
              <Text
                style={{
                  color: theme.colors.secondary,
                  fontSize: 26,
                  fontFamily: 'Montserrat-Bold',
                  marginTop: 30,
                }}>
                Immunizations
              </Text>
              <Text>All information about your Immunizations.</Text>
              <View style={{marginTop: 30}}>
                {immunizations.map((item, i) => (
                  <ListItem
                    key={i}
                    containerStyle={{
                      paddingHorizontal: 0,
                      paddingVertical: 20,
                      borderBottomColor: '#EAEAEA',
                      borderBottomWidth: 1,
                    }}
                    title={item.name}
                    titleStyle={{
                      color: theme.colors.secondary,
                      fontSize: 16,
                      fontFamily: 'Montserrat-Bold',
                    }}
                    subtitle={`${item.status}`}
                    // rightIcon={
                    //   <Icon
                    //     name="md-share"
                    //     type="ionicon"
                    //     color={theme.colors.error}
                    //     size={18}
                    //   />
                    // }
                  />
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
