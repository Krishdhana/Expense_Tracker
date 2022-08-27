import { AddIcon, Button, Flex, Text, View } from "native-base";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import ExpenseList from "./ExpenseList";
import AddNewExpenseModal from "./AddNewExpenseModal";
import ExpenseItemActionSheet from "./ExpenseItemActionSheet";
import { UserDataContext } from "../../../store/redux/userdata-context";
import NoExpenseMsg from "./NoExpenseMsg";
import ViewExpense from "./ViewExpense";

const Expense = () => {
  const userDataCtx = useContext(UserDataContext);

  const [addNewExpenseModalState, setAddNewExpenseModalState] = useState(false);
  const [openExpenseItemActionSheet, setExpenseItemActionSheet] =
    useState(false);
  const [viewExpenseDialog, setViewExpenseDialog] = useState(false);

  const [expenseEditMode, setExpenseEditMode] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({});

  const onClickExpenseItem = (mainIdx, expIdx) => {
    let exp = {
      item: userDataCtx.expenseList[mainIdx].expList[expIdx],
      index: expIdx,
      mainIdx: mainIdx,
    };
    setSelectedExpense(exp);
    setExpenseItemActionSheet(true);
  };

  const resetToDefault = () => {
    setAddNewExpenseModalState(false);
    setExpenseEditMode(false);
    setSelectedExpense({});
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
    <View style={{ flex: 1 }}>
      <Flex
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={4}
        mb={2}
      >
        <Text fontSize={18}>Recent Expenses</Text>
        <Button
          startIcon={<AddIcon />}
          onPress={() => {
            setAddNewExpenseModalState(true);
          }}
          variant="ghost"
        >
          Add Expense
        </Button>
      </Flex>
      {userDataCtx.expenseList.length <= 1 &&
      userDataCtx.expenseList[0]?.expList.length ? (
        <ExpenseList onClickExpenseItem={onClickExpenseItem} />
      ) : (
        <NoExpenseMsg />
      )}
      <AddNewExpenseModal
        open={addNewExpenseModalState}
        closeModal={resetToDefault}
        isEditMode={expenseEditMode}
        selectedExpense={selectedExpense}
      />
      <ExpenseItemActionSheet
        selectedExpense={selectedExpense}
        open={openExpenseItemActionSheet}
        closeActionSheet={setExpenseItemActionSheet}
        getSelectedAction={getSelectedAction}
      />
      <ViewExpense
        selectedExpense={selectedExpense}
        open={viewExpenseDialog}
        close={setViewExpenseDialog}
      />
    </View>
  );
};

export default Expense;
