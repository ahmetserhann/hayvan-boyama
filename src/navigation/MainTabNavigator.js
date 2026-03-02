import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import GalleryScreen from '../screens/GalleryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NavBar from '../components/common/NavBar';
import { COLORS } from '../theme/colors';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const ROUTE_TO_TAB = {
  HomeTab: 'home',
  Gallery: 'gallery',
  Settings: 'settings',
};

function CustomTabBar({ state, navigation }) {
  const activeTab = ROUTE_TO_TAB[state.routes[state.index]?.name] || 'home';

  const handleTabPress = (tab) => {
    switch (tab) {
      case 'home':     navigation.navigate('HomeTab'); break;
      case 'gallery':  navigation.navigate('Gallery');  break;
      case 'settings': navigation.navigate('Settings'); break;
    }
  };

  return <NavBar activeTab={activeTab} onTabPress={handleTabPress} />;
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        // Ekran geçişlerinde alttaki gradient gözüksün
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Category" component={CategoryScreen} />
    </HomeStack.Navigator>
  );
}

export default function MainTabNavigator() {
  return (
    // Gradient tüm tab alanını kaplar — NavBar altı dahil
    <LinearGradient
      colors={COLORS.mainBg}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          // Her tab ekranının container'ı transparan — alttaki gradient görünsün
          sceneStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </LinearGradient>
  );
}
