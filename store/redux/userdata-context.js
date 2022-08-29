import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

export const UserDataContext = createContext({
  userInfo: {
    name: "",
    role: "",
    income: "",
  },
  expenseList: [],
  updateUserInfo: (userObj) => {},
  addExpense: (exp) => {},
  removeExpense: (idx) => {},
  updateExpense: (exp, idx) => {},
});

const UserDataContextProvider = ({ children }) => {
  const [expenseList, setExpenseList] = useState([
    {
      month: moment().format("MMMM"),
      expList: [],
      balance: +userInfo?.balance || +userInfo?.salary || 0,
    },
  ]);

  const addExpense = (exp) => {
    if (expenseList[0].month != moment().format("MMMM")) {
      let newExp = {
        month: moment().format("MMMM"),
        expList: [exp],
        balance: +userInfo.balance || 25000,
      };
      calcualteAndUpdateExpList([newExp, ...expenseList]);
    } else {
      const curList = [...expenseList];
      curList[0].expList.unshift(exp);

      calcualteAndUpdateExpList(curList);
    }
    ToastAndroid.show(`${exp.name} added`, 4000);
  };

  const removeExpense = (selectedExp) => {
    let expName = selectedExp.item.name;
    let current = [...expenseList];
    current[selectedExp.mainIdx].expList.splice(selectedExp.index, 1);

    let balance = current[selectedExp.mainIdx].balance || userInfo.balance;
    selectedExp.isIncome
      ? (balance -= +selectedExp.item.amount)
      : (balance += +selectedExp.item.amount);
    current[selectedExp.mainIdx].balance = balance;
    calcualteAndUpdateExpList(current, selectedExp.mainIdx);

    ToastAndroid.show(`${expName} deleted`, 4000);
  };

  const updateExpense = (newExpense) => {
    let current = [...expenseList];
    current[newExpense.mainIdx].expList.splice(
      newExpense.index,
      1,
      newExpense.item
    );
    calcualteAndUpdateExpList(current, newExpense.mainIdx);

    ToastAndroid.show(`Expense updated`, 4000);
  };

  const [userInfo, setUserInfo] = useState({
    name: "",
    role: "",
    income: userInfo?.balance || 0,
    balance: expenseList[0]?.balance || 0,
  });

  const updateUserInfo = (userObj) => {
    setUserInfo(userObj);
    const currentExp = [...expenseList];
    currentExp[0].balance = userObj.balance;
    setExpenseList(currentExp);
  };

  const calcualteAndUpdateExpList = (expenseList, updateIndex = 0) => {
    let temp = { ...expenseList[updateIndex], income: 0, spent: 0 };
    if (temp.expList?.length > 0) {
      temp.expList?.forEach((exp) => {
        if (exp.isIncome) {
          temp.income += exp.amount;
          temp.balance += exp.amount;
        } else {
          temp.spent += exp.amount;
          temp.balance -= exp.amount;
        }
      });
    }
    let updatedList = [...expenseList];
    updatedList.splice(updateIndex, 1, temp);
    setExpenseList(updatedList);
  };

  const _getUserDataFromStorage = async () => {
    let rawData = await AsyncStorage.getItem("userData");
    let jsoned = JSON.parse(rawData);
    if (jsoned) {
      updateUserInfo(jsoned.userInfo);
      setExpenseList(jsoned.expenseList);
    }
  };

  useEffect(() => {
    _getUserDataFromStorage();
  }, []);

  useEffect(() => {
    console.log(expenseList[0]);
    _setUserDataToStorage();
  }, [expenseList, userInfo]);

  const _setUserDataToStorage = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(value));
    } catch (e) {}
  };

  const value = {
    userInfo: userInfo,
    expenseList: expenseList,
    updateUserInfo: updateUserInfo,
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
