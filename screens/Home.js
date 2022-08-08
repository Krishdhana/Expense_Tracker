import { StyleSheet, Text, View } from "react-native";
import WelcomeTitle from "../components/Home/WelcomeTitle";
import ExpenseList from "../components/Home/ExpenseList";
import OverviewChart from "../components/Home/OverviewChart";
import Spent from "../components/Home/Spent";

const Home = () => {
  return (
    <View style={{ flex: 1 }}>
      <WelcomeTitle />
      <Spent />
      <View style={{ flex: 1 }}>
        <OverviewChart />
      </View>
      <View style={{ flex: 2 }}>
        <ExpenseList></ExpenseList>
      </View>
    </View>
  );
};

export default Home;
