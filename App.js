import 'react-native-gesture-handler';
import * as React from 'react';
import { ThemeProvider } from 'react-native-elements';

import AuthContext from './components/auth/AuthContext';

import { Provider } from "react-redux";
import Store from "./store/configStore";

import { theme } from './constants';
import Screens from './screens/screens';

export default function App(props) {
  return (
    <Provider store={Store()}>
      <AuthContext>
        <ThemeProvider theme={theme}>
          <Screens {...props} />
        </ThemeProvider>
      </AuthContext>
    </Provider>
  );
}
