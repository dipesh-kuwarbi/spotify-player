import { IconButton } from "@chakra-ui/react";

export const IconButtonComponent = ({
  icon,
  ariaLabel,
  onClick,
  bgColor,
  hoverColor,
  ...rest
}) => (
  <IconButton
    icon={icon}
    aria-label={ariaLabel}
    borderRadius="full"
    bgColor={bgColor}
    color="white"
    _hover={{ bgColor: hoverColor, transform: "scale(1.1)" }}
    transition="transform 0.3s ease, bg-color 0.3s ease"
    onClick={onClick}
    {...rest}
  />
);
