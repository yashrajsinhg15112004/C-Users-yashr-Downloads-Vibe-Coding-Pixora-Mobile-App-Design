import { ReactNode } from 'react';
import { useNav } from '../context';
import { Icon } from './UI';

// ── Mobile Frame ──────────────────────────────────────────────────────────────

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05050A] flex items-center justify-center py-8">
      <div
        className="relative flex flex-col bg-px-bg overflow-hidden shadow-2xl"
        style={{ width: 390, height: 844, borderRadius: 44, border: '1px solid #2A2A36' }}
      >
        <StatusBar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Status Bar ────────────────────────────────────────────────────────────────

function StatusBar() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return (
    <div className="flex items-center justify-between px-8 pt-3 pb-1 bg-px-bg flex-shrink-0" style={{ height: 44 }}>
      <span className="text-xs font-semibold text-px-text">{time}</span>
      <div className="w-28 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-0" />
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 17 12">
          <rect x="0" y="3" width="3" height="9" rx="1" className="text-px-text" fill="currentColor" opacity="0.4" />
          <rect x="4" y="2" width="3" height="10" rx="1" className="text-px-text" fill="currentColor" opacity="0.6" />
          <rect x="8" y="1" width="3" height="11" rx="1" fill="currentColor" opacity="0.8" />
          <rect x="12" y="0" width="3" height="12" rx="1" fill="currentColor" />
        </svg>
        <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 16 12">
          <path d="M8 2.4C10.95 2.4 13.63 3.69 15.5 5.8l1.2-1.2C14.62 2.09 11.44.4 8 .4S1.38 2.09-.7 4.6l1.2 1.2C2.37 3.69 5.05 2.4 8 2.4z" />
          <path d="M8 5.6c1.97 0 3.74.85 4.98 2.2l1.2-1.2C12.68 4.82 10.45 3.6 8 3.6S3.32 4.82 1.82 6.6l1.2 1.2C4.26 6.45 6.03 5.6 8 5.6z" />
          <circle cx="8" cy="10" r="2" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-6 h-3 border border-px-muted2 rounded-sm flex items-center px-0.5">
            <div className="w-4 h-2 bg-px-green rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
  title?: string;
  transparent?: boolean;
  right?: ReactNode;
  onBack?: () => void;
  noBack?: boolean;
}

export function TopBar({ title, transparent, right, onBack, noBack }: TopBarProps) {
  const { goBack } = useNav();
  return (
    <div className={`flex items-center justify-between px-4 py-3 flex-shrink-0 ${transparent ? 'absolute top-11 left-0 right-0 z-10' : 'bg-px-bg border-b border-px-border'}`}>
      {!noBack ? (
        <button onClick={onBack ?? goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted hover:text-px-text transition-colors">
          <Icon.Back />
        </button>
      ) : <div className="w-9" />}
      {title && <h1 className="text-sm font-semibold text-px-text">{title}</h1>}
      {right ?? <div className="w-9" />}
    </div>
  );
}

// ── Bottom Navigation ─────────────────────────────────────────────────────────

interface NavItem {
  id: string;
  label: string;
  icon: (active: boolean) => ReactNode;
  screen: string;
}

const CLIENT_NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: (a) => <NavIcon a={a}><Icon.Home /></NavIcon>, screen: 'client-home' },
  { id: 'explore', label: 'Explore', icon: (a) => <NavIcon a={a}><Icon.Compass /></NavIcon>, screen: 'search' },
  { id: 'messages', label: 'Messages', icon: (a) => <NavIcon a={a}><Icon.Message /></NavIcon>, screen: 'messages' },
  { id: 'projects', label: 'Projects', icon: (a) => <NavIcon a={a}><Icon.Briefcase /></NavIcon>, screen: 'my-projects' },
  { id: 'profile', label: 'Profile', icon: (a) => <NavIcon a={a}><Icon.User /></NavIcon>, screen: 'profile' },
];

const CREATOR_NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: (a) => <NavIcon a={a}><Icon.Home /></NavIcon>, screen: 'creator-home' },
  { id: 'jobs', label: 'Jobs', icon: (a) => <NavIcon a={a}><Icon.Compass /></NavIcon>, screen: 'jobs' },
  { id: 'messages', label: 'Messages', icon: (a) => <NavIcon a={a}><Icon.Message /></NavIcon>, screen: 'messages' },
  { id: 'portfolio', label: 'Portfolio', icon: (a) => <NavIcon a={a}><Icon.Grid /></NavIcon>, screen: 'creator-portfolio' },
  { id: 'profile', label: 'Profile', icon: (a) => <NavIcon a={a}><Icon.User /></NavIcon>, screen: 'creator-profile' },
];

function NavIcon({ children, a }: { children: ReactNode; a: boolean }) {
  return <span className={a ? 'text-px-accent' : 'text-px-muted2'}>{children}</span>;
}

export function BottomNav() {
  const { userType, navigate, activeTab, setActiveTab, current } = useNav();
  const items = userType === 'client' ? CLIENT_NAV : CREATOR_NAV;

  const isNav = ['client-home','search','messages','my-projects','profile','creator-home','jobs','creator-portfolio','creator-profile'].includes(current.screen);
  if (!isNav) return null;

  return (
    <div className="flex-shrink-0 bg-px-surface border-t border-px-border" style={{ paddingBottom: 20 }}>
      <div className="flex items-center">
        {items.map(item => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); navigate(item.screen as any); }}
              className="flex-1 flex flex-col items-center gap-1 py-3"
            >
              {item.icon(active)}
              <span className={`text-[10px] font-medium ${active ? 'text-px-accent' : 'text-px-muted2'}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Screen Container ──────────────────────────────────────────────────────────

export function ScreenScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex-1 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
}
