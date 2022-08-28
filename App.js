import { StatusBar } from "react-native";
import { useState } from "react";
import { BottomNavigation, MD3Colors } from "react-native-paper";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import ExpenseScreen from "./screens/ExpenseScreen";
import UserDataContextProvider from "./store/redux/userdata-context";

const HomeRoute = () => <Home />;
const ExpenseListRoute = () => <ExpenseScreen />;
const SettingRoute = () => <Settings />;

export default function App() {
  const customTheme = {
    ...DefaultTheme,
    dark: false,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
    },
    {
      key: "expenseList",
      title: "ExpenseList",
      focusedIcon: "clipboard-list",
      unfocusedIcon: "clipboard-list-outline",
    },
    {
      key: "settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    expenseList: ExpenseListRoute,
    settings: SettingRoute,
  });

  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={MD3Colors.primary90}
      ></StatusBar>
      <PaperProvider theme={customTheme}>
        <UserDataContextProvider>
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </UserDataContextProvider>
      </PaperProvider>
    </>
  );
}
