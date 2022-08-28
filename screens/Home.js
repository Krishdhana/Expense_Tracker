import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AnimatedFAB } from "react-native-paper";
import { UserDataContext } from "../store/redux/userdata-context";

import WelcomeTitle from "../components/Home/WelcomeTitle";
import Expense from "../components/Home/Expense/Expense";
import Wrapper from "../components/shared/Wrapper";
import OverviewBanner from "../components/Home/OverviewBanner";
import AddNewExpenseModal from "../components/Home/Expense/AddNewExpenseModal";
import ExpenseItemOptionSheet from "../components/Home/Expense/ExpenseItemOptionSheet";
import ViewExpense from "../components/Home/Expense/ViewExpense";

const Home = () => {
  const userDataCtx = useContext(UserDataContext);

  const [bottomSheetState, setBottomSheetState] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});
  const [expenseEditMode, setExpenseEditMode] = useState(false);

  const [addNewExpenseModalState, setAddNewExpenseModalState] = useState(false);
  const [viewExpenseDialog, setViewExpenseDialog] = useState(false);

  const resetToDefault = () => {
    setAddNewExpenseModalState(false);
    setExpenseEditMode(false);
    setSelectedExpense({});
  };

  const openBottomSheet = () => {
    setBottomSheetState(true);
  };

  const updateExpenseItem = () => {
    setExpenseEditMode(true);
    setAddNewExpenseModalState(true);
  };

  const deleteExpenseItem = () => {
    userDataCtx.removeExpense(selectedExpense);
  };

  const getSelectedAction = (option) => {
    switch (option) {
      case 1:
        setViewExpenseDialog(true);
        break;
      case 2:
        updateExpenseItem();
        break;
      case 3:
        deleteExpenseItem();
        break;
    }
  };

  return (
    <Wrapper>
      <View style={{ flex: 1 }}>
        <WelcomeTitle name={userDataCtx.userInfo.name} />
        <OverviewBanner expenseDetails={userDataCtx.expenseDetails} />
        <View style={{ flex: 2 }}>
          <Expense
            setSelectedExpense={setSelectedExpense}
            onExpenseItemPress={openBottomSheet}
          />
        </View>
        <AddNewExpenseModal
          open={addNewExpenseModalState}
          closeModal={resetToDefault}
          isEditMode={expenseEditMode}
          selectedExpense={selectedExpense}
        />
        <ViewExpense
          selectedExpense={selectedExpense}
          open={viewExpenseDialog}
          close={setViewExpenseDialog}
        />
        <ExpenseItemOptionSheet
          selectedExpense={selectedExpense}
          open={bottomSheetState}
          closeSheet={() => setBottomSheetState(false)}
          getSelectedAction={getSelectedAction}
        />
      </View>
      <AnimatedFAB
        icon={"plus"}
        label={"Label"}
        visible={true}
        onPress={() => setAddNewExpenseModalState(true)}
        animateFrom={"right"}
        iconMode={"static"}
        style={styles.fabStyle}
      />
    </Wrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
