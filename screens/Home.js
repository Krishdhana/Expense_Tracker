import { useContext } from "react";
import { View } from "react-native";
import { UserDataContext } from "../store/redux/userdata-context";

import WelcomeTitle from "../components/Home/WelcomeTitle";
import Spent from "../components/Home/Spent";
import Expense from "../components/Home/Expense/Expense";
import Wrapper from "../components/shared/Wrapper";

const Home = () => {
  const userDataCtx = useContext(UserDataContext);

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <WelcomeTitle name={userDataCtx.username} />
        <Spent spent={userDataCtx.totalExpenseAmount} />
        <View style={{ flex: 2 }}>
          <Expense />
        </View>
      </View>
    </Wrapper>
  );
};

export default Home;
