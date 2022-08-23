import WelcomeTitle from "../components/Home/WelcomeTitle";
import Spent from "../components/Home/Spent";
import { useState } from "react";
import Expense from "../components/Home/Expense/Expense";
import { View } from "react-native";

const Home = () => {
  const [spentAmount, setSpentAmount] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <WelcomeTitle />
      <Spent spent={spentAmount} />
      <View style={{ flex: 2 }}>
        <Expense />
      </View>
    </View>
  );
};

export default Home;
