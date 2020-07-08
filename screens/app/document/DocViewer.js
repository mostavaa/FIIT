import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ThemeConsumer} from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import {AuthContext} from '../../../components/auth/AuthContext';

export default ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [doc, setDoc] = useState([
    {
      url: '',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      props: {
        resizeMode: 'contain',
      },
    },
  ]);

  const {createRequest} = React.useContext(AuthContext);

  const getDocsData = new Promise((resolve, reject) => {
    createRequest('GET', `users/get-document/${route.params.id}`, null, null)
      .then(response => response.json())
      .then(resp => {
        console.log(resp);
        resolve(resp);
      })
      .catch(error => {
        console.log(error);
      });
  });

  useEffect(() => {
    getDocsData.then(data => {
      if (data.success) {
        setDoc([
          {
            url: `data:image/${data.payload.type};base64,${data.file}`,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            props: {
              resizeMode: 'contain',
            },
          },
        ]);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
            <ImageViewer imageUrls={doc} />
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
