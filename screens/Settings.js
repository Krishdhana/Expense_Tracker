import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  BackHandler,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { useContext, useState } from "react";

import Wrapper from "../components/shared/Wrapper";
import { UserDataContext } from "../store/redux/userdata-context";

const Settings = () => {
  const clearAppData = async () => {
    await AsyncStorage.removeItem("userData");
    BackHandler.exitApp();
  };

  const UserDataCtx = useContext(UserDataContext);
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(UserDataCtx.userInfo?.name);
  const [role, setRole] = useState(UserDataCtx.userInfo?.role);
  const [income, setIncome] = useState(UserDataCtx.userInfo?.income || 0);
  const [balance, setBalance] = useState(
    UserDataCtx.expenseList[0]?.balance || 0
  );

  const updateUserData = () => {
    let obj = {
      name: name,
      role: role,
      income: +income,
      balance: +balance,
    };
    UserDataCtx.updateUserInfo(obj);
    setEditMode(false);

    ToastAndroid.show("User details Updated !", 5000);
  };

  return (
    <Wrapper>
      <View>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Text style={{ fontSize: 16 }}>User Details</Text>
            {!isEditMode && (
              <IconButton
                icon="account-edit-outline"
                size={20}
                onPress={() => setEditMode(true)}
              />
            )}
          </View>
          <TextInput
            style={styles.textInput}
            disabled={!isEditMode}
            mode="flat"
            label="Name"
            value={name}
            onChangeText={setName}
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            value={role}
            onChangeText={setRole}
            label="Role"
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            label="Income"
            value={income.toString()}
            keyboardType="numeric"
            onChangeText={setIncome}
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            keyboardType="numeric"
            label="Balance"
            value={balance.toString()}
            onChangeText={setBalance}
            dense={true}
          />
          <View style={styles.btnContainer}>
            {isEditMode && (
              <Button mode="contained-tonal" onPress={updateUserData}>
                Update
              </Button>
            )}
            <Button
              style={{ marginTop: 20 }}
              onPress={clearAppData}
              icon={"close-circle-outline"}
              mode={"text"}
            >
              Reset App
            </Button>
          </View>
        </View>
      </View>
    </Wrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
  },
  flex: {
    display: "flex",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
  },
  btnContainer: {
    width: "40%",
    marginHorizontal: "30%",
    marginTop: 20,
  },
});
