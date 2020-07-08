import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {ThemeConsumer, Icon, Text} from 'react-native-elements';
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
                Visits
              </Text>
              <Text>All information about your visits.</Text>
              <View style={{marginTop: 40}}>
                {visits.map(visit => (
                  <TouchableOpacity style={styles.card} activeOpacity={0.85}>
                    <View style={styles.cardHeader}>
                      <Text
                        style={{
                          fontFamily: 'Montserrat-Bold',
                          fontSize: 18,
                          color: '#FFF',
                        }}>
                        {visit.description}
                      </Text>
                      <Icon
                        name="chevron-right"
                        type="font-awesome"
                        size={16}
                        color="#FFF"
                      />
                    </View>
                    <View style={styles.cardBody}>
                      <Text>{`Doctor: ${visit.doctor}`}</Text>
                      <Text>{`Date: ${new Date(
                        visit.admitdate,
                      ).toUTCString()}`}</Text>
                    </View>
                  </TouchableOpacity>
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
  card: {
    borderWidth: 1,
    borderColor: '#1EB5FC',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  cardHeader: {
    backgroundColor: '#1EB5FC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBody: {
    padding: 15,
  },
});
