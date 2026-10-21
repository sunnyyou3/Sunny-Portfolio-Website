import React, { useEffect, useCallback, useMemo } from 'react';
import { Box, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCameraNavigation } from '../../hooks/useCameraNavigation';
import { CameraShell } from './CameraShell';
import { CameraLCD } from './CameraLCD';
import { CameraStatusBar } from './CameraStatusBar';
import { CameraControls } from './CameraControls';
import { CameraMenu } from './CameraMenu';
import { 
    HomeView,
    ExperienceView,
    ProjectsView,
    AboutView,
    GalleryView,
    ProjectDetailView,
    InfoView,
} from './views';

import { galleryImages } from './views/GalleryView';
import { projects, careerEntries, sections } from '../../data/portfolio';

// View-to-component mapping for cleaner rendering
const viewMap = {
    home: HomeView,
    experience: ExperienceView,
    projects: (props) => <ProjectsView onSelectProject={props.selectProject} selectedIndex={props.projectIndex} />,
    about: AboutView,
    gallery: (props) => <GalleryView currentIndex={props.slideIndex} />,
    projectDetail: (props) => <ProjectDetailView projectIndex={props.projectIndex} onBack={props.onBack} />,
    info: InfoView,
};

const LayoutContainer = styled(Box)({
    width: '100vw',
    height: '100vh',
    background: '#050505',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
});

const ScreenArea = styled(Box)(({ theme }) => ({
    position: 'relative',
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    maxWidth: 'clamp(300px, 55vw, 620px)',
}));

const ScreenContent = styled(Box)({
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    minHeight: 0,
});

export function DSLRPortfolio() {
    const { 
        state, 
        toggleMenu, 
        menuNavigate, 
        menuSelect, 
        goBack, 
        selectProject, 
        projectNavigate, 
        slideNavigate, 
        toggleInfo, 
        openGallery 
    } = useCameraNavigation();

    const { currentView, activeSection, menuOpen, menuIndex, projectIndex, displayMode, slideIndex } = state;

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (menuOpen) {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    menuNavigate(-1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    menuNavigate(1);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    menuSelect();
                    break;
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    goBack();
                    break;
                default:
                    break;
            }
        } else if (currentView === 'projectDetail') {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    projectNavigate(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    projectNavigate(1);
                    break;
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    goBack();
                    break;
                default:
                    break;
            }
        } else if (currentView === 'gallery') {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    slideNavigate(-1, galleryImages.length);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    slideNavigate(1, galleryImages.length);
                    break;
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    goBack();
                    break;
                default:
                    break;
            }
        } else {
            // General navigation
            switch (e.key) {
                case 'm':
                case 'M':
                    e.preventDefault();
                    toggleMenu();
                    break;
                case 'i':
                case 'I':
                    e.preventDefault();
                    toggleInfo();
                    break;
                case 'Escape':
                case 'Backspace':
                    e.preventDefault();
                    goBack();
                    break;
                default:
                    break;
            }
        }
    }, [menuOpen, currentView, menuNavigate, menuSelect, goBack, projectNavigate, slideNavigate, toggleMenu, toggleInfo]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Determine which view to render (using lookup table for cleaner code)
    const renderContent = useMemo(() => {
        const ViewComponent = viewMap[currentView] || HomeView;
        return (
            <ViewComponent
                selectProject={selectProject}
                projectIndex={projectIndex}
                slideIndex={slideIndex}
                onBack={goBack}
            />
        );
    }, [currentView, projectIndex, slideIndex, selectProject, goBack]);

    // Calculate slide count for status bar (derived from actual data)
    const slideCount = useMemo(() => {
        if (currentView === 'gallery') return galleryImages.length;
        if (currentView === 'projects') return projects.length;
        if (currentView === 'experience') return careerEntries.length;
        if (currentView === 'about') return sections.length;
        return 1;
    }, [currentView]);

    return (
        <LayoutContainer>
            <CameraShell isStatusActive={currentView !== 'home'}>
                {/* Screen area */}
                <ScreenArea>
                    <CameraLCD>
                        <CameraStatusBar 
                            section={activeSection}
                            projectCount={2}
                            currentSlide={slideIndex}
                            totalSlides={slideCount}
                            displayMode={displayMode}
                        />
                        <ScreenContent>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${currentView}-${projectIndex}-${slideIndex}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    {renderContent}
                                </motion.div>
                            </AnimatePresence>
                        </ScreenContent>
                        
                        {/* Menu overlay */}
                        <AnimatePresence>
                            {menuOpen && (
                                <CameraMenu
                                    selectedIndex={menuIndex}
                                    onSelect={(sectionId) => {
                                        // Use menuSelect for consistent navigation handling
                                        menuSelect();
                                        // Handle gallery separately since it needs openGallery
                                        if (sectionId === 'gallery') {
                                            openGallery();
                                        }
                                    }}
                                    onClose={goBack}
                                    onNavigate={menuNavigate}
                                />
                            )}
                        </AnimatePresence>
                    </CameraLCD>
                </ScreenArea>
                
                {/* Physical controls */}
                <CameraControls
                    onMenu={toggleMenu}
                    onInfo={toggleInfo}
                    onPlayback={openGallery}
                    onBack={goBack}
                    onDpadUp={() => menuOpen && menuNavigate(-1)}
                    onDpadDown={() => menuOpen && menuNavigate(1)}
                    onDpadLeft={() => menuOpen && menuNavigate(-1)}
                    onDpadRight={() => menuOpen && menuNavigate(1)}
                    onDpadOk={() => menuOpen && menuSelect()}
                    menuOpen={menuOpen}
                    menuIndex={menuIndex}
                    activeSection={activeSection}
                    onProjectNavigate={projectNavigate}
                    projectIndex={projectIndex}
                />
            </CameraShell>
        </LayoutContainer>
    );
}

export default DSLRPortfolio;
