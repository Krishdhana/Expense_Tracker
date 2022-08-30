import {
  Modal,
  Portal,
  Button,
  TextInput,
  MD3Colors,
  Checkbox,
  List,
} from "react-native-paper";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../store/redux/userdata-context";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { SelectedExpense } from "../../shared/interface/Interface";

export type Props = {
  open : boolean,
  closeModal : () => void,
  isEditMode : boolean,
  selectedExpense : SelectedExpense
}

const AddNewExpenseModal : React.FC<Props> = ({
  open,
  closeModal,
  isEditMode,
  selectedExpense,
}) => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [isIncome, setisIncome] = useState(false);
  const containerStyle = { backgroundColor: MD3Colors.primary95, padding: 20, borderRadius : 20 };
  const userDataCtx = useContext(UserDataContext);

  useEffect(() => {
    if (isEditMode && open) {
      setExpenseName(selectedExpense.item.name);
      setExpenseAmount(selectedExpense.item.amount.toString());
    } else {
      setExpenseName("");
      setExpenseAmount("");
    }
    setisIncome(false);
  }, [open]);

  const addExpenseHandler = () => {
    if (!isNaN(+expenseAmount) && expenseName.length > 2 && +expenseAmount > 0) {
      let expenseItem = {
        name: expenseName,
        amount: +expenseAmount,
        isIncome: isIncome,
        date: new Date().toISOString(),
      };

      if (!isEditMode) {
        userDataCtx.addExpense(expenseItem);
      } else {
        let newExpense = { ...selectedExpense, item: expenseItem };
        userDataCtx.updateExpense(newExpense);
      }
      closeModal();
    } else {
      ToastAndroid.show("Amount should be numbers", 4000);
    }
  };

  return (
    <Portal>
      <Modal
        style={styles.modal}
        visible={open}
        dismissable={false}
        onDismiss={closeModal}
        contentContainerStyle={containerStyle}
      >
        <Text style={styles.title}>Add Expense</Text>
        <TextInput
          onChangeText={setExpenseName}
          value={expenseName}
          mode="flat"
          dense={true}
          label="Name"
          style={{ marginBottom: 15 }}
        />
        <TextInput
          onChangeText={setExpenseAmount}
          value={expenseAmount}
          mode="flat"
          dense={true}
          label="Amount"
          keyboardType="number-pad"
          style={{ marginBottom: 15 }}
        />
        {!isEditMode && <List.Item
          title="Mark as Income"
          right={(props) => (
            <Checkbox
              status={isIncome ? "checked" : "unchecked"}
              onPress={() => {
                setisIncome(!isIncome);
              }}
            />
          )}
        />}

        <View style={styles.btnContainer}>
          <Button
            style={{ marginHorizontal: 10 }}
            mode="text"
            compact={true}
            onPress={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            compact={true}
            mode="contained-tonal"
            onPress={addExpenseHandler}
          >
            {isEditMode ? "Update" : "Add Expense"}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddNewExpenseModal;

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  title: {
    marginBottom: 15,
    fontSize: 15,
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
  },
});
