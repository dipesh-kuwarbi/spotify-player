import React from "react";
import {
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Box,
} from "@chakra-ui/react";
import { IconButtonComponent } from "../common/IconButtonComponent";
import { ArrowIcon, PauseIcon, ThreeDotIcon } from "../../icons";
import { FaPlay } from "react-icons/fa";
import VolumeControl from "./VolumeControl";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

const PlayerControls = ({
  currentTime,
  duration,
  hoverColor,
  isPlaying,
  togglePlayPause,
  handleSliderChange,
  audioRef,
  song,
  onClick,
}) => (
  <>
    <Box mb="1" w={{ base: "340px", md: "360px", lg: "490px" }}>
      <Slider
        aria-label="time-slider"
        value={currentTime}
        min={0}
        max={Math.floor(duration)}
        step={1}
        onChange={handleSliderChange}
        w="100%"
      >
        <SliderTrack bgColor={hoverColor} borderRadius="md">
          <SliderFilledTrack bgColor="white" borderRadius="md" />
        </SliderTrack>
        <SliderThumb
          boxSize="12px"
          bg="white"
          borderRadius="full"
          _focus={{ boxShadow: "none" }}
          transition="background 0.3s ease"
        />
      </Slider>
      <Flex justifyContent="space-between" mt="1">
        <Text color="white" fontSize="sm">
          {formatTime(currentTime)}
        </Text>
        <Text color="white" fontSize="sm">
          {formatTime(duration)}
        </Text>
      </Flex>
    </Box>

    <Flex
      direction="row"
      w={{ base: "340px", md: "360px", lg: "480px" }}
      justifyContent="space-between"
      alignItems="center"
    >
      <IconButtonComponent
        icon={<ThreeDotIcon name="more" color="white" />}
        ariaLabel="More Options"
        bgColor="gray.700"
        hoverColor={hoverColor}
      />

      <Flex justifyContent="space-between">
        <IconButtonComponent
          icon={<ArrowIcon name="previous" />}
          ariaLabel="Previous"
          bgColor="transparent"
          hoverColor={hoverColor}
          onClick={() => onClick("previous", song?.id)}
          mr="6px"
        />
        <IconButtonComponent
          icon={
            isPlaying ? (
              <PauseIcon name="pause" color="white" />
            ) : (
              <FaPlay name="play" color="white" />
            )
          }
          ariaLabel="Play/Pause"
          bgColor="gray.700"
          hoverColor={hoverColor}
          onClick={togglePlayPause}
          mr="6px"
        />
        <IconButtonComponent
          icon={
            <ArrowIcon name="next" style={{ transform: "rotate(180deg)" }} />
          }
          ariaLabel="Next"
          bgColor="transparent"
          hoverColor={hoverColor}
          onClick={() => onClick("next", song?.id)}
        />
      </Flex>

      <VolumeControl audioRef={audioRef} hoverColor={hoverColor} />
    </Flex>
  </>
);

export default PlayerControls;
