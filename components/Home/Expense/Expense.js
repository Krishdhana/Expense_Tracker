import { Button, Text, useDisclose, View } from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";

import ExpenseList from "./ExpenseList";
import AddNewExpenseModal from "./AddNewExpenseModal";
import ExpenseItemActionSheet from "./ExpenseItemActionSheet";

const Expense = () => {
  const [expenseList, updateExpenseList] = useState([
    {
      name: "Dress",
      date: new Date().toISOString(),
      amount: 1000,
    },
    {
      name: "Keyboard",
      date: new Date().toISOString(),
      amount: 1500,
    },
  ]);

  const [addNewExpenseModalState, setAddNewExpenseModalState] = useState(false);
  const [openExpenseItemActionSheet, setExpenseItemActionSheet] =
    useState(false);
  const [selectedExpenseItem, setSelectedExpenseItem] = useState({});
  const [expenseEditMode, setExpenseEditMode] = useState(false);

  const handleExpenseItemClick = (data) => {
    setSelectedExpenseItem(data);
    setExpenseItemActionSheet(true);
  };

  const addExpense = (expense) => {
    if (expenseEditMode) {
      const currentList = [...expenseList];
      currentList.splice(selectedExpenseItem.index, 1, expense);
      updateExpenseList(currentList);
    } else {
      updateExpenseList((currentList) => [...currentList, expense]);
    }
    resetToDefault();
  };

  const resetToDefault = () => {
    setAddNewExpenseModalState(false);
    setExpenseEditMode(false);
    setSelectedExpenseItem({});
  };

  const updateExpenseItem = () => {
    setExpenseEditMode(true);
    setAddNewExpenseModalState(true);
  };

  const getSelectedAction = (option) => {
    console.log(option);
    switch (option) {
      case 1:
        break;
      case 2:
        updateExpenseItem();
        break;
      case 3:
        break;
    }
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.expenseListTitle}>Recent Expenses</Text>
        <Button
          onPress={() => {
            setAddNewExpenseModalState(true);
          }}
          size="sm"
          variant="ghost"
        >
          Add Expense
        </Button>
      </View>
      <ExpenseList
        expenseList={expenseList}
        onClickExpense={handleExpenseItemClick}
      />
      <AddNewExpenseModal
        open={addNewExpenseModalState}
        onAddExpense={addExpense}
        onCloseModal={resetToDefault}
        editMode={expenseEditMode}
        selectedExpense={selectedExpenseItem}
      />
      <ExpenseItemActionSheet
        selectedExpense={selectedExpenseItem}
        open={openExpenseItemActionSheet}
        onCloseActionSheet={setExpenseItemActionSheet}
        getSelectedAction={getSelectedAction}
      />
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  expenseListTitle: {
    fontSize: 18,
  },
});
