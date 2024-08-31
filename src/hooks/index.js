import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { FastAverageColor } from "fast-average-color";
import tinycolor from "tinycolor2"; // For adjusting color brightness

export const useToastNotification = () => {
  const toast = useToast();

  const showToast = (title, description, status = "info") => {
    toast({
      title: title,
      description: description,
      status: status, // "info", "warning", "success", or "error"
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return { showToast };
};

export const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${endpoint}`
        );

        // Handle various status codes
        if (response.status >= 200 && response.status < 300) {
          setData(response.data.data);
          setError(null);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        // Handle network or other errors
        console.debug("err", err);
        if (err.response) {
          // Server responded with a status other than 200-299
          setError(
            `Error: ${err.response.status} - ${err.response.data.errors[0].message}`
          );
        } else if (err.request) {
          // Request was made but no response received
          setError("Error: No response received from server");
        } else {
          // Something else caused the error
          setError(`Error: ${err.message}`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
};

export const useBackgroundGradient = (coverImageId) => {
  const [backgroundGradient, setBackgroundGradient] = useState(null);
  const [hoverColor, setHoverColor] = useState("rgba(255, 255, 255, 0.2)"); // Default hover color

  useEffect(() => {
    if (coverImageId) {
      const fac = new FastAverageColor();
      const coverImageUrl = `https://cms.samespace.com/assets/${coverImageId}`;

      fac
        .getColorAsync(coverImageUrl)
        .then((color) => {
          const darkerShade = tinycolor(color.rgba).darken(10).toRgbString(); // Darken by 10%
          setBackgroundGradient(
            `linear-gradient(to-r, ${color.rgba}, rgba(0, 0, 0, 0.9))`
          );
          setHoverColor(darkerShade); // Set hover color
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [coverImageId]);

  return { backgroundGradient, hoverColor };
};

export const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedCallback;
};
