import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

export const UserDataContext = createContext({
  username: "Krish",
  expenseList: [],
  totalExpenseAmount: 0,
  addExpense: (exp) => {},
  removeExpense: (idx) => {},
  updateExpense: (exp, idx) => {},
});

const UserDataContextProvider = ({ children }) => {
  const [expenseList, updateExpenseList] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  useEffect(() => {
    _getUserDataFromStorage();
  }, []);

  useEffect(() => {
    updateState();
  }, [expenseList]);

  const _getUserDataFromStorage = async () => {
    let rawData = await AsyncStorage.getItem("userData");
    let jsoned = JSON.parse(rawData);

    if (jsoned) {
      updateExpenseList(jsoned.expenseList);
      setTotalExpenseAmount(jsoned.totalExpenseAmount);
      value.username = jsoned.username;
    }
  };

  const _setUserDataToStorage = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(value));
    } catch (e) {}
  };

  const addExpense = (exp) => {
    if (
      !expenseList.length ||
      expenseList[0].month != moment().format("MMMM")
    ) {
      let newExp = {
        month: moment().format("MMMM"),
        expList: [exp],
      };
      updateExpenseList((curList) => [newExp, ...curList]);
    } else {
      let curList = [...expenseList];
      curList[0].expList.unshift(exp);
    }
    ToastAndroid.show(`${exp.name} added`, 4000);
  };

  const removeExpense = (idx) => {
    let expName = expenseList[idx].name;
    let current = [...expenseList];
    current.splice(idx, 1);
    updateExpenseList(current);

    ToastAndroid.show(`${expName} deleted`, 4000);
  };

  const updateState = () => {
    let amount = 0;
    if (expenseList.length > 1) {
      expenseList.forEach((exp) => (amount += exp.amount));
    } else {
      amount = expenseList[0]?.amount || 0;
    }
    setTotalExpenseAmount(amount);
    _setUserDataToStorage();
  };

  const updateExpense = (exp, idx) => {
    let current = [...expenseList];
    current.splice(idx, 1, exp);

    updateExpenseList(current);

    ToastAndroid.show(`Expense updated`, 4000);
  };

  const value = {
    username: "Krish",
    expenseList: expenseList,
    totalExpenseAmount: totalExpenseAmount,
    addExpense: addExpense,
    updateExpense: updateExpense,
    removeExpense: removeExpense,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
