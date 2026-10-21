import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { sections } from '../../data/portfolio';

const MenuOverlay = styled(motion.div)({
    position: 'absolute',
    inset: 0,
    background: 'rgba(5,5,8,0.95)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
});

const MenuHeader = styled(Box)({
    padding: '8px 12px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.3)',
});

const MenuItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
    padding: '6px 12px',
    borderRadius: '3px',
    minHeight: '36px',
    maxHeight: '36px',
    background: active 
        ? 'linear-gradient(90deg, rgba(100,150,255,0.15) 0%, rgba(100,150,255,0.05) 100%)' 
        : 'transparent',
    border: active ? '1px solid rgba(100,150,255,0.25)' : '1px solid transparent',
    transition: 'all 0.15s ease',
    overflow: 'hidden',
    '&:hover': {
        background: 'rgba(255,255,255,0.04)',
    },
    '&:focus-visible': {
        outline: '2px solid rgba(100,150,255,0.6)',
        outlineOffset: '-2px',
    },
    // CSS custom property for selection indicator positioning
    ['--menu-item-height']: '36px',
}));

const SelectionIndicator = styled(motion.div)(({ theme }) => ({
    position: 'absolute',
    left: '4px',
    width: '3px',
    height: '24px',
    background: 'rgba(100,150,255,0.7)',
    borderRadius: '2px',
    boxShadow: '0 0 6px rgba(100,150,255,0.4)',
}));

export function CameraMenu({ 
    selectedIndex, 
    onSelect, 
    onClose, 
    onNavigate 
}) {
    return (
        <MenuOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <MenuHeader>
                <Typography sx={{ 
                    color: 'rgba(150,180,255,0.9)', 
                    fontSize: 'clamp(8px, 0.9vw, 11px)', 
                    fontFamily: "'Bitcount Grid Single', monospace",
                    letterSpacing: '1px',
                }}>
                    MENU
                </Typography>
            </MenuHeader>
            
            <List sx={{ flex: 1, overflow: 'auto', position: 'relative', p: '4px' }}>
                <AnimatePresence>
                    {selectedIndex >= 0 && (
                        <motion.div
                            initial={{ top: `calc(var(--menu-item-height, 36px) * ${selectedIndex})` }}
                            animate={{ top: `calc(var(--menu-item-height, 36px) * ${selectedIndex})` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{ position: 'absolute', left: 0, right: 0 }}
                        >
                            <SelectionIndicator />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {sections.map((section, index) => (
                    <ListItem key={section.id} disablePadding sx={{ py: 0.3 }}>
                        <MenuItem
                            active={index === selectedIndex}
                            onClick={() => onSelect(section.id)}
                            aria-label={`Navigate to ${section.label}`}
                            aria-selected={index === selectedIndex}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                <Typography sx={{
                                    color: index === selectedIndex 
                                        ? 'rgba(150,180,255,0.95)' 
                                        : 'rgba(255,255,255,0.6)',
                                    fontSize: 'clamp(9px, 1vw, 12px)',
                                    fontFamily: "'Bitcount Grid Single', monospace",
                                    letterSpacing: '1px',
                                    transition: 'color 0.15s ease',
                                }}>
                                    {section.label}
                                </Typography>
                                {index === selectedIndex && (
                                    <Box sx={{
                                        ml: 'auto',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: 'rgba(100,150,255,0.8)',
                                        boxShadow: '0 0 4px rgba(100,150,255,0.5)',
                                    }} />
                                )}
                            </Box>
                        </MenuItem>
                    </ListItem>
                ))}
            </List>
            
            <Box sx={{
                padding: '6px 12px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: 'clamp(7px, 0.75vw, 9px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    ▲▼ Navigate • OK Select • BACK Close
                </Typography>
            </Box>
        </MenuOverlay>
    );
}

export default CameraMenu;
