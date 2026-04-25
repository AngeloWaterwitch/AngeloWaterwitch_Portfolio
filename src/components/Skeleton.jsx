import React from 'react';

function SkeletonBox({ width, height, borderRadius, style }) {
  return (
    <div style={{
      width: width || '100%',
      height: height || '1rem',
      borderRadius: borderRadius || '2px',
      background: 'linear-gradient(90deg, var(--dark3) 25%, var(--dark4) 50%, var(--dark3) 75%)',
      backgroundSize: '200% 100%',
      animation: 'skeletonPulse 1.5s ease-in-out infinite',
      ...style,
    }} />
  );
}

export function HeroSkeleton() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
      paddingTop: 'clamp(5rem, 10vw, 8rem)',
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <SkeletonBox width="120px" height="12px" style={{ marginBottom: '1.5rem' }} />
        <SkeletonBox height="clamp(2.8rem, 10vw, 7rem)" style={{ marginBottom: '0.5rem' }} />
        <SkeletonBox width="70%" height="clamp(2.8rem, 10vw, 7rem)" style={{ marginBottom: '1.5rem' }} />
        <SkeletonBox width="80%" height="1rem" style={{ marginBottom: '0.5rem' }} />
        <SkeletonBox width="60%" height="1rem" style={{ marginBottom: '2.5rem' }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SkeletonBox width="140px" height="48px" />
          <SkeletonBox width="140px" height="48px" />
        </div>
      </div>
    </section>
  );
}

export function SectionSkeleton({ rows = 3 }) {
  return (
    <div style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <SkeletonBox width="100px" height="10px" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="300px" height="clamp(2rem, 5vw, 3.5rem)" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="3rem" height="2px" style={{ marginBottom: '2rem' }} />
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonBox
          key={i}
          width={i % 2 === 0 ? '100%' : '80%'}
          height="1rem"
          style={{ marginBottom: '0.8rem' }}
        />
      ))}
    </div>
  );
}

export function CardsSkeleton({ count = 4 }) {
  return (
    <div style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <SkeletonBox width="100px" height="10px" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="300px" height="clamp(2rem, 5vw, 3.5rem)" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="3rem" height="2px" style={{ marginBottom: '3rem' }} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
        gap: '1rem',
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--dark3)',
            border: '1px solid var(--dark4)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <SkeletonBox height="200px" borderRadius="0" />
            <div style={{ padding: '1.5rem' }}>
              <SkeletonBox width="60%" height="1.2rem" style={{ marginBottom: '0.8rem' }} />
              <SkeletonBox height="0.9rem" style={{ marginBottom: '0.4rem' }} />
              <SkeletonBox width="80%" height="0.9rem" style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <SkeletonBox width="60px" height="24px" />
                <SkeletonBox width="60px" height="24px" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillsSkeleton() {
  return (
    <div style={{
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 3rem)',
    }}>
      <SkeletonBox width="100px" height="10px" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="200px" height="clamp(2rem, 5vw, 3.5rem)" style={{ marginBottom: '1rem' }} />
      <SkeletonBox width="3rem" height="2px" style={{ marginBottom: '3rem' }} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(80px, 15vw, 120px), 1fr))',
        gap: '1rem',
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            background: 'var(--dark3)',
            border: '1px solid var(--dark4)',
            borderRadius: '2px',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <SkeletonBox width="2rem" height="2rem" borderRadius="4px" />
            <SkeletonBox width="60px" height="10px" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonBox;