import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button } from "native-base";
import { BackHandler } from "react-native";
import Wrapper from "../components/shared/Wrapper";

const Settings = () => {
  const clearAppData = async () => {
    await AsyncStorage.removeItem("userData");
    BackHandler.exitApp();
  };

  return (
    <Wrapper>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Button onPress={clearAppData} variant="outline">
          Clear Data
        </Button>
      </Box>
    </Wrapper>
  );
};

export default Settings;
