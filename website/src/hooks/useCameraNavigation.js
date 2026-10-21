import { useCallback, useReducer } from 'react';
import { sections } from '../data/portfolio';

// Navigation states
const VIEW_HOME = 'home';
const VIEW_EXPERIENCE = 'experience';
const VIEW_PROJECTS = 'projects';
const VIEW_ABOUT = 'about';
const VIEW_GALLERY = 'gallery';
const VIEW_PROJECT_DETAIL = 'projectDetail';
const VIEW_INFO = 'info';

const initialState = {
    currentView: VIEW_HOME,
    activeSection: 'home',
    menuIndex: 0,
    projectIndex: 0,
    slideIndex: 0,
    displayMode: 'normal', // 'normal' or 'info'
    menuOpen: false,
    history: [],
};

function navReducer(state, action) {
    switch (action.type) {
        case 'NAVIGATE':
            return {
                ...state,
                currentView: action.view,
                activeSection: action.section || state.activeSection,
                menuOpen: false,
                menuIndex: 0,
                history: [...state.history, state.activeSection],
            };
        case 'TOGGLE_MENU':
            return {
                ...state,
                menuOpen: !state.menuOpen,
                currentView: !state.menuOpen ? state.history[state.history.length - 1] || VIEW_HOME : state.currentView,
                menuIndex: state.activeSection === 'home' ? 0 : sections.findIndex(s => s.id === state.activeSection),
            };
        case 'MENU_NAVIGATE':
            return {
                ...state,
                menuIndex: Math.max(0, Math.min(sections.length - 1, state.menuIndex + action.direction)),
            };
        case 'MENU_SELECT':
            const section = sections[state.menuIndex];
            return {
                ...state,
                activeSection: section.id,
                currentView: section.id === 'projects' ? VIEW_PROJECTS : section.id === 'experience' ? VIEW_EXPERIENCE : section.id === 'gallery' ? VIEW_GALLERY : section.id === 'about' ? VIEW_ABOUT : VIEW_HOME,
                menuOpen: false,
                menuIndex: 0,
                history: [...state.history, state.activeSection],
                slideIndex: 0,
            };
        case 'GO_BACK':
            const prevHistory = state.history.length > 0 ? [...state.history] : [];
            const prevView = prevHistory.length > 0 ? prevHistory.pop() : VIEW_HOME;
            return {
                ...state,
                currentView: prevView,
                activeSection: prevView,
                menuOpen: false,
                menuIndex: prevView === 'home' ? 0 : sections.findIndex(s => s.id === prevView),
                slideIndex: 0,
                history: prevHistory,
            };
        case 'SELECT_PROJECT':
            return {
                ...state,
                currentView: VIEW_PROJECT_DETAIL,
                projectIndex: action.index,
                slideIndex: 0,
            };
        case 'PROJECT_NAVIGATE':
            return {
                ...state,
                projectIndex: Math.max(0, Math.min(1, state.projectIndex + action.direction)),
                slideIndex: 0,
            };
        case 'SLIDE_NAVIGATE':
            return {
                ...state,
                slideIndex: Math.max(0, Math.min(action.max - 1, state.slideIndex + action.direction)),
            };
        case 'TOGGLE_INFO':
            return {
                ...state,
                displayMode: state.displayMode === 'normal' ? 'info' : 'normal',
                currentView: state.displayMode === 'info' ? (state.history[state.history.length - 1] || VIEW_HOME) : VIEW_INFO,
            };
        case 'OPEN_GALLERY':
            return {
                ...state,
                currentView: VIEW_GALLERY,
                activeSection: 'gallery',
                slideIndex: 0,
                history: [...state.history, state.activeSection],
            };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

export function useCameraNavigation() {
    const [state, dispatch] = useReducer(navReducer, initialState);

    const navigateTo = useCallback((sectionId) => {
        dispatch({ type: 'NAVIGATE', view: sectionId, section: sectionId });
    }, []);

    const toggleMenu = useCallback(() => {
        dispatch({ type: 'TOGGLE_MENU' });
    }, []);

    const menuNavigate = useCallback((direction) => {
        dispatch({ type: 'MENU_NAVIGATE', direction });
    }, []);

    const menuSelect = useCallback(() => {
        dispatch({ type: 'MENU_SELECT' });
    }, []);

    const goBack = useCallback(() => {
        dispatch({ type: 'GO_BACK' });
    }, []);

    const selectProject = useCallback((index) => {
        dispatch({ type: 'SELECT_PROJECT', index });
    }, []);

    const projectNavigate = useCallback((direction) => {
        dispatch({ type: 'PROJECT_NAVIGATE', direction });
    }, []);

    const slideNavigate = useCallback((direction, max) => {
        dispatch({ type: 'SLIDE_NAVIGATE', direction, max });
    }, []);

    const toggleInfo = useCallback(() => {
        dispatch({ type: 'TOGGLE_INFO' });
    }, []);

    const openGallery = useCallback(() => {
        dispatch({ type: 'OPEN_GALLERY' });
    }, []);

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' });
    }, []);

    return {
        state,
        navigateTo,
        toggleMenu,
        menuNavigate,
        menuSelect,
        goBack,
        selectProject,
        projectNavigate,
        slideNavigate,
        toggleInfo,
        openGallery,
        reset,
    };
}
