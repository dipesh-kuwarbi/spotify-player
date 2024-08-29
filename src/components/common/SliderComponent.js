import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

export const SliderComponent = ({ value, max, onChange, hoverColor }) => (
  <Slider
    aria-label="time-slider"
    defaultValue={value}
    min={0}
    max={max}
    step={1}
    onChange={onChange}
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
);
