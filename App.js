import { LogBox } from 'react-native'
import { NavigationContainer, TabActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-async-storage/async-storage"


import LoginScreen from './app/screens/LoginScreen'
import RegisterScreen from './app/screens/RegisterScreen'
import HomeScreen from './app/screens/HomeScreen'
import PsikologScreen from './app/screens/PsikologScreen'
import ChatScreen from './app/screens/ChatScreen'
import SettingScreen from './app/screens/SettingScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function LandingPageTabs() {
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
}

export default function App() {
  LogBox.ignoreAllLogs(true)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="LandingPage" component={LandingPageTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}