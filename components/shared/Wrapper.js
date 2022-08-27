import { Box } from "native-base";

const Wrapper = ({ children }) => {
  return (
    <Box px={5} flex="1" marginTop={5}>
      {children}
    </Box>
  );
};

export default Wrapper;
