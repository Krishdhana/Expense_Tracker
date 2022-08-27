import { useContext } from "react";
import { View } from "react-native";
import { UserDataContext } from "../store/redux/userdata-context";

import WelcomeTitle from "../components/Home/WelcomeTitle";

import Expense from "../components/Home/Expense/Expense";
import Wrapper from "../components/shared/Wrapper";
import OverviewBanner from "../components/Home/OverviewBanner";

const Home = () => {
  const userDataCtx = useContext(UserDataContext);

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <WelcomeTitle name={userDataCtx.username} />
        <OverviewBanner expenseDetails={userDataCtx.expenseDetails} />
        <View style={{ flex: 2 }}>
          <Expense />
        </View>
      </View>
    </Wrapper>
  );
};

export default Home;
