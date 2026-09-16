import { useState } from 'react';
import { useNav } from '../context';
import { JOBS, MY_APPLICATIONS, CONNECTIONS, ACTIVITY_FEED, NOTIFICATIONS, PROFESSIONALS } from '../data';
import {
  Btn, Input, Icon, Stars, Badge, StatusBadge, SectionHeader,
  TabBar, Chip, Divider, EmptyState, Avatar,
} from '../components/UI';
import { TopBar, ScreenScroll, BottomNav } from '../components/Layout';

// ── 40. Jobs / Opportunities ──────────────────────────────────────────────────

export function JobsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('recommended');
  const [search, setSearch] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-px-text">Opportunities</h1>
          <button onClick={() => navigate('my-applications')} className="text-xs text-px-accent font-medium">My Applications</button>
        </div>
        <div className="flex items-center gap-3 bg-px-surface2 rounded-2xl border border-px-border px-4 py-3 mb-4">
          <span className="text-px-muted"><Icon.Search /></span>
          <input
            placeholder="Search jobs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-px-text placeholder-px-muted2 outline-none"
          />
          <button className="text-px-accent"><Icon.Filter /></button>
        </div>
        <TabBar
          tabs={[{ id: 'recommended', label: 'For You' }, { id: 'nearby', label: 'Nearby' }, { id: 'latest', label: 'Latest' }]}
          active={tab}
          onChange={setTab}
        />
      </div>
      <ScreenScroll className="px-5">
        <div className="flex flex-col gap-3 pb-4">
          {JOBS.map(job => (
            <button
              key={job.id}
              onClick={() => navigate('job-details', { jobId: job.id })}
              className="bg-px-surface rounded-2xl border border-px-border p-4 text-left hover:border-px-border2 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <img src={job.clientAvatar} alt="" className="w-11 h-11 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-px-text mb-0.5 line-clamp-1">{job.title}</p>
                  <p className="text-xs text-px-muted">{job.client}</p>
                </div>
                <Badge color="accent">{job.category}</Badge>
              </div>
              <p className="text-xs text-px-muted mb-3 line-clamp-2">{job.description}</p>
              <div className="flex gap-4 text-xs text-px-muted mb-3">
                <span className="flex items-center gap-1"><Icon.Location />{job.location}</span>
                <span className="flex items-center gap-1"><Icon.Calendar />{job.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-px-accent">{job.budget}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-px-muted">{job.applications} applied</span>
                  <span className="text-[10px] text-px-muted2">{job.posted}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 41. Job Details ───────────────────────────────────────────────────────────

export function JobDetailsScreen() {
  const { navigate, current } = useNav();
  const jobId = current.params.jobId as string ?? 'j1';
  const job = JOBS.find(j => j.id === jobId) ?? JOBS[0];
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Job Details" right={
        <button onClick={() => setSaved(!saved)} className={saved ? 'text-px-accent' : 'text-px-muted'}>
          <Icon.Heart filled={saved} />
        </button>
      } />
      <ScreenScroll className="px-5 pt-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <img src={job.clientAvatar} alt="" className="w-14 h-14 rounded-2xl object-cover border border-px-border" />
          <div className="flex-1">
            <h1 className="text-base font-bold text-px-text mb-1">{job.title}</h1>
            <p className="text-sm text-px-muted">{job.client}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge color="accent">{job.category}</Badge>
              <span className="text-xs text-px-muted">{job.posted}</span>
            </div>
          </div>
        </div>

        {/* Key info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { icon: '💰', label: 'Budget', value: job.budget },
            { icon: '📅', label: 'Date', value: job.date },
            { icon: '📍', label: 'Location', value: job.location },
            { icon: '👥', label: 'Applicants', value: `${job.applications} applied` },
          ].map(d => (
            <div key={d.label} className="bg-px-surface2 rounded-2xl p-3 border border-px-border">
              <span className="text-lg">{d.icon}</span>
              <p className="text-[10px] text-px-muted mt-1">{d.label}</p>
              <p className="text-xs font-semibold text-px-text">{d.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-2">Project Description</h3>
          <p className="text-sm text-px-muted leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-3">Requirements</h3>
          <div className="flex flex-col gap-2">
            {job.requirements.map(r => (
              <div key={r} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-px-accent/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-px-accent" />
                </div>
                <span className="text-sm text-px-muted">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </ScreenScroll>

      <div className="flex gap-3 px-5 pb-8 pt-4 bg-px-surface border-t border-px-border">
        <button className="w-12 h-12 rounded-2xl bg-px-surface2 border border-px-border flex items-center justify-center text-px-muted">
          <Icon.Message />
        </button>
        <Btn fullWidth size="lg" onClick={() => navigate('apply-job', { jobId: job.id })}>Apply Now</Btn>
      </div>
    </div>
  );
}

// ── 42. Apply for Job ─────────────────────────────────────────────────────────

export function ApplyJobScreen() {
  const { navigate, current } = useNav();
  const jobId = current.params.jobId as string ?? 'j1';
  const job = JOBS.find(j => j.id === jobId) ?? JOBS[0];
  const [proposal, setProposal] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Apply for Job" />
      <ScreenScroll className="px-5 pt-4">
        {/* Job reference */}
        <div className="flex items-center gap-3 bg-px-surface rounded-2xl p-3 border border-px-border mb-5">
          <img src={job.clientAvatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-px-text line-clamp-1">{job.title}</p>
            <p className="text-xs text-px-muted">{job.client} · {job.budget}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-4">
          <Input label="Your Proposed Price" placeholder="e.g. $3,200" value={price} onChange={setPrice} icon={<Icon.Dollar />} />
          <Input label="Availability" placeholder="e.g. Oct 15 – confirmed" value={availability} onChange={setAvailability} icon={<Icon.Calendar />} />
          <Input
            label="Cover Letter / Proposal"
            placeholder="Introduce yourself, share why you're perfect for this project, link to relevant portfolio work..."
            value={proposal}
            onChange={setProposal}
            textarea
            rows={6}
          />
          <div className="bg-px-surface2 rounded-2xl p-4 border border-px-border">
            <p className="text-sm font-semibold text-px-text mb-2">Attach Portfolio Samples</p>
            <div className="flex gap-2 overflow-x-auto">
              {PROFESSIONALS[0].portfolio.slice(0, 4).map((src, i) => (
                <div key={i} className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-px-accent transition-colors cursor-pointer">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <button className="flex-shrink-0 w-20 h-20 rounded-xl border-2 border-dashed border-px-border flex items-center justify-center text-px-muted">
                <Icon.Plus />
              </button>
            </div>
          </div>
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('my-applications')}>Submit Application</Btn>
      </div>
    </div>
  );
}

// ── 43. My Applications ───────────────────────────────────────────────────────

export function MyApplicationsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('applied');
  const statusTabs = ['applied', 'shortlisted', 'accepted', 'rejected'];
  const filtered = MY_APPLICATIONS.filter(a => a.status === tab);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="My Applications" />
      <div className="px-5 pt-2">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {statusTabs.map(s => (
            <Chip key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} active={tab === s} onClick={() => setTab(s)} />
          ))}
        </div>
      </div>
      <ScreenScroll className="px-5">
        {filtered.length === 0 ? (
          <EmptyState icon="📋" title="No applications" body={`No ${tab} applications yet.`} action="Browse Jobs" onAction={() => navigate('jobs')} />
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {filtered.map(app => (
              <button key={app.id} onClick={() => navigate('job-details', { jobId: app.job.id })}
                className="bg-px-surface rounded-2xl border border-px-border p-4 text-left hover:border-px-border2 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <img src={app.job.clientAvatar} alt="" className="w-11 h-11 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-px-text line-clamp-1">{app.job.title}</p>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-px-muted">{app.job.client}</p>
                  </div>
                </div>
                <p className="text-xs text-px-muted mb-3 line-clamp-2">{app.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-px-accent">${app.proposalAmount.toLocaleString()}</span>
                  <span className="text-xs text-px-muted">Submitted {app.submittedAt}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScreenScroll>
    </div>
  );
}

// ── 44. Discover Creators ─────────────────────────────────────────────────────

export function DiscoverCreatorsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-px-text">Discover</h1>
          <button onClick={() => navigate('connections')} className="text-xs text-px-accent font-medium">Connections</button>
        </div>
        <div className="flex items-center gap-3 bg-px-surface2 rounded-2xl border border-px-border px-4 py-3 mb-3">
          <span className="text-px-muted"><Icon.Search /></span>
          <input placeholder="Search creators..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-px-text placeholder-px-muted2 outline-none" />
        </div>
        <TabBar tabs={[{ id: 'all', label: 'All' }, { id: 'photo', label: 'Photographers' }, { id: 'video', label: 'Videographers' }]} active={tab} onChange={setTab} />
      </div>
      <ScreenScroll className="px-5">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {CONNECTIONS.map(c => (
            <button key={c.id} onClick={() => navigate('pro-profile', { proId: c.id.replace('conn', 'p') })}
              className="bg-px-surface rounded-2xl border border-px-border overflow-hidden text-left hover:border-px-border2 transition-colors">
              <img src={c.avatar} alt={c.name} className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="text-sm font-semibold text-px-text mb-0.5">{c.name}</p>
                <p className="text-xs text-px-muted mb-2">{c.type}</p>
                <button
                  onClick={e => { e.stopPropagation(); }}
                  className={`w-full py-1.5 rounded-xl text-xs font-medium border transition-all ${c.following ? 'bg-px-surface3 text-px-muted border-px-border' : 'bg-px-accent text-px-bg border-transparent'}`}
                >
                  {c.following ? 'Following' : 'Follow'}
                </button>
              </div>
            </button>
          ))}
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 45. Connections List ──────────────────────────────────────────────────────

export function ConnectionsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('following');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Connections" />
      <div className="px-5 pt-2">
        <TabBar tabs={[{ id: 'following', label: 'Following' }, { id: 'followers', label: 'Followers' }]} active={tab} onChange={setTab} />
      </div>
      <ScreenScroll className="px-5 pt-4">
        <div className="flex flex-col gap-3 pb-4">
          {CONNECTIONS.filter(c => tab === 'following' ? c.following : !c.following).concat(CONNECTIONS.slice(0, 2)).map((c, i) => (
            <div key={`${c.id}-${i}`} className="flex items-center gap-3 bg-px-surface rounded-2xl p-3.5 border border-px-border">
              <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-px-text">{c.name}</p>
                <p className="text-xs text-px-muted">{c.type} · {c.location}</p>
                {c.mutual > 0 && <p className="text-[10px] text-px-muted2">{c.mutual} mutual connections</p>}
              </div>
              <button className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${c.following ? 'bg-px-surface3 text-px-muted border-px-border' : 'bg-px-accent text-px-bg border-transparent'}`}>
                {c.following ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 47. Activity / Updates Feed ───────────────────────────────────────────────

export function ActivityFeedScreen() {
  const { navigate } = useNav();
  const [liked, setLiked] = useState<string[]>([]);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3">
        <h1 className="text-xl font-semibold text-px-text">Activity Feed</h1>
      </div>
      <ScreenScroll className="px-5">
        <div className="flex flex-col gap-4 pb-4">
          {ACTIVITY_FEED.map(item => (
            <div key={item.id} className="bg-px-surface rounded-2xl border border-px-border overflow-hidden">
              <div className="flex items-center gap-3 p-4 pb-3">
                <img src={item.user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-px-text">{item.user.name}</p>
                  <p className="text-xs text-px-muted">{item.action} · {item.time}</p>
                </div>
                <button className="px-3 py-1 rounded-full border border-px-border text-xs text-px-muted">Follow</button>
              </div>
              <div className="relative">
                <img src={item.image} alt="" className="w-full h-48 object-cover" />
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <button
                  onClick={() => setLiked(prev => prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id])}
                  className={`flex items-center gap-1.5 text-sm ${liked.includes(item.id) ? 'text-px-red' : 'text-px-muted'}`}
                >
                  <Icon.Heart filled={liked.includes(item.id)} />
                  {item.likes + (liked.includes(item.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-px-muted">
                  <Icon.Message />
                  {item.comments}
                </button>
                <button className="ml-auto text-px-muted"><Icon.Share /></button>
              </div>
            </div>
          ))}
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 48. Notifications ─────────────────────────────────────────────────────────

export function NotificationsScreen() {
  const { goBack } = useNav();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const typeColors: Record<string, 'green' | 'accent' | 'violet' | 'muted' | 'orange' | 'red'> = {
    booking: 'green',
    message: 'accent',
    job: 'violet',
    application: 'accent',
    connection: 'orange',
    profile: 'muted',
    review: 'accent',
  };

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-px-border">
        <button onClick={goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
          <Icon.Back />
        </button>
        <h1 className="text-sm font-semibold text-px-text">Notifications</h1>
        <button className="text-xs text-px-accent">Mark all read</button>
      </div>
      <ScreenScroll>
        <div className="pt-2 pb-4">
          {notifications.map(n => (
            <button
              key={n.id}
              onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, unread: false } : x))}
              className={`flex items-start gap-3 px-5 py-4 w-full text-left transition-colors hover:bg-px-surface ${n.unread ? 'bg-px-surface/50' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0 ${n.unread ? 'bg-px-accent/15' : 'bg-px-surface2'}`}>
                {n.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm font-medium ${n.unread ? 'text-px-text' : 'text-px-muted'}`}>{n.title}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-px-muted2">{n.time}</span>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-px-accent" />}
                  </div>
                </div>
                <p className="text-xs text-px-muted leading-relaxed">{n.body}</p>
              </div>
            </button>
          ))}
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 49. Profile ───────────────────────────────────────────────────────────────

export function ProfileScreen() {
  const { navigate, userType, setUserType } = useNav();
  const isCreator = userType === 'creator';

  const menuItems = [
    { icon: '📸', label: 'My Bookings', screen: 'my-bookings' as const },
    { icon: '📬', label: 'My Projects', screen: 'my-projects' as const },
    { icon: '🤝', label: 'Connections', screen: 'connections' as const },
    { icon: '🔔', label: 'Notifications', screen: 'notifications' as const },
  ];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-px-text">Profile</h1>
        <button onClick={() => navigate('settings')} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
          <Icon.Settings />
        </button>
      </div>
      <ScreenScroll className="px-5">
        {/* User card */}
        <div className="bg-px-surface rounded-3xl border border-px-border p-5 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=120&h=120&fit=crop&auto=format"
                alt=""
                className="w-18 h-18 rounded-2xl object-cover border-2 border-px-accent"
                style={{ width: 72, height: 72 }}
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-px-green rounded-full border-2 border-px-surface" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-px-text">Alex Jordan</h2>
              <p className="text-sm text-px-muted">New York, NY</p>
              <div className="flex gap-2 mt-2">
                <Badge color="accent">Client</Badge>
                <Badge color="muted">Member since 2024</Badge>
              </div>
            </div>
          </div>
          <Btn fullWidth variant="outline" size="sm" onClick={() => navigate('edit-profile')}>
            <Icon.Edit /> Edit Profile
          </Btn>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Bookings', value: '8' },
            { label: 'Projects', value: '3' },
            { label: 'Reviews', value: '12' },
          ].map(s => (
            <div key={s.label} className="bg-px-surface2 rounded-2xl p-3 text-center border border-px-border">
              <p className="text-xl font-bold text-px-text">{s.value}</p>
              <p className="text-[10px] text-px-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Switch mode */}
        <div className="bg-gradient-to-r from-px-accent/10 to-px-violet/10 rounded-2xl p-4 border border-px-accent/20 mb-5">
          <p className="text-sm font-semibold text-px-text mb-1">
            {isCreator ? 'Switch to Client Mode' : 'Are you a Creator?'}
          </p>
          <p className="text-xs text-px-muted mb-3">
            {isCreator ? 'Browse and book professionals as a client.' : 'Switch to creator mode to showcase your portfolio and get hired.'}
          </p>
          <Btn size="sm" variant="outline" onClick={() => { setUserType(isCreator ? 'client' : 'creator'); navigate(isCreator ? 'client-home' : 'creator-home'); }}>
            {isCreator ? 'Switch to Client' : 'Become a Creator'}
          </Btn>
        </div>

        {/* Menu */}
        <div className="bg-px-surface rounded-2xl border border-px-border overflow-hidden mb-5">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.screen)}
              className={`flex items-center gap-3 px-4 py-4 w-full hover:bg-px-surface2 transition-colors ${i < menuItems.length - 1 ? 'border-b border-px-border' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm text-px-text text-left">{item.label}</span>
              <Icon.ChevronRight />
            </button>
          ))}
        </div>

        {/* Settings menu */}
        <div className="bg-px-surface rounded-2xl border border-px-border overflow-hidden mb-5">
          {[
            { icon: '🔒', label: 'Privacy & Security' },
            { icon: '💳', label: 'Payment Methods' },
            { icon: '📱', label: 'App Settings' },
            { icon: '❓', label: 'Help & Support' },
          ].map((item, i) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-4 w-full hover:bg-px-surface2 transition-colors ${i < 3 ? 'border-b border-px-border' : ''}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="flex-1 text-sm text-px-text text-left">{item.label}</span>
              <Icon.ChevronRight />
            </button>
          ))}
        </div>

        <Btn fullWidth variant="danger" size="md">Sign Out</Btn>
        <div className="h-8" />
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 50. Settings ──────────────────────────────────────────────────────────────

export function SettingsScreen() {
  const { goBack } = useNav();
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [location, setLocation] = useState(true);

  function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
    return (
      <button onClick={() => onChange(!on)} className={`w-11 h-6 rounded-full transition-all ${on ? 'bg-px-accent' : 'bg-px-surface3'}`}>
        <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    );
  }

  const sections = [
    {
      title: 'Notifications',
      items: [
        { label: 'Push Notifications', sub: 'Bookings, messages, updates', on: pushNotifs, onChange: setPushNotifs },
        { label: 'Email Notifications', sub: 'Weekly digest and receipts', on: emailNotifs, onChange: setEmailNotifs },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Dark Mode', sub: 'Use dark theme', on: darkMode, onChange: setDarkMode },
        { label: 'Location Services', sub: 'Find nearby professionals', on: location, onChange: setLocation },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Settings" />
      <ScreenScroll className="px-5 pt-4">
        {sections.map(section => (
          <div key={section.title} className="mb-5">
            <p className="text-xs font-medium text-px-muted uppercase tracking-wide mb-3">{section.title}</p>
            <div className="bg-px-surface rounded-2xl border border-px-border overflow-hidden">
              {section.items.map((item, i) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-4 ${i < section.items.length - 1 ? 'border-b border-px-border' : ''}`}>
                  <div className="flex-1">
                    <p className="text-sm text-px-text">{item.label}</p>
                    <p className="text-xs text-px-muted">{item.sub}</p>
                  </div>
                  <Toggle on={item.on} onChange={item.onChange} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mb-5">
          <p className="text-xs font-medium text-px-muted uppercase tracking-wide mb-3">Account</p>
          <div className="bg-px-surface rounded-2xl border border-px-border overflow-hidden">
            {['Change Password', 'Connected Accounts', 'Download My Data', 'Delete Account'].map((item, i) => (
              <button key={item} className={`flex items-center gap-3 px-4 py-4 w-full hover:bg-px-surface2 transition-colors ${i < 3 ? 'border-b border-px-border' : ''}`}>
                <span className={`flex-1 text-sm text-left ${item === 'Delete Account' ? 'text-px-red' : 'text-px-text'}`}>{item}</span>
                <Icon.ChevronRight />
              </button>
            ))}
          </div>
        </div>

        <div className="text-center pb-8">
          <p className="text-xs text-px-muted2">Pixora v2.4.1 · Built with ❤️</p>
          <p className="text-xs text-px-muted2 mt-1">Terms · Privacy · Licenses</p>
        </div>
      </ScreenScroll>
    </div>
  );
}
