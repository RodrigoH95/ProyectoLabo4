import { Card, Flex, Text } from "@tremor/react";

export const MessageCard = ({ message, children }) => {
  return (
    <Card className="w-full max-w-xl my-8 mx-auto">
      <Text className="text-center text-xl">{message}</Text>
      <Flex className="justify-center items-center flex-col mt-6">
        {children}
      </Flex>
    </Card>
  );
};
