import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../pages/Main';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

const views = [
	{
		name: 'Login',
		component: Login,
		options: {
			headerShown: false,
		},
	},
	{
		name: 'Main',
		component: Main,
		options: {
			headerShown: false,
		},
	},
];

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login">
				{ views.map((view, indx) => (
					<Stack.Screen
						{...view}
						key={`view-${indx}`}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
