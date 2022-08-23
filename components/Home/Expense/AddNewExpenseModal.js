import { Input, Button, FormControl } from "native-base";
import { useEffect, useState } from "react";
import { useToast } from "native-base";
import { Modal } from "native-base";

const AddNewExpenseModal = (props) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const errorToast = useToast();

  useEffect(() => {
    if (props.editMode && props.open) {
      setExpenseName(props.selectedExpense.item.name);
      setExpenseAmount(props.selectedExpense.item.amount);
    } else {
      setExpenseName("");
      setExpenseAmount("");
    }
  }, [props.open]);

  const addExpenseHandler = () => {
    if (!isNaN(expenseAmount) && expenseName) {
      let expenseItem = {
        name: expenseName,
        amount: +expenseAmount,
        date: new Date().toISOString(),
      };
      props.onAddExpense(expenseItem);
    } else {
      errorToast.show({ description: "Hello world", zIndex: 99999999 });
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
              onPress={() => {
                props.onCloseModal(false);
              }}
            >
              Cancel
            </Button>
            <Button size="sm" onPress={addExpenseHandler}>
              {props.editMode ? "Update" : "Add"}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddNewExpenseModal;
