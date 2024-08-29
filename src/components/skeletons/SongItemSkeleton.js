import React from "react";
import { Box, Skeleton, HStack, SkeletonText } from "@chakra-ui/react";

const SongItemSkeleton = () => {
  return (
    <HStack
      padding="10px"
      cursor="pointer"
      alignItems="center"
      spacing="3"
      transition="background-color 0.3s ease"
    >
      <Skeleton boxSize="50px" borderRadius="md" />
      <Box ml="3" flex="1">
        <SkeletonText
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          width="100px"
          mb="8px"
        />
        <SkeletonText
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          width="150px"
        />
      </Box>
      <SkeletonText
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        width="40px"
        ml="auto"
      />
    </HStack>
  );
};

export default SongItemSkeleton;
