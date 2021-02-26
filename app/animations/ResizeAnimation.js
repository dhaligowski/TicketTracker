import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Platform,
  StatusBar,
  Keyboard,
  Animated,
  Dimensions,
} from "react-native";
import colors from "../config/colors";

const LOGO_HEIGHT_LARGE = 200;
const LOGO_HEIGHT_SMALL = 50;
const LOGO_WIDTH_LARGE = 200;
const LOGO_WIDTH_SMALL = 50;
const LOGO_TEXT_LARGE = 125;
const LOGO_TEXT_SMALL = 35;
const animationDuration = 500;
const windowWidth = Dimensions.get("window").width;

function ResizeAnimation() {
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [logoHeight] = useState(new Animated.Value(LOGO_HEIGHT_LARGE));
  const [logoWidth] = useState(new Animated.Value(LOGO_WIDTH_LARGE));
  const [textSize] = useState(new Animated.Value(LOGO_TEXT_LARGE));

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: animationDuration, //event.duration
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }),
      Animated.timing(logoHeight, {
        duration: animationDuration,
        toValue: LOGO_HEIGHT_SMALL,
        useNativeDriver: false,
      }),
      Animated.timing(logoWidth, {
        duration: animationDuration,
        toValue: windowWidth * 0.85, ///LOGO_WIDTH_SMALL, //
        useNativeDriver: false,
      }),
      Animated.timing(textSize, {
        duration: animationDuration,
        toValue: LOGO_TEXT_SMALL,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const _keyboardDidHide = () => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: animationDuration, //keep inline, not event.duration
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(logoHeight, {
        duration: animationDuration,
        toValue: LOGO_HEIGHT_LARGE,
        useNativeDriver: false,
      }),
      Animated.timing(logoWidth, {
        duration: animationDuration,
        toValue: LOGO_WIDTH_LARGE,
        useNativeDriver: false,
      }),
      Animated.timing(textSize, {
        duration: animationDuration,
        toValue: LOGO_TEXT_LARGE,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.Text
      style={[
        styles.logoText,
        {
          height: logoHeight,
          width: logoWidth,
          fontSize: textSize,
          marginBottom: 5,
        },
      ]}
    >
      tt
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    //alignItems: "center",
    //justifyContent: "space-evenly",
  },
  form: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logoText: {
    textAlign: "center",
    //fontSize: 150,
    fontWeight: "bold",
    color: colors.white,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    //alignSelf: "center",
    //height: 225,
    // width: 225,
  },
});

export default ResizeAnimation;
