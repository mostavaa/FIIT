import React from 'react';
import { connect } from 'react-redux';

import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import RTL from './../components/layout/rtl';

import Landing from './auth';
import Login from './auth/Login';
import SignUp from './auth/SignUp';

import AppStack from './app';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Button } from 'react-native-elements';


console.disableYellowBox = false;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

const Stack = createStackNavigator();
const AuthNavigator = createStackNavigator();


const mapStateToProps = (state) => ({
    isLoading: state.user.isLoading,
});
const mapDispatchToLProps = (dispatch) => ({
    signIn: (token) => dispatch(signIn(token)),
});
export default connect(mapStateToProps, mapDispatchToLProps)(({ isLoading , navigation }) => {

    React.useEffect(() => {
        if (!isLoading)
            setTimeout(() => {
                SplashScreen.hide();
            }, 300);
    }, [isLoading]);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <RTL>
                {isLoading ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="AppStack"
                            component={AppStack}
                            options={{
                                headerShown: false,
                                title: 'LOGIN',
                                headerLeft: () => (
                                    <Button
                                        containerStyle={{
                                            marginLeft: 10,
                                            paddingTop: 5,
                                        }}
                                        buttonStyle={{ paddingVertical: 10 }}
                                        icon={
                                            <Icon
                                                name="chevron-left"
                                                size={15}
                                                color="white"
                                                style={{ marginRight: 5 }}
                                            />
                                        }
                                        onPress={navigation => navigation.boBack}
                                        title="Back"
                                        color="#fff"
                                        titleStyle={{ fontSize: 16, paddingBottom: 5 }}
                                    />
                                ),
                                headerStyle: {
                                    backgroundColor: '#1EB5FC',
                                },
                                headerTitleStyle: {
                                    color: 'white',
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: 18,
                                    alignSelf: 'center',
                                },
                                headerTitleAlign: 'center',
                            }}
                        />
                    </Stack.Navigator>
                ) : (
                        <AuthNavigator.Navigator>
                            <AuthNavigator.Screen
                                name="Landing"
                                component={Landing}
                                options={{ headerShown: false }}
                            />
                            <AuthNavigator.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <AuthNavigator.Screen
                                name="SignUp"
                                component={SignUp}
                                options={{ headerShown: false }}
                            />
                        </AuthNavigator.Navigator>
                    )}
            </RTL>
        </NavigationContainer>
    );
})