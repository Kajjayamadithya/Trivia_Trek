/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef } from "react";

const SoundContext = createContext();

export function SoundProvider({ children }) {
  const audios = useRef({});

  useEffect(() => {
    const sounds = {
      click: "/assets/sounds/click.mp3",
      correct: "/assets/sounds/correct.mp3",
      wrong: "/assets/sounds/wrong.mp3",
    };

    // Preload all sounds
    Object.entries(sounds).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audios.current[key] = audio;
    });

    // Safe volume setting
    if (audios.current.click) audios.current.click.volume = 0.5;
    if (audios.current.correct) audios.current.correct.volume = 0.9;
    if (audios.current.wrong) audios.current.wrong.volume = 0.9;
  }, []);

  const play = (name) => {
    const audio = audios.current[name];
    if (!audio) return;

    try {
      audio.currentTime = 0;
      audio.play();
    } catch {
      // Ignored
    }
  };

  return (
    <SoundContext.Provider value={{ play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
