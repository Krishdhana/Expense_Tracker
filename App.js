import { Box, NativeBaseProvider } from "native-base";
import { LinearGradient } from "react-native-svg";
import Home from "./screens/Home";

const config = {
  dependencies: {
    "linear-gradient": LinearGradient,
  },
};

export default function App() {
  return (
    <NativeBaseProvider config={config}>
      <Box py={10} px={5} flex="1" paddingTop={30}>
        <Home></Home>
      </Box>
    </NativeBaseProvider>
  );
}
