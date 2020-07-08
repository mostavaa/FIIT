import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

import qs from 'qs';

import { settings } from "../constants";

const customFetch = async (url, additionalOptions) => {
  let loginData = await AsyncStorage.getItem('@LoginData');
  if (loginData != null) {
    token = JSON.parse(loginData).token;
  }
  const options = {
    timeout: 15000,
    ...additionalOptions,
    headers: {
      Accept: 'application/json',
      authorization: `${token}`,
      'Content-Type': 'application/json',
      ...(additionalOptions && additionalOptions.headers),
    },
  };
  const response = await RNFetchBlob.config({trusty: false}).fetch(url, options);
  // if (response.status === 401) {
  //   dispatch({ type: LOG_OUT });
  // }
  // if (response.status >= 500) {
  //   navigate('AppError');
  // }
  return Promise.resolve(response);
};

export default {
  get: async (url, query = {}) => {
    const queryString =
      Object.keys(query).length === 0 && query.constructor === Object
        ? ""
        : `?${qs.stringify(query)}`;
    return customFetch(`${settings.domain}${url}${queryString}`, {
      headers: {
        Authorization: ""
      }
    });
  },
  post: async (url, body = {}) => {
    return customFetch(`${settings.domain}${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: ""
      },
      body: body
    });
  },
}; 