import React from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

const MotionInput = motion(Input);

const SearchBar = ({ searchTerm, onSearch, hoverColor }) => (
  <InputGroup mb="4">
    <MotionInput
      placeholder="Search Song, Artist"
      value={searchTerm}
      onChange={onSearch}
      bg={hoverColor}
      color="white"
      sx={{
        _focus: { outline: "none", border: "2px solid white" },
        _hover: { outline: "none", border: "2px solid white" },
        _active: { outline: "none", border: "2px solid white" },
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      outline="none"
      border="none"
    />
    <InputRightElement>
      <IconButton
        icon={<SearchIcon />}
        aria-label="Search"
        variant="ghost"
        color="white"
        _hover={{ background: "none" }}
      />
    </InputRightElement>
  </InputGroup>
);

export default SearchBar;
