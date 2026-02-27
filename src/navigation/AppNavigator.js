import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ColoringScreen from '../screens/ColoringScreen';
import CompletionScreen from '../screens/CompletionScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              opacity: current.progress,
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width * 0.3, 0],
                  }),
                },
              ],
            },
          }),
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Coloring" component={ColoringScreen} />
        <Stack.Screen name="Completion" component={CompletionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
