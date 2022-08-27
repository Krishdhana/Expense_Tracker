import { Input, Button, FormControl } from "native-base";
import { useContext, useEffect, useState } from "react";
import { Modal } from "native-base";
import { UserDataContext } from "../../../store/redux/userdata-context";
import { ToastAndroid } from "react-native";

const AddNewExpenseModal = (props) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const userDataCtx = useContext(UserDataContext);

  useEffect(() => {
    if (props.isEditMode && props.open) {
      setExpenseName(props.selectedExpense.item.name);
      setExpenseAmount(props.selectedExpense.item.amount);
    } else {
      setExpenseName("");
      setExpenseAmount("");
    }
  }, [props.open]);

  const addExpenseHandler = () => {
    if (!isNaN(expenseAmount) && expenseName.length > 2 && expenseAmount > 0) {
      let expenseItem = {
        name: expenseName,
        amount: +expenseAmount,
        date: new Date().toISOString(),
      };

      if (!props.isEditMode) {
        userDataCtx.addExpense(expenseItem);
      } else {
        let newExpense = { ...props.selectedExpense, item: expenseItem };
        userDataCtx.updateExpense(newExpense);
      }
      props.closeModal();
    } else {
      ToastAndroid.show("Please enter proper Expense details", 4000);
    }
  };

  return (
    <Modal isOpen={props.open}>
      <Modal.Content maxWidth="300px">
        <Modal.Header>Add Expense</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              onChangeText={setExpenseName}
              value={expenseName}
              size="sm"
              marginBottom={5}
              placeholder="Name"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Amount</FormControl.Label>
            <Input
              onChangeText={setExpenseAmount}
              keyboardType="numeric"
              value={expenseAmount.toString()}
              size="sm"
              placeholder="Amount"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              size="sm"
              colorScheme="blueGray"
              onPress={props.closeModal}
            >
              Cancel
            </Button>
            <Button size="sm" onPress={addExpenseHandler}>
              {props.isEditMode ? "Update" : "Add"}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddNewExpenseModal;
