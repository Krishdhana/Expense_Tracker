import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";

import ExpenseList from "./ExpenseList";
import { UserDataContext } from "../../../store/redux/userdata-context";
import NoExpenseMsg from "./NoExpenseMsg";
import { SelectedExpense } from "../../shared/interface/Interface";
import { Button } from "react-native-paper";

export type Props = {
  onExpenseItemPress : () => void,
  setSelectedExpense : (exp : SelectedExpense) => void
}

const Expense : React.FC<Props> = ({ onExpenseItemPress, setSelectedExpense }) => {
  const userDataCtx = useContext(UserDataContext);

  const onClickExpenseItem = (mainIdx : number , expIdx : number) => {
    let exp = {
      item: userDataCtx.expenseList[mainIdx].expList[expIdx],
      index: expIdx,
      mainIdx: mainIdx,
    };
    setSelectedExpense(exp);
    onExpenseItemPress();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 18 }}>
          All Expenses
        </Text>
        <Button onPress={() => {}} mode="text">View All</Button>
      </View>
      {userDataCtx.expenseList.length <= 1 &&
      userDataCtx.expenseList[0].expList.length ? (
        <ExpenseList onClickExpenseItem={onClickExpenseItem} />
      ) : (
        <NoExpenseMsg />
      )}
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 2,
  },
});
