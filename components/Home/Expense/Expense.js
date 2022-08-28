import { Text, View, StyleSheet } from "react-native";
import { useContext } from "react";

import ExpenseList from "./ExpenseList";
import { UserDataContext } from "../../../store/redux/userdata-context";
import NoExpenseMsg from "./NoExpenseMsg";

const Expense = ({ onExpenseItemPress, setSelectedExpense }) => {
  const userDataCtx = useContext(UserDataContext);

  const onClickExpenseItem = (mainIdx, expIdx) => {
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
      <Text style={{ fontSize: 20, textAlign: "center", marginTop: 20 }}>
        Recent Expenses
      </Text>
      {userDataCtx.expenseList.length <= 1 &&
      userDataCtx.expenseList[0]?.expList.length ? (
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
    marginTop: 4,
    marginBottom: 2,
  },
});
