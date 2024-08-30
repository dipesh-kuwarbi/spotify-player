import { Tabs, Tab, TabList } from "@chakra-ui/react";
import React from "react";

const tabs = ["For You", "Top Tracks"];

const SongTabs = ({ onTabChange }) => (
  <Tabs onChange={onTabChange} mb="2">
    <TabList borderBottom="none" gap="4">
      {tabs.map((label) => (
        <Tab
          key={label}
          color="gray.400"
          fontSize="20px"
          fontWeight={800}
          sx={{
            _active: { bgColor: "transparent" },
            _selected: { color: "white", transform: "scale(1.05)" },
          }}
          transition="all 0.2s"
          pl="0px"
        >
          {label}
        </Tab>
      ))}
    </TabList>
  </Tabs>
);

export default SongTabs;
