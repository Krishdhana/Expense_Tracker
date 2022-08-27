import { Box, Text } from "native-base";
import ExpenseList from "../components/Home/Expense/ExpenseList";
import Wrapper from "../components/shared/Wrapper";

const ExpenseScreen = () => {
  return (
    <Wrapper>
      <Box>
        <Text fontWeight={"bold"} color={"primary.600"} fontSize={20} mb={5}>
          Expenses
        </Text>
        <ExpenseList onClickExpenseItem={(exp) => {}} />
      </Box>
    </Wrapper>
  );
};

export default ExpenseScreen;
