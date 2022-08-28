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
  expenseDetails: { spent: 0, saving: 0 },
  updateUserInfo: (userObj) => {},
  addExpense: (exp) => {},
  removeExpense: (idx) => {},
  updateExpense: (exp, idx) => {},
});

const UserDataContextProvider = ({ children }) => {
  const [expenseList, updateExpenseList] = useState([
    {
      month: moment().format("MMMM"),
      expList: [],
      balance: +userInfo?.income || 25000,
    },
  ]);

  const [expenseDetails, setExpenseDetails] = useState({
    spent: 0,
    saving: 0,
  });

  const addExpense = (exp) => {
    if (expenseList[0].month != moment().format("MMMM")) {
      let newExp = {
        month: moment().format("MMMM"),
        expList: [exp],
        balance: +userInfo.income || 25000,
      };
      updateExpenseList((curList) => [newExp, ...curList]);
    } else {
      const curList = [...expenseList];
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
    updateExpenseList(currentExp);
  };

  const updateState = () => {
    const obj = {
      spent: 0,
      saving: expenseList[0]?.balance || 0,
    };

    if (expenseList[0]?.expList.length > 0) {
      let temp = { ...expenseList[0] };
      temp.expList?.forEach((exp) => (obj.spent += exp.amount));
      obj.saving = +temp.balance - +obj.spent;
    }
    setExpenseDetails(obj);
    console.log(expenseList);
    _setUserDataToStorage();
  };

  const _getUserDataFromStorage = async () => {
    let rawData = await AsyncStorage.getItem("userData");
    let jsoned = JSON.parse(rawData);
    if (jsoned) {
      updateUserInfo(jsoned.userInfo);
      updateExpenseList(jsoned.expenseList);
    }
  };

  useEffect(() => {
    _getUserDataFromStorage();
  }, []);

  useEffect(() => {
    updateState();
  }, [expenseList]);

  const _setUserDataToStorage = async () => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(value));
    } catch (e) {}
  };

  const value = {
    userInfo: userInfo,
    expenseList: expenseList,
    expenseDetails: expenseDetails,
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
