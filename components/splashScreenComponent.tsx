import { Image } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, { FadeOut, FadeIn, ZoomIn } from "react-native-reanimated";

const SplashScreenComponent = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds splash

    return () => clearTimeout(timeout);
  }, []);

  if (!showSplash) return null;

  return (
    <Animated.View
      className="flex-1 items-center justify-center"
      exiting={FadeOut.duration(800)}
    >
      <Animated.View entering={ZoomIn.duration(800)}>
        <Image
          source={require("@/assets/images/wallet.png")}
          style={{ width: 70, height: 70 }}
        />
      </Animated.View>

      <Animated.Text
        entering={FadeIn.delay(800).duration(800)}
        className="text-3xl font-bold mt-5"
      >
        ExpenseMate
      </Animated.Text>

      <Animated.Text
        entering={FadeIn.delay(1200).duration(800)}
        className="text-base mt-2"
      >
        Track. Save. Succeed.
      </Animated.Text>
    </Animated.View>
  );
};

export default SplashScreenComponent;
