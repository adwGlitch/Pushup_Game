import React, { useState, useEffect } from 'react';
import { useGame } from '../GameState';

export const BattleScreen = () => {
  const { activeEncounter, endBattle } = useGame();
  
  const [timeLeft, setTimeLeft] = useState(activeEncounter.timeLimit);
  const [monsterHp, setMonsterHp] = useState(activeEncounter.hp);
  
  const [pushups, setPushups] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  
  const [isHit, setIsHit] = useState(false);
  const [attackMsg, setAttackMsg] = useState('');

  useEffect(() => {
    if (timeLeft <= 0) {
      endBattle('DEFEAT', { pushups, bestStreak });
      return;
    }
    
    if (monsterHp <= 0) {
      endBattle('VICTORY', { 
        pushups, 
        bestStreak, 
        xp: activeEncounter.type === 'boss' ? 100 : 20, 
        gold: activeEncounter.type === 'boss' ? 50 : 10 
      });
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, monsterHp, endBattle, activeEncounter, pushups, bestStreak]);

  const handleSimulateRep = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    setPushups(prev => prev + 1);
    if (newStreak > bestStreak) setBestStreak(newStreak);
    
    // Calculate damage based on streak
    let damage = 1;
    let msg = 'BASIC STRIKE';
    
    if (newStreak >= 20) { damage = 4; msg = 'CRITICAL STRIKE'; }
    else if (newStreak >= 10) { damage = 3; msg = 'POWER STRIKE'; }
    else if (newStreak >= 5) { damage = 2; msg = 'HEAVY STRIKE'; }
    
    setAttackMsg(msg);
    setMonsterHp(prev => Math.max(0, prev - damage));
    
    // Trigger animations
    setIsHit(true);
    setTimeout(() => setIsHit(false), 500);
  };

  const handleBreakStreak = () => {
    setStreak(0);
    setAttackMsg('STREAK BROKEN');
  };

  return (
    <div className="screen-container fade-in">
      {/* Top HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 className={activeEncounter.type === 'boss' ? 'gold-text' : ''}>
            {activeEncounter.name}
          </h2>
          <div style={{ fontSize: '24px', color: 'var(--color-red-bright)' }}>HP {monsterHp}</div>
        </div>
        <div style={{ fontSize: '32px', fontFamily: 'var(--font-display)', color: timeLeft <= 10 ? 'var(--color-red-bright)' : 'var(--color-text)' }}>
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
      </div>

      {/* Battlefield (Center) */}
      <div className={`panel ${isHit ? 'shake' : ''}`} style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        background: 'linear-gradient(to bottom, rgba(20,20,30,0.8), rgba(5,5,10,0.9))',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract Monster Placeholder */}
        <div style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: isHit ? 'var(--color-red-bright)' : 'var(--color-border)',
          boxShadow: isHit ? '0 0 50px red' : '0 0 20px black',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '48px' }}>{activeEncounter.type === 'boss' ? '🐺' : '👹'}</span>
        </div>
        
        {/* Attack Message */}
        <div style={{ 
          position: 'absolute', 
          top: '20px', 
          color: 'var(--color-gold)', 
          fontFamily: 'var(--font-display)',
          fontSize: '24px',
          textShadow: '0 0 10px black',
          opacity: attackMsg ? 1 : 0,
          transition: 'opacity 0.2s'
        }}>
          {attackMsg}
        </div>
      </div>

      {/* Player HUD / Camera Mock (Bottom) */}
      <div className="panel" style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: 'rgba(5,5,5,0.9)', borderTop: '2px solid var(--color-gold-dim)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>CAMERA MOCK - TRAINING MODE</div>
            <div style={{ fontSize: '18px' }}>Reps: {pushups}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--color-gold-dim)' }}>BEST: {bestStreak}</div>
            <div style={{ fontSize: '28px', color: 'var(--color-gold)', fontFamily: 'var(--font-display)' }}>
              🔥 STREAK × {streak}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ flex: 1, padding: '20px', fontSize: '20px', border: '1px solid var(--color-green)' }} onClick={handleSimulateRep}>
            SIMULATE REP (UP/DOWN)
          </button>
          <button style={{ background: 'var(--color-red-hp)', border: 'none' }} onClick={handleBreakStreak}>
            BREAK STREAK
          </button>
        </div>
      </div>
    </div>
  );
};
