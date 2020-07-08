import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {
  ThemeConsumer,
  Text,
  ListItem,
  Button,
  SearchBar,
  Icon,
  Input,
} from 'react-native-elements';
import {AuthContext} from '../../../components/auth/AuthContext';

export default props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [hospital, setHospital] = useState('');
  const [mrn, setMrn] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [providers, setProviders] = useState();
  const [status, setStatus] = useState('');

  const {createRequest} = React.useContext(AuthContext);

  const getProviders = new Promise((resolve, reject) => {
    createRequest('GET', 'users/providers', null, null)
      .then(response => response.json())
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        console.log(error);
      });
  });

  const getData = (targetHospital, mrn) => {
    return new Promise((resolve, reject) => {
      createRequest(
        'POST',
        'users/get-data',
        {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        JSON.stringify({
          hospitals: [
            {
              id: targetHospital.id,
              mrn,
            },
          ],
        }),
      )
        .then(response => response.json())
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  const updateSearch = search => {
    setSearch({search});
  };

  React.useEffect(() => {
    getProviders.then(resp => {
      setProviders(resp);
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
          <KeyboardAvoidingView
            behavior="position"
            enabled={false}
            style={styles.container}>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss;
              }}>
              <>
                <View
                  style={{
                    paddingHorizontal: 30,
                    paddingTop: 20,
                  }}>
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontFamily: 'Montserrat-Bold',
                      fontSize: 24,
                    }}>
                    Add Providers
                  </Text>
                  <Text style={{color: '#BCBCBC'}}>
                    Choose hospitals to retrieve the data from
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
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
                </View>

                <ScrollView contentContainerStyle={{paddingHorizontal: 30}}>
                  {providers.hospitals.map((item, i) => (
                    <ListItem
                      key={item.id}
                      containerStyle={{
                        paddingHorizontal: 0,
                        paddingVertical: 20,
                        borderBottomColor: '#EAEAEA',
                        borderBottomWidth: 1,
                      }}
                      //   onPress={() => {
                      //     props.navigation.navigate(item.navigateTo);
                      //   }}
                      title={item.name}
                      titleStyle={{
                        color: theme.colors.primary,
                        fontSize: 20,
                        fontFamily: 'Montserrat-Bold',
                        marginLeft: 10,
                      }}
                      subtitleStyle={{marginLeft: 10}}
                      rightElement={() => {
                        let connected = providers.covered_hospitals.find(
                          hospital => item.id === hospital.id,
                        );
                        return (
                          <Button
                            title={connected ? 'Linked' : 'Link'}
                            buttonStyle={{paddingVertical: 5}}
                            titleStyle={{fontSize: 14}}
                            disabled={!!connected}
                            disabledTitleStyle={{color: theme.colors.success}}
                            disabledStyle={{backgroundColor: 'transparent'}}
                            onPress={() => {
                              setHospital(item);
                              setModalVisible(true);
                            }}
                            icon={
                              connected ? (
                                <Icon
                                  name="md-done-all"
                                  type="ionicon"
                                  size={20}
                                  color={theme.colors.success}
                                  containerStyle={{marginLeft: 5}}
                                />
                              ) : (
                                <Icon
                                  name="ios-link"
                                  type="ionicon"
                                  size={18}
                                  color="white"
                                  containerStyle={{marginLeft: 5}}
                                />
                              )
                            }
                            iconRight
                          />
                        );
                      }}
                    />
                  ))}
                </ScrollView>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setModalVisible(false);
                      setMrn('');
                      setStatus('');
                    }}>
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text
                          style={{
                            fontFamily: 'Montserrat-Bold',
                            fontSize: 15,
                            color: theme.colors.secondary,
                          }}>
                          Enter your Medical Record Number at this provider to
                          fetch your data
                        </Text>
                        <Input
                          containerStyle={{width: '100%', marginVertical: 30}}
                          placeholder="Medical Record Number"
                          value={mrn}
                          onChangeText={value => {
                            setMrn(value);
                          }}
                        />
                        <Button
                          title={
                            status !== ''
                              ? status === 'success'
                                ? 'Successful'
                                : 'Failed'
                              : 'Fetch Data'
                          }
                          buttonStyle={[
                            {paddingVertical: 10, borderRadius: 30},
                            status !== ''
                              ? {
                                  backgroundColor:
                                    status === 'success'
                                      ? theme.colors.success
                                      : theme.colors.error,
                                }
                              : null,
                          ]}
                          loading={isModalLoading}
                          onPress={() => {
                            setIsModalLoading(true);
                            getData(hospital, mrn).then(resp => {
                              if (resp.success == true) {
                                setStatus('success');
                              } else setStatus('fail');
                              setIsModalLoading(false);
                              // to be removed
                              let newProviders = JSON.parse(
                                JSON.stringify(providers),
                              );
                              newProviders.covered_hospitals = [
                                ...providers.covered_hospitals,
                                hospital,
                              ];
                              setProviders(newProviders);

                              setTimeout(() => {
                                setModalVisible(false);
                                setStatus('');
                              }, 1000);
                            });
                          }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              </>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    padding: 30,
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
