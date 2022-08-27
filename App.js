import { extendTheme, NativeBaseProvider, StatusBar } from "native-base";
import { LinearGradient } from "react-native-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import ExpenseScreen from "./screens/ExpenseScreen";
import UserDataContextProvider from "./store/redux/userdata-context";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#edeeff",
        100: "#cccbeb",
        200: "#acaad7",
        300: "#8d87c5",
        400: "#6f65b3",
        500: "#584c9a",
        600: "#413b79",
        700: "#2b2a57",
        800: "#181a36",
        900: "#060718",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  });

  return (
    <>
      {/* <StatusBar barStyle={"default"}></StatusBar> */}
      <NativeBaseProvider theme={theme} config={config}>
        <UserDataContextProvider>
          <NavigationContainer>
            <Tab.Navigator
              barStyle={{
                backgroundColor: "#694fad",
                elevation: 5,
                shadowColor: "#fff",
              }}
              initialRouteName="Home"
            >
              <Tab.Screen
                options={{
                  tabBarLabel: "Home",
                  paddingBottom: 48,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                  ),
                }}
                name="Home"
                component={Home}
              />
              <Tab.Screen
                options={{
                  tabBarLabel: "Expense List",
                  paddingBottom: 48,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name="ios-list-outline" size={24} color={color} />
                  ),
                }}
                name="ExpenseList"
                component={ExpenseScreen}
              />
              <Tab.Screen
                options={{
                  tabBarLabel: "Setting",
                  paddingBottom: 48,

                  tabBarIcon: ({ color }) => (
                    <Feather name="settings" size={22} color={color} />
                  ),
                }}
                name="Screen"
                component={Settings}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </UserDataContextProvider>
      </NativeBaseProvider>
    </>
  );
}
