import React from 'react';
import { useGame } from '../GameState';

export const VictoryScreen = () => {
  const { battleResult, navigate, activeEncounter } = useGame();
  
  return (
    <div className="screen-container fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 className="gold-text">VICTORY</h1>
      <h3 style={{ marginBottom: '30px', color: 'var(--color-text-muted)' }}>THE {activeEncounter.name.toUpperCase()} HAS FALLEN</h3>
      
      <div className="panel" style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>XP GAINED</span>
          <span className="gold-text">+{battleResult.xp} XP</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>GOLD GAINED</span>
          <span className="gold-text">+{battleResult.gold}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>REPS PERFORMED</span>
          <span>{battleResult.pushups}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>BEST STREAK</span>
          <span className="gold-text">🔥 {battleResult.bestStreak}</span>
        </div>
      </div>
      
      <button style={{ marginTop: '30px' }} onClick={() => navigate('MAP')}>Continue</button>
    </div>
  );
};

export const DefeatScreen = () => {
  const { battleResult, navigate, activeEncounter } = useGame();
  
  return (
    <div className="screen-container fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--color-text-muted)' }}>THE DARKNESS REMAINS...</h1>
      <p style={{ margin: '20px 0', color: 'var(--color-red-bright)' }}>The {activeEncounter.name} regenerated.</p>
      
      <div className="panel" style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>REPS PERFORMED</span>
          <span>{battleResult.pushups}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>BEST STREAK</span>
          <span className="gold-text">🔥 {battleResult.bestStreak}</span>
        </div>
      </div>
      
      <p style={{ fontStyle: 'italic', margin: '20px 0 30px' }}>"Train. Return. Finish the fight."</p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate('MAP')}>Return to Camp</button>
      </div>
    </div>
  );
};
