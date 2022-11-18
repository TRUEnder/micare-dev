import { LogBox } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-async-storage/async-storage"


import LoginUserScreen from './app/screens/LoginUserScreen'
import RegisterUserScreen from './app/screens/RegisterUserScreen'
import LoginPsikologScreen from './app/screens/LoginPsikologScreen'
import RegisterPsikologScreen from './app/screens/RegisterPsikologScreen'
import HomeScreen from './app/screens/HomeScreen'
import PsikologScreen from './app/screens/PsikologScreen'
import ChatScreen from './app/screens/ChatScreen'
import SettingScreen from './app/screens/SettingScreen'
import { currentUser } from './configFirebase';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function LandingPageTabs() {

  if (currentUser.status == 'user') {

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Psikolog') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'mediumpurple',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Psikolog" component={PsikologScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    );

  } else if (currentUser.status == 'psikolog') {

    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Psikolog') {
              iconName = focused ? 'people' : 'people-outline';
            } else if (route.name === 'Chat') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'mediumpurple',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Chat" component={ChatScreen} />
        <Tab.Screen options={{ headerShown: false }} name="Settings" component={SettingScreen} />
      </Tab.Navigator>
    );

  } else {
    return null
  }

}

export default function App() {
  LogBox.ignoreAllLogs(true)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />
        <Stack.Screen name="LoginPsikolog" component={LoginPsikologScreen} />
        <Stack.Screen name="RegisterPsikolog" component={RegisterPsikologScreen} />
        <Stack.Screen name="LandingPage" component={LandingPageTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}