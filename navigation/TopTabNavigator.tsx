// TopTabNavigator.tsx
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MovieScreen from '@/app/screens/MovieScreen';
import SearchScreen from '@/app/screens/SearchScreen'; 
import TvShowsScreen from '@/app/screens/TvShowsScreen';
import MovieDetailScreen from '@/app/movie/[id]';


const Tab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#183b47',
                tabBarIndicatorStyle: { backgroundColor: '#183b47' },
                tabBarStyle: { backgroundColor: '#ffffff' },
            }}
        >
            <Tab.Screen name="Movies" component={MovieScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="TV Shows" component={TvShowsScreen} />


        </Tab.Navigator>
    );
};

export default TopTabNavigator;