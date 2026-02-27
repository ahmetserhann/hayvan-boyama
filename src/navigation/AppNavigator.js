import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import DemoColoringScreen from '../screens/DemoColoringScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ColoringScreen from '../screens/ColoringScreen';
import CompletionScreen from '../screens/CompletionScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Pass soundEnabled as a prop to screens via screenOptions
  const sharedProps = { soundEnabled, setSoundEnabled };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="Demo">
          {(props) => <DemoColoringScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="Categories">
          {(props) => <CategoriesScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="Coloring">
          {(props) => <ColoringScreen {...props} {...sharedProps} />}
        </Stack.Screen>
        <Stack.Screen name="Completion">
          {(props) => <CompletionScreen {...props} {...sharedProps} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
