import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import {
  ThemeConsumer,
  Text,
  Button,
  Input,
  CheckBox,
} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../components/auth/AuthContext';

import Shield from '../../assets/images/shield.svg';

export default props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [agreementModalVisible, setAgreementModalVisible] = useState(false);
  const [agreement, setAgreement] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDob] = useState(new Date());
  const [postalcode, setPostalcode] = useState();

  const {signUp } = React.useContext(AuthContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setModalVisible(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const trySignUp = async () => {
    // if (validateForm()) {
    signUp({
      username,
      password,
      firstname,
      lastname,
      email,
      phone,
      street,
      city,
      state,
      DOB: dob,
      postalcode,
    });
    // }
  };

  return (
    <ThemeConsumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.primary}
            barStyle="light-content"
          />
          <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
              <ScrollView contentContainerStyle={{padding: 30}}>
               
                <Text
                  style={{
                    color: theme.colors.secondary,
                    textAlign: 'center',
                    fontSize: 26,
                    fontFamily: 'Montserrat-Bold',
                    marginBottom: 40,
                  }}>
                  SIGN IN
                </Text>
              
                <View>
           
                  <Input
                    placeholder="Username or Email"
                    leftIcon={
                      <Icon
                        name="user"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={username}
                    onChangeText={value => {
                      setUsername(value);
                    }}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    leftIcon={
                      <Icon
                        name="lock"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={password}
                    onChangeText={value => {
                      setPassword(value);
                    }}
                  />
                  <Input
                    placeholder="Password Confirmation"
                    secureTextEntry={true}
                    leftIcon={
                      <Icon
                        name="lock"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={passwordConfirmation}
                    onChangeText={value => {
                      setPasswordConfirmation(value);
                    }}
                  />
                  <Input
                    placeholder="Phone"
                    leftIcon={
                      <Icon
                        name="lock"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={phone}
                    onChangeText={value => {
                      setPhone(value);
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Input
                      containerStyle={{width: '50%'}}
                      placeholder="First Name"
                      leftIcon={
                        <Icon
                          name="user"
                          size={20}
                          color={theme.colors.secondary}
                        />
                      }
                      value={firstname}
                      onChangeText={value => {
                        setFirstname(value);
                      }}
                    />
                    <Input
                      containerStyle={{width: '50%'}}
                      placeholder="Last Name"
                      leftIcon={
                        <Icon
                          name="user"
                          size={20}
                          color={theme.colors.secondary}
                        />
                      }
                      value={lastname}
                      onChangeText={value => {
                        setLastname(value);
                      }}
                    />
                  </View>
                  <Input
                    placeholder="E-mail"
                    leftIcon={
                      <Icon
                        name="envelope"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={email}
                    onChangeText={value => {
                      setEmail(value);
                    }}
                  />

                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Input
                      placeholder="Date of Birth"
                      leftIcon={
                        <Icon
                          name="calendar"
                          size={20}
                          color={theme.colors.secondary}
                        />
                      }
                      editable={false}
                      value={dob.toISOString().substring(0, 10)}
                    />
                  </TouchableOpacity>

                  {modalVisible && (
                    <View>
                      <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={dob}
                        mode={'date'}
                        display="default"
                        onChange={onChange}
                      />
                    </View>
                  )}

                  <Input
                    placeholder="Street"
                    leftIcon={
                      <Icon
                        name="map-marker"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={street}
                    onChangeText={value => {
                      setStreet(value);
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Input
                      containerStyle={{width: '50%'}}
                      placeholder="City"
                      leftIcon={
                        <Icon
                          name="map-marker"
                          size={20}
                          color={theme.colors.secondary}
                        />
                      }
                      value={city}
                      onChangeText={value => {
                        setCity(value);
                      }}
                    />

                    <Input
                      containerStyle={{width: '50%'}}
                      placeholder="State"
                      leftIcon={
                        <Icon
                          name="map-marker"
                          size={20}
                          color={theme.colors.secondary}
                        />
                      }
                      value={state}
                      onChangeText={value => {
                        setState(value);
                      }}
                    />
                  </View>
                  <Input
                    placeholder="Zip Code"
                    leftIcon={
                      <Icon
                        name="map-marker"
                        size={20}
                        color={theme.colors.secondary}
                      />
                    }
                    value={postalcode}
                    onChangeText={value => {
                      setPostalcode(value);
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <CheckBox
                      title={
                        <>
                          <Text style={{marginLeft: 8}}>I agree to FIIT </Text>
                          <TouchableOpacity
                            onPress={() => {
                              setAgreementModalVisible(true);
                            }}>
                            <Text
                              style={{
                                color: theme.colors.primary,
                                fontFamily: 'Montserrat-Bold',
                              }}>
                              Terms {'\u0026'} conditions
                            </Text>
                          </TouchableOpacity>
                        </>
                      }
                      checked={agreement}
                      onPress={() => {
                        setAgreement(!agreement);
                      }}
                      containerStyle={{
                        paddingLeft: 0,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                    />
                  </View>

                  <Modal animationType="fade" visible={agreementModalVisible}>
                    <View style={{flex: 1}}>
                      <ScrollView
                        contentContainerStyle={{
                          paddingHorizontal: 30,
                          paddingVertical: 60,
                          alignItems: 'center',
                        }}>
                        <Shield />
                        <Text
                          style={{
                            width: '70%',
                            color: theme.colors.secondary,
                            fontSize: 22,
                            fontFamily: 'Montserrat-Bold',
                            textAlign: 'center',
                            marginTop: 20,
                          }}>
                          PRIVACY AND DATA PROTECTION
                        </Text>
                        <Text style={{textAlign: 'center', marginTop: 30}}>
                          Collecting specific information: We collect
                          information from you when you register on our app.
                          When registering on our app, as appropriate, you may
                          be asked to enter your name, e-mail address, mailing
                          address or phone number. Disclosure Regarding Google
                          Display Advertising: We implement Google Analytics
                          features that use Display Advertising information for
                          Google Analytics Demographics and Interest Reporting.
                          You can opt-out of Google Analytics for Display
                          Advertising, to prevent your data from being used by
                          Google Analytics, by going to the Google Analytics
                          opt-out page.
                          {'\n'}
                          (Here's the
                          link:https://tools.google.com/dlpage/gaoptout/" We,
                          along with third-party vendors (including Google), use
                          first-party cookies (such as the Google Analytics
                          cookies) and third-party cookies (such as the
                          DoubleClick cookies) to report how your ad
                          impressions, other uses of ad services, and
                          interactions with these ad impressions and ad services
                          are related to visits to our website. You can read
                          more about the cookies used by Google Analytics
                          advertising features, by going to the Google Analytics
                          Privacy Policy page.
                          {'\n'}
                          (Here's the link:
                          https://support.google.com/analytics/answer/2700409?hl=en)
                          Specific uses of information Any of the information we
                          collect from you may be used in one of the following
                          ways: To personalize your experience (your information
                          helps us to better respond to your individual needs)
                          To process transactions(Your information, whether
                          public or private, will not be sold, exchanged,
                          transferred, or given to any other company for any
                          reason whatsoever, without your consent, other than
                          for the express purpose of delivering the purchased
                          product or service requested).
                          {'\n'}
                          To send periodic emails(The email address you provide
                          for booking, may be used to send you information and
                          updates pertaining to your booking, in addition to
                          receiving occasional company news, updates, related
                          product or service information, etc.)
                          {'\n'}
                          Note: If at any time you would like to unsubscribe
                          from receiving future emails, we include detailed
                          unsubscribe instructions at the bottom of each email.
                          Protecting Your Information We implement a variety of
                          security measures to maintain the safety of your
                          personal information when you place a booking or
                          enter, submit, or access your personal information. We
                          offer the use of a secure server. All supplied
                          sensitive/credit information is transmitted via Secure
                          Socket Layer (SSL) technology and then encrypted into
                          our Payment gateway providers database only to be
                          accessible by those authorized with special access
                          rights to such systems, and are required to keep the
                          information confidential. After a transaction, your
                          private information (credit cards, social security
                          numbers, financials, etc.) will not be stored on our
                          servers. Cookie Usage Policy Cookies are small files
                          that a site or its service provider transfers to your
                          computer’s hard drive through your Web browser (if you
                          allow) that enables the sites or service providers
                          systems to recognize your browser and capture and
                          remember certain information If you prefer, you can
                          choose to have your computer warn you each time a
                          cookie is being sent, or you can choose to turn off
                          all cookies via your browser settings. Like most
                          websites, if you turn your cookies off, some of our
                          services may not function properly. No disclosure of
                          information to other parties We do not sell, trade, or
                          otherwise transfer to outside parties your personally
                          identifiable information. This does not include
                          trusted third parties who assist us in operating our
                          website, conducting our business, or servicing you, so
                          long as those parties agree to keep this information
                          confidential.
                          {'\n'}
                          We may also release your information when we believe
                          release is appropriate to comply with the law, enforce
                          our site policies, or protect ours or others rights,
                          property, or safety. However, non-personally
                          identifiable visitor information may be provided to
                          other parties for marketing, advertising, or other
                          uses. All credit/debit cards details and personally
                          identifiable information will NOT be stored, sold,
                          shared, rented or leased to any third parties. The
                          Website Policies and Terms {'\u0026'} Conditions may
                          be changed or updated occasionally to meet the
                          requirements and standards. Therefore the Customers’
                          are encouraged to frequently visit these sections in
                          order to be updated about the changes on the website.
                          Modifications will be effective on the day they are
                          posted. Third party links We may include or offer
                          third party products or services on our website. These
                          third party sites have separate and independent
                          privacy policies. We therefore have no responsibility
                          or liability for the content and activities of these
                          linked sites. Nonetheless, we seek to protect the
                          integrity of our site and welcome any feedback about
                          these sites. Terms and Conditions Please also visit
                          our Terms and Conditions section establishing the use,
                          disclaimers, and limitations of liability governing
                          the use of our website at www.vezeeta.com
                        </Text>

                        <Button
                          title="AGREE"
                          containerStyle={{
                            marginTop: 30,
                          }}
                          buttonStyle={{
                            paddingHorizontal: 40,
                          }}
                          onPress={() => {
                            setAgreementModalVisible(false);
                            setAgreement(true);
                          }}
                        />
                      </ScrollView>
                    </View>
                  </Modal>
                 
                  <Button
                    title="Sign up"
                    containerStyle={{marginTop: 40}}
                    onPress={trySignUp}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}>
                  <Text>Forgot your password? </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontFamily: 'Montserrat-Bold',
                      }}>
                      Click here
                    </Text>
                  </TouchableOpacity>
                
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 20,
    alignItems: 'center',
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
