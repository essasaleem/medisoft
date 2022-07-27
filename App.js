import React,{useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Provider} from 'react-redux';
import Navigation from './Navigations/navigation';
import store from './Redux/Store';
import Signup from './Screens/Auth/Signup';
import {auth} from './Firebase/Firebase';
import {Provider as PaperProvider} from 'react-native-paper';
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ToastProvider>
    <Provider store={store}>
      <Navigation />
    </Provider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
