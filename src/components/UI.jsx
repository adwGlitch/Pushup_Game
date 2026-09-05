import React from 'react';
import { useGame } from '../GameState';
import { regions } from '../gameData';

export const MainMenu = () => {
  const { navigate } = useGame();
  
  return (
    <div className="screen-container fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '40px' }}>
        RISE OF THE <br/><span className="gold-text">REPBORN</span>
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '250px' }}>
        <button onClick={() => navigate('STORY')}>Continue Journey</button>
        <button onClick={() => navigate('MAP')}>World Map</button>
        <button onClick={() => alert('Profile coming soon')}>Character</button>
      </div>
    </div>
  );
};

export const StoryIntro = () => {
  const { navigate } = useGame();
  
  return (
    <div className="screen-container fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px' }}>
      <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: '30px' }}>
        "A mysterious Rift has opened above the kingdom of Aetheria.<br/>
        Monsters are emerging from it.<br/><br/>
        Ancient records describe a warrior called the Repborn,<br/>
        whose physical strength becomes supernatural power."
      </p>
      
      <button onClick={() => navigate('MAP')}>Enter the World</button>
    </div>
  );
};

export const WorldMap = () => {
  const { navigate, startEncounter } = useGame();
  const region = regions[0]; // Hardcoding to first region for Phase 1
  
  return (
    <div className="screen-container fade-in">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>{region.name}</h2>
      
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h4 style={{ marginBottom: '10px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>Encounters</h4>
        {region.encounters.map(enc => (
          <div key={enc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #222' }}>
            <span style={{ fontFamily: 'var(--font-display)' }}>
              {enc.type === 'boss' ? <span className="gold-text">👑 {enc.name}</span> : enc.name}
            </span>
            <button style={{ padding: '8px 16px', fontSize: '12px' }} onClick={() => startEncounter(enc)}>
              FIGHT
            </button>
          </div>
        ))}
      </div>
      
      <button onClick={() => navigate('MAIN_MENU')} style={{ marginTop: 'auto' }}>Back to Menu</button>
    </div>
  );
};
