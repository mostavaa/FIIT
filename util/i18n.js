import I18n from 'react-native-i18n';
import { I18nManager, AsyncStorage } from "react-native";
import { enableRTL, disableRTL } from '../store/actions/creators'
import RNRestart from 'react-native-restart';
//import Moment from "moment/min/moment-with-locales";

import ar from "../i18n/ar";
import en from "../i18n/en";
I18n.fallbacks = true;
I18n.translations = {
  ar,
  en,
};
I18n.defaultLocale = "en";

const isRTL = () => I18n.currentLocale().indexOf('ar') === 0;
const setLanguageFn = async (language, dispatch) => {
  if (language in I18n.translations) {
    await AsyncStorage.setItem("lang", language);
    I18n.locale = language;
    I18nManager.allowRTL(isRTL());
    I18nManager.forceRTL(isRTL());
    //Moment.updateLocale(language, {});
    if (dispatch)
      if (isRTL())
        dispatch(enableRTL());
      else
        dispatch(disableRTL());
    if (I18nManager.isRTL !== isRTL())
      RNRestart.Restart();

    return true;
  }

  return false;
}
const setLanguage = (language) => (dispatch) => setLanguageFn(language, dispatch)
const language = {
  t: I18n.t.bind(I18n),
  isRTL,
  setLanguage,
  //Moment: Moment,
};
AsyncStorage.getItem("lang").then((lang) => {
  if (!lang) {
    return setLanguageFn("en");
  }
  return setLanguageFn(lang);
});

export default language;
