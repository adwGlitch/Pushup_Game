import React from 'react';
import { useGame } from './GameState';
import { MainMenu, StoryIntro, WorldMap } from './components/UI';
import { BattleScreen } from './components/BattleScreen';
import { VictoryScreen, DefeatScreen } from './components/ResultsScreens';

function App() {
  const { screen } = useGame();

  return (
    <>
      {screen === 'MAIN_MENU' && <MainMenu />}
      {screen === 'STORY' && <StoryIntro />}
      {screen === 'MAP' && <WorldMap />}
      {screen === 'BATTLE' && <BattleScreen />}
      {screen === 'VICTORY' && <VictoryScreen />}
      {screen === 'DEFEAT' && <DefeatScreen />}
    </>
  );
}

export default App;
