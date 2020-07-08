import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import appleAuth, { AppleAuthRequestOperation, AppleAuthError, AppleAuthRequestScope, AppleAuthCredentialState } from '@invertase/react-native-apple-authentication'
import { connect } from 'react-redux';
import { signIn, signOut, restoreToken } from './../../store/actions/creators';


export const AuthContext = React.createContext();

const mapStateToProps = (state) => ({
    userToken: state.user.userToken,
});
const mapDispatchToLProps = (dispatch) => ({
    signIn: (token) => dispatch(signIn(token)),
    signOut: () => dispatch(signOut()),
    restoreToken:(token)=>dispatch(restoreToken(token))
});
export default connect(mapStateToProps, mapDispatchToLProps)(({restoreToken,userToken,signIn,signOut,children }) => {
    useEffect(() => {
        const bootstrapAsync = async () => {
          try {
            let loginData = await AsyncStorage.getItem('@LoginData');
            if (loginData != null) {
              let userToken = JSON.parse(loginData).token;
    
              RNFetchBlob.config({
                trusty: false,
              })
                .fetch(
                  'GET',
                  `http://ec2-52-41-188-142.us-west-2.compute.amazonaws.com/users/check_token`,
                  {
                    authorization: `${userToken}`,
                  },
                  null,
                )
                .then(response => response.json())
                .then(resp => {
                  if (resp.success == false) {
                    Context.signOut();
                  } else {
                    restoreToken(userToken)
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              restoreToken(null)
            }
          } catch (e) {
            console.log('Failed to restore user token');
          }
        };
        bootstrapAsync();
      }, []);

     const Context = {
        signUpWithAppleId: async () => {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGIN,
                requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
            });
    
    
            try {
                const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
                if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
                    console.log("credentialState : ", credentialState);
                }
            } catch (error) {
                console.log(error)
                if (error.code === AppleAuthError.CANCELED) {
                }
                if (error.code === AppleAuthError.FAILED) {
                }
                if (error.code === AppleAuthError.INVALID_RESPONSE) {
                }
                if (error.code === AppleAuthError.NOT_HANDLED) {
                }
                if (error.code === AppleAuthError.UNKNOWN) {
                }
            }
        },
        signIn: async data => {
            Context
                .createRequest(
                    'POST',
                    'users/sign-in',
                    {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                    },
                    JSON.stringify(data),
                )
                .then(response => response.json())
                .then(resp => {
                    if (resp.success == true) {
                        const storeLoginData = async () => {
                            try {
                                await AsyncStorage.setItem('@LoginData', JSON.stringify(resp));
                            } catch (error) {
                                console.log(error);
                            }
                        };
    
                        storeLoginData().then(() => {
                            signIn(resp.token)
                        });
                    } else {
                        alert(resp.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        signOut: () => {
            const clearLoginData = async () => {
                try {
                    await AsyncStorage.removeItem('@LoginData');
                } catch (error) {
                    console.log(error);
                }
            };
    
            clearLoginData().then(() => {
                signOut();
            });
        },
        signUp: async data => {
            Context
                .createRequest('POST', 'users/sign-up', null, JSON.stringify(data))
                .then(response => response.json())
                .then(resp => {
                    if (resp.status == 200) {
                        const storeLoginData = async () => {
                            try {
                                await AsyncStorage.setItem('@LoginData', JSON.stringify(resp));
                            } catch (error) {
                                console.log(error);
                            }
                        };
    
                        storeLoginData().then(() => {
                            signIn(resp.token);
                        });
                    } else {
                        alert(resp.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        createRequest: async (method, endpoint, headers, data) => {
            return RNFetchBlob.config({
                trusty: false,
            }).fetch(
                method,
                `http://ec2-52-41-188-142.us-west-2.compute.amazonaws.com/${endpoint}`,
                {
                    authorization: `${userToken}`,
                    ...headers,
                },
                data,
            );
        },
    };
    
  
    return(<AuthContext.Provider value={Context}>
    {children}
</AuthContext.Provider>)})