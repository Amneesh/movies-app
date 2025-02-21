// import { Tabs } from 'expo-router';
import React from 'react';
import { Platform ,SafeAreaView, StyleSheet, View} from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { View } from 'react-native-reanimated/lib/typescript/Animated';
import Header from '@/components/header/header';
import TopTabNavigator from '@/navigation/TopTabNavigator';
export default function TabLayout() {


return (
<>

<Header title="Movies App"/>
<TopTabNavigator/>

</>

);


}
