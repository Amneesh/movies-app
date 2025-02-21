
import React from 'react';
import { Platform ,SafeAreaView, StyleSheet, View} from 'react-native';

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
