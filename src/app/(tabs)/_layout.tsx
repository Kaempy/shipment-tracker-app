import { Tabs } from 'expo-router';

import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
import { Containers, Scan, User, Wallet } from '@svgs/index';
import { useId } from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabs = [
    { key: useId(), name: 'index', title: 'Shipments', icon: Containers },
    { key: useId(), name: 'scan', title: 'Scan', icon: Scan },
    { key: useId(), name: 'wallet', title: 'Wallet', icon: Wallet },
    { key: useId(), name: 'profile', title: 'Profile', icon: User },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      {tabs.map((tab) => {
        const { icon, key, name, title } = tab;
        return (
          <Tabs.Screen
            key={key}
            name={name}
            options={{
              title,
              tabBarActiveTintColor: '#2F50C1',
              tabBarInactiveTintColor: '#A7A3B3',
              tabBarIcon: ({ focused }) =>
                icon({ fill: focused ? '#2F50C1' : '#A7A3B3' }),
            }}
          />
        );
      })}
    </Tabs>
  );
}
