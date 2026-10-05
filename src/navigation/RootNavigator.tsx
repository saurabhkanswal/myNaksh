import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConversationScreen } from '../views/screens/ConversationScreen';

export type RootStackParamList = {
  Conversation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Conversation">
        {({ navigation }) => (
          <ConversationScreen onBack={navigation.canGoBack() ? navigation.goBack : undefined} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
