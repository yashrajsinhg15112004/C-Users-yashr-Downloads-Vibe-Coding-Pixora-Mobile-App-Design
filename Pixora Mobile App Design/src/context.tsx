import { createContext, useContext, useState, ReactNode } from 'react';

export type Screen =
  | 'splash' | 'welcome' | 'choose-role' | 'login' | 'signup'
  | 'forgot-password' | 'otp' | 'create-profile'
  | 'client-home' | 'location' | 'search' | 'filter'
  | 'pro-profile' | 'portfolio-gallery' | 'service-details'
  | 'booking-request' | 'booking-confirm' | 'my-bookings' | 'booking-details'
  | 'messages' | 'chat' | 'send-project'
  | 'post-project' | 'my-projects' | 'project-details' | 'applications' | 'accept-reject'
  | 'creator-home' | 'creator-profile' | 'edit-profile'
  | 'creator-portfolio' | 'add-portfolio' | 'my-services' | 'add-service'
  | 'pricing' | 'availability'
  | 'jobs' | 'job-details' | 'apply-job' | 'my-applications'
  | 'discover' | 'connections' | 'activity-feed'
  | 'notifications' | 'profile' | 'settings';

interface NavState {
  screen: Screen;
  params: Record<string, unknown>;
}

interface NavContextType {
  current: NavState;
  navigate: (screen: Screen, params?: Record<string, unknown>) => void;
  goBack: () => void;
  userType: 'client' | 'creator';
  setUserType: (t: 'client' | 'creator') => void;
  activeTab: string;
  setActiveTab: (t: string) => void;
}

const NavContext = createContext<NavContextType>(null!);

export function NavProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<NavState[]>([{ screen: 'splash', params: {} }]);
  const [userType, setUserType] = useState<'client' | 'creator'>('client');
  const [activeTab, setActiveTab] = useState('home');

  const current = history[history.length - 1];

  function navigate(screen: Screen, params: Record<string, unknown> = {}) {
    setHistory(prev => [...prev, { screen, params }]);
  }

  function goBack() {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }

  return (
    <NavContext.Provider value={{ current, navigate, goBack, userType, setUserType, activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
