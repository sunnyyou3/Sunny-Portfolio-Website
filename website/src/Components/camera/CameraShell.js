import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * CameraShell component - the persistent DSLR body.
 * Includes: viewfinder, grip, seams, texture, and overall silhouette.
 */
const CameraShell = memo(function CameraShell({
  children,
  lcdOn,
  onMenuToggle,
  onInfoToggle,
  onPlayback,
  onBack,
  onUp,
  onDown,
  onLeft,
  onRight,
  onOk,
  onScroll,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#050508',
        overflow: 'hidden',
      }}
    >
      {/* Ambient light effect */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(20,20,30,0.8) 0%, #050508 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main camera body */}
      <Box
        sx={{
          position: 'relative',
          width: 'min(95vw, 1100px)',
          height: 'min(90vh, 700px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* ─── Top: Viewfinder housing ─── */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 0,
          }}
        >
          {/* Viewfinder housing - raised section */}
          <Box
            sx={{
              position: 'relative',
              width: '280px',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 15,
            }}
          >
            {/* Housing top */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(180deg, #1e1e23 0%, #16161a 100%)',
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
                borderBottom: '1px solid rgba(40,40,45,0.6)',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.3)',
              }}
            />

            {/* Eyecup */}
            <Box
              sx={{
                position: 'relative',
                width: '80px',
                height: '40px',
                borderRadius: '8px',
                background: 'radial-gradient(ellipse, #0a0a0c 0%, #111115 60%, #18181c 100%)',
                border: '3px solid #1a1a1e',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.5)',
                zIndex: 1,
              }}
            >
              {/* Eyepiece glass - white glossy center */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: '6px 20px',
                  borderRadius: '4px',
                  background: 'linear-gradient(135deg, rgba(200,200,210,0.15) 0%, rgba(100,100,110,0.08) 50%, rgba(200,200,210,0.12) 100%)',
                  border: '1px solid rgba(150,150,160,0.2)',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                }}
              >
                {/* Glossy reflection */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '2px',
                    left: '15%',
                    width: '70%',
                    height: '40%',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.25), transparent)',
                  }}
                />
              </Box>
            </Box>

            {/* Diopter adjustment wheel */}
            <Box
              sx={{
                position: 'absolute',
                right: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '14px',
                height: '28px',
                borderRadius: '3px',
                background: 'linear-gradient(180deg, #252528, #1a1a1e)',
                border: '1px solid rgba(50,50,55,0.5)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}
            >
              {/* Wheel ridges */}
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'rgba(60,60,65,0.4)',
                    top: `${(i + 1) * 18}%`,
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* ─── Middle: Body with LCD and controls ─── */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Main body - left side (flatter) */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 'calc(50% - 340px)',
              background: 'linear-gradient(90deg, #121216 0%, #16161a 100%)',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
              borderLeft: '1px solid rgba(35,35,40,0.5)',
              borderTop: '1px solid rgba(35,35,40,0.3)',
              borderBottom: '1px solid rgba(35,35,40,0.3)',
            }}
          />

          {/* Body texture overlay (left) */}
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 'calc(50% - 340px)',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'1\' height=\'1\' fill=\'rgba(255,255,255,0.015)\'/%3E%3C/svg%3E")',
              pointerEvents: 'none',
            }}
          />

          {/* Left side buttons: MENU and BACK */}
          <Box
            sx={{
              position: 'absolute',
              left: 'calc(50% - 360px)',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              zIndex: 20,
            }}
          >
            {/* MENU button */}
            <Box
              onClick={onMenuToggle}
              role="button"
              aria-label="MENU - Open section menu"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMenuToggle?.(); } }}
              sx={{
                width: 48,
                height: 28,
                borderRadius: '4px',
                background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                border: '1px solid rgba(60,60,65,0.5)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'rgba(246,244,239,0.7)',
                  letterSpacing: 0.5,
                }}
              >
                MENU
              </Typography>
            </Box>

            {/* BACK button */}
            <Box
              onClick={onBack}
              role="button"
              aria-label="BACK - Return to previous view"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onBack?.(); } }}
              sx={{
                width: 48,
                height: 28,
                borderRadius: '4px',
                background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                border: '1px solid rgba(60,60,65,0.5)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'rgba(246,244,239,0.7)',
                  letterSpacing: 0.5,
                }}
              >
                BACK
              </Typography>
            </Box>
          </Box>

          {/* LCD Screen area */}
          <Box
            sx={{
              position: 'relative',
              width: '680px',
              maxWidth: '60vw',
              height: 'calc(100% - 40px)',
              maxHeight: '600px',
              borderRadius: '4px',
              overflow: 'hidden',
              zIndex: 10,
              border: '2px solid rgba(30,30,35,0.8)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.2)',
            }}
          >
            {/* Screen bezel inner */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: lcdOn
                  ? 'linear-gradient(145deg, #0d0d12, #08080c)'
                  : '#050508',
                transition: 'background 0.8s ease',
              }}
            />

            {/* LCD content */}
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              {children}
            </Box>

            {/* Screen glow effect when on */}
            {lcdOn && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(30,40,60,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            )}
          </Box>

          {/* Body - right side (with grip and controls) */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 'calc(50% - 20px)',
              background: 'linear-gradient(270deg, #141418 0%, #16161a 100%)',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              borderRight: '1px solid rgba(35,35,40,0.5)',
              borderTop: '1px solid rgba(35,35,40,0.3)',
              borderBottom: '1px solid rgba(35,35,40,0.3)',
            }}
          />

          {/* Right grip area */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '10%',
              bottom: '10%',
              width: '80px',
              background: 'linear-gradient(270deg, #1a1a1e 0%, #141418 100%)',
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              borderRight: '2px solid rgba(40,40,45,0.6)',
              boxShadow: 'inset 4px 0 15px rgba(0,0,0,0.3)',
            }}
          />

          {/* Grip texture */}
          <Box
            sx={{
              position: 'absolute',
              right: '5px',
              top: '12%',
              bottom: '12%',
              width: '65px',
              backgroundImage: `
                radial-gradient(circle, rgba(40,40,45,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '8px 8px',
              pointerEvents: 'none',
              borderRadius: '10px',
            }}
          />

          {/* Right side buttons: INFO/DISP and PLAYBACK */}
          <Box
            sx={{
              position: 'absolute',
              right: 'calc(50% - 200px)',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              zIndex: 20,
            }}
          >
            {/* INFO/DISP button */}
            <Box
              onClick={onInfoToggle}
              role="button"
              aria-label="INFO - Toggle display mode"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onInfoToggle?.(); } }}
              sx={{
                width: 48,
                height: 28,
                borderRadius: '4px',
                background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                border: '1px solid rgba(60,60,65,0.5)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'rgba(246,244,239,0.7)',
                  letterSpacing: 0.5,
                }}
              >
                INFO
              </Typography>
            </Box>

            {/* PLAYBACK button */}
            <Box
              onClick={onPlayback}
              role="button"
              aria-label="PLAYBACK - Open projects gallery"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPlayback?.(); } }}
              sx={{
                width: 48,
                height: 28,
                borderRadius: '4px',
                background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                border: '1px solid rgba(60,60,65,0.5)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 8,
                  color: 'rgba(246,244,239,0.7)',
                  letterSpacing: 0.5,
                }}
              >
                ▶
              </Typography>
            </Box>
          </Box>

          {/* Controls area - to the right of LCD */}
          <Box
            sx={{
              position: 'absolute',
              right: '80px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              zIndex: 20,
            }}
          >
            {/* Command Dial */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box
                onClick={() => onScroll?.(1)}
                role="button"
                aria-label="Command dial - Scroll"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onScroll?.(1);
                  }
                }}
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 35%, rgba(50,50,55,0.95), rgba(30,30,35,0.98))',
                  border: '2px solid rgba(70,70,75,0.6)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Ridged texture */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 3,
                    borderRadius: '50%',
                    background: `repeating-conic-gradient(
                      from 0deg,
                      rgba(60,60,65,0.3) 0deg,
                      rgba(60,60,65,0.3) 3deg,
                      transparent 3deg,
                      transparent 6deg
                    )`,
                  }}
                />
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 35%, rgba(70,70,75,0.8), rgba(50,50,55,0.9))',
                    border: '1px solid rgba(80,80,85,0.4)',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 7,
                  color: 'rgba(246,244,239,0.25)',
                  letterSpacing: 1,
                }}
              >
                DIAL
              </Typography>
            </Box>

            {/* D-Pad with OK */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 120,
                }}
              >
                {/* Outer ring */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(25,25,30,0.95) 0%, rgba(20,20,25,0.98) 100%)',
                    border: '2px solid rgba(50,50,55,0.6)',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.03)',
                  }}
                />

                {/* Up */}
                <Box
                  onClick={onUp}
                  role="button"
                  aria-label="Up - Previous section"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onUp?.(); } }}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 32,
                    height: 32,
                    borderRadius: '6px 6px 3px 3px',
                    background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                    border: '1px solid rgba(60,60,65,0.5)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 14 }}>▲</Box>
                </Box>

                {/* Down */}
                <Box
                  onClick={onDown}
                  role="button"
                  aria-label="Down - Next section"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDown?.(); } }}
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 32,
                    height: 32,
                    borderRadius: '3px 3px 6px 6px',
                    background: 'linear-gradient(0deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                    border: '1px solid rgba(60,60,65,0.5)',
                    boxShadow: '0 -2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 14 }}>▼</Box>
                </Box>

                {/* Left */}
                <Box
                  onClick={onLeft}
                  role="button"
                  aria-label="Left - Previous slide"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLeft?.(); } }}
                  sx={{
                    position: 'absolute',
                    left: 2,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 32,
                    height: 32,
                    borderRadius: '6px 3px 3px 6px',
                    background: 'linear-gradient(90deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                    border: '1px solid rgba(60,60,65,0.5)',
                    boxShadow: '2px 0 4px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 14 }}>◀</Box>
                </Box>

                {/* Right */}
                <Box
                  onClick={onRight}
                  role="button"
                  aria-label="Right - Next slide"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRight?.(); } }}
                  sx={{
                    position: 'absolute',
                    right: 2,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 32,
                    height: 32,
                    borderRadius: '3px 6px 6px 3px',
                    background: 'linear-gradient(270deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
                    border: '1px solid rgba(60,60,65,0.5)',
                    boxShadow: '-2px 0 4px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 2,
                  }}
                >
                  <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 14 }}>▶</Box>
                </Box>

                {/* Center OK */}
                <Box
                  onClick={onOk}
                  role="button"
                  aria-label="OK - Confirm selection"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOk?.(); } }}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 40% 35%, rgba(55,55,60,0.95), rgba(35,35,40,0.98))',
                    border: '2px solid rgba(70,70,75,0.7)',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 40% 35%, rgba(65,65,70,0.9), rgba(45,45,50,0.95))',
                      border: '1px solid rgba(80,80,85,0.5)',
                    }}
                  />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  fontSize: 7,
                  color: 'rgba(246,244,239,0.25)',
                  letterSpacing: 1,
                }}
              >
                MULTI
              </Typography>
            </Box>

            {/* Status LED */}
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: '#4caf50',
                boxShadow: '0 0 6px rgba(76,175,80,0.6)',
              }}
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />
          </Box>
        </Box>

        {/* ─── Bottom edge ─── */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '8px',
            background: 'linear-gradient(0deg, #0e0e12, #141418)',
            borderTop: '1px solid rgba(35,35,40,0.3)',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        />
      </Box>
    </Box>
  );
});

CameraShell.displayName = 'CameraShell';

export default CameraShell;
