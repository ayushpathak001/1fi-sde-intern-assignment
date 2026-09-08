import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabNavigator } from './MainTabNavigator';
import { MarketplaceScreen } from '../screens/Marketplace';
import { ProductDetailsScreen } from '../screens/ProductDetails';
import { ConfirmationScreen } from '../screens/Confirmation';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigator: bottom tabs for Home/Shop, with the Marketplace flow
 * (Marketplace -> ProductDetails -> Confirmation) pushed full-screen on top,
 * matching the flow diagram in the assignment brief.
 */
export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
