import { Text } from "native-base";

const WelcomeTitle = (props) => {
  return (
    <Text fontSize={20} letterSpacing={1.5} fontWeight={"bold"}>
      Welcome, <Text color={"primary.700"}>{props.name}</Text>
    </Text>
  );
};

export default WelcomeTitle;
