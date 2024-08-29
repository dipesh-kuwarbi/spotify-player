import React from "react";
import { Flex } from "@chakra-ui/react";
import { Logo } from "../icons";

const Sidebar = () => {
  return (
    <Flex width={{ base: "100%", md: "10%" }}>
      <Flex w="100%" mt="8px" p="4">
        <Logo w="133px" h="40px" color="white" />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
