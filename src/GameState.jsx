import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [screen, setScreen] = useState('MAIN_MENU'); // MAIN_MENU, STORY, MAP, BATTLE, VICTORY, DEFEAT
  const [playerStats, setPlayerStats] = useState({
    level: 1,
    xp: 0,
    gold: 0,
    totalPushups: 0,
    bestStreak: 0,
    monstersDefeated: 0,
    bossesDefeated: 0,
  });
  
  const [activeEncounter, setActiveEncounter] = useState(null);
  const [battleResult, setBattleResult] = useState(null); // stores details of last battle

  // Load from local storage eventually, simple state for now
  
  const navigate = (newScreen) => setScreen(newScreen);
  
  const startEncounter = (encounter) => {
    setActiveEncounter(encounter);
    navigate('BATTLE');
  };

  const endBattle = (result, stats) => {
    setBattleResult({ result, ...stats });
    
    if (result === 'VICTORY') {
      setPlayerStats(prev => ({
        ...prev,
        xp: prev.xp + (stats.xp || 10),
        gold: prev.gold + (stats.gold || 5),
        totalPushups: prev.totalPushups + stats.pushups,
        bestStreak: Math.max(prev.bestStreak, stats.bestStreak),
        monstersDefeated: prev.monstersDefeated + 1,
      }));
      navigate('VICTORY');
    } else {
      setPlayerStats(prev => ({
        ...prev,
        totalPushups: prev.totalPushups + stats.pushups,
        bestStreak: Math.max(prev.bestStreak, stats.bestStreak),
      }));
      navigate('DEFEAT');
    }
  };

  return (
    <GameContext.Provider value={{
      screen, navigate,
      playerStats,
      activeEncounter, startEncounter,
      endBattle, battleResult
    }}>
      {children}
    </GameContext.Provider>
  );
};
