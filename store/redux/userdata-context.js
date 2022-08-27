import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

export const UserDataContext = createContext({
  username: "Krish",
  expenseList: [],
  expenseDetails: { spent: 0, saving: 0 },
  addExpense: (exp) => {},
  removeExpense: (idx) => {},
  updateExpense: (exp, idx) => {},
});

const UserDataContextProvider = ({ children }) => {
  const [expenseList, updateExpenseList] = useState([]);
  const [expenseDetails, setExpenseDetails] = useState({
    spent: 0,
    saving: 0,
  });

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
        income: 25000,
      };
      updateExpenseList((curList) => [newExp, ...curList]);
    } else {
      let curList = [...expenseList];
      curList[0].expList.unshift(exp);
      updateExpenseList(curList);
    }
    ToastAndroid.show(`${exp.name} added`, 4000);
  };

  const removeExpense = (selectedExp) => {
    let expName = selectedExp.item.name;
    let current = [...expenseList];
    current[selectedExp.mainIdx].expList.splice(selectedExp.index, 1);
    updateExpenseList(current);

    ToastAndroid.show(`${expName} deleted`, 4000);
  };

  const updateExpense = (newExpense) => {
    let current = [...expenseList];
    current[newExpense.mainIdx].expList.splice(
      newExpense.index,
      1,
      newExpense.item
    );

    updateExpenseList(current);

    ToastAndroid.show(`Expense updated`, 4000);
  };

  const updateState = () => {
    const obj = {
      spent: 0,
      saving: expenseList[0]?.income || 0,
    };
    if (expenseList.length > 0 && expenseList[0].expList.length > 0) {
      let temp = { ...expenseList[0] };
      temp.expList?.forEach((exp) => (obj.spent += exp.amount));
      obj.saving = +temp.income - +obj.spent;
    }
    setExpenseDetails(obj);
    _setUserDataToStorage();
  };

  const value = {
    username: "Krish",
    expenseList: expenseList,
    expenseDetails: expenseDetails,
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
