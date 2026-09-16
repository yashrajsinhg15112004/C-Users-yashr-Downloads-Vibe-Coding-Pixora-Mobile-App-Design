import { useState } from 'react';
import { useNav } from '../context';
import { PROFESSIONALS, CREATOR_STATS } from '../data';
import {
  Btn, Input, Icon, Stars, Badge, SectionHeader, PortfolioThumb,
  MetricCard, TabBar, Divider,
} from '../components/UI';
import { TopBar, ScreenScroll, BottomNav } from '../components/Layout';

const CREATOR = PROFESSIONALS[0];

// ── 31. Creator Home Dashboard ────────────────────────────────────────────────

export function CreatorHomeScreen() {
  const { navigate } = useNav();

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-px-bg">
      <ScreenScroll>
        {/* Header */}
        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img src={CREATOR.avatar} alt="" className="w-11 h-11 rounded-2xl object-cover border-2 border-px-accent" />
              <div>
                <p className="text-xs text-px-muted">Good morning 👋</p>
                <h1 className="text-base font-semibold text-px-text">{CREATOR.name}</h1>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => navigate('notifications')} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
                <Icon.Bell dot />
              </button>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-gradient-to-r from-px-accent/20 to-px-violet/20 rounded-2xl p-4 border border-px-accent/20 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-px-text">Profile Strength</p>
              <p className="text-sm font-bold text-px-accent">82%</p>
            </div>
            <div className="h-2 bg-px-surface3 rounded-full">
              <div className="h-full w-[82%] bg-px-accent rounded-full" />
            </div>
            <p className="text-xs text-px-muted mt-2">Add a portfolio reel to reach 100%</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-5 mb-5">
          <SectionHeader title="Overview" />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <MetricCard label="Profile Views" value={CREATOR_STATS.profileViews} sub={`+${CREATOR_STATS.profileViewsChange} this week`} icon="👁" />
            <MetricCard label="New Requests" value={CREATOR_STATS.newRequests} icon="📬" />
            <MetricCard label="Month Earnings" value={`$${CREATOR_STATS.monthEarnings.toLocaleString()}`} sub="↑ 12% vs last month" icon="💰" />
            <MetricCard label="Avg Rating" value={CREATOR_STATS.rating} sub={`${CREATOR_STATS.reviews} reviews`} icon="⭐" />
          </div>
        </div>

        {/* New Requests */}
        <div className="px-5 mb-5">
          <SectionHeader title="New Client Requests" action="See all" onAction={() => navigate('my-applications')} />
          <div className="flex flex-col gap-3 mt-3">
            {[
              { name: 'Sarah Mitchell', req: 'Wedding Photography', date: 'Oct 15', budget: '$2,800', avatar: 'https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=80&h=80&fit=crop&auto=format', urgent: true },
              { name: 'Tech Corp Inc.', req: 'Corporate Headshots', date: 'Sep 28', budget: '$1,200', avatar: 'https://images.unsplash.com/photo-1758613654800-26e7f2706fbf?w=80&h=80&fit=crop&auto=format', urgent: false },
            ].map(r => (
              <button key={r.name} onClick={() => navigate('booking-details')}
                className="flex items-center gap-3 bg-px-surface rounded-2xl p-4 border border-px-border text-left hover:border-px-border2 transition-colors">
                <img src={r.avatar} alt="" className="w-11 h-11 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-px-text">{r.name}</p>
                    {r.urgent && <Badge color="orange">Urgent</Badge>}
                  </div>
                  <p className="text-xs text-px-muted">{r.req} · {r.date}</p>
                </div>
                <span className="text-sm font-bold text-px-accent">{r.budget}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="px-5 mb-5">
          <SectionHeader title="Upcoming Bookings" action="View all" onAction={() => navigate('my-bookings')} />
          <div className="flex flex-col gap-3 mt-3">
            {[
              { client: 'Emily & David W.', shoot: 'Wedding – Full Day', date: 'Oct 15', loc: 'Brooklyn, NY', amount: 2800 },
              { client: 'NOVA Magazine', shoot: 'Fashion Editorial', date: 'Sep 28', loc: 'Manhattan, NY', amount: 1800 },
            ].map(b => (
              <div key={b.client} className="flex items-center gap-3 bg-px-surface rounded-2xl p-4 border border-px-border">
                <div className="w-12 h-12 rounded-xl bg-px-accent/15 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-bold text-px-accent">{b.date.split(' ')[0]}</p>
                  <p className="text-[10px] text-px-accent">{b.date.split(' ')[1]}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-px-text">{b.client}</p>
                  <p className="text-xs text-px-muted">{b.shoot}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-px-accent">${b.amount.toLocaleString()}</p>
                  <p className="text-[10px] text-px-green mt-0.5">Confirmed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio performance */}
        <div className="px-5 mb-5">
          <SectionHeader title="Portfolio Performance" />
          <div className="bg-px-surface rounded-2xl p-4 border border-px-border mt-3">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-2xl font-bold text-px-text">{CREATOR_STATS.portfolioViews.toLocaleString()}</p>
                <p className="text-xs text-px-muted">Portfolio views this month</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm font-bold text-px-green">↑ 24%</p>
                <p className="text-xs text-px-muted">vs last month</p>
              </div>
            </div>
            <div className="flex gap-2 items-end h-16">
              {[40, 65, 50, 80, 70, 90, 85].map((v, i) => (
                <div key={i} className="flex-1 bg-px-accent/80 rounded-t-sm" style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <p key={i} className="flex-1 text-center text-[10px] text-px-muted">{d}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="h-4" />
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 32. Creator Profile (Public View) ─────────────────────────────────────────

export function CreatorProfileScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('portfolio');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-px-bg">
      <ScreenScroll>
        <div className="relative h-48">
          <img src={CREATOR.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-px-bg via-transparent to-transparent" />
        </div>

        <div className="px-5 -mt-10 relative z-10">
          <div className="flex items-end gap-3 mb-4">
            <div className="relative">
              <img src={CREATOR.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover border-2 border-px-bg" />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-px-accent rounded-full flex items-center justify-center">
                <Icon.Edit />
              </button>
            </div>
            <div className="pb-1 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-px-text">{CREATOR.name}</h1>
                <svg className="w-5 h-5 text-px-violet" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              </div>
              <p className="text-sm text-px-muted">{CREATOR.specialization}</p>
            </div>
            <Btn size="sm" onClick={() => navigate('edit-profile')}><Icon.Edit />Edit</Btn>
          </div>

          <div className="flex gap-4 text-xs text-px-muted mb-4">
            <span className="flex items-center gap-1"><Icon.Location />{CREATOR.location}</span>
            <div className="flex items-center gap-1"><Stars rating={CREATOR.rating} small /><span>{CREATOR.rating} ({CREATOR.reviews})</span></div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Projects', value: `${CREATOR.reviews + 20}+` },
              { label: 'Experience', value: `${CREATOR.experience} yrs` },
              { label: 'Clients', value: '180+' },
            ].map(s => (
              <div key={s.label} className="bg-px-surface2 rounded-2xl p-3 text-center border border-px-border">
                <p className="text-base font-bold text-px-text">{s.value}</p>
                <p className="text-[10px] text-px-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <TabBar
            tabs={[{ id: 'portfolio', label: 'Portfolio' }, { id: 'services', label: 'Services' }, { id: 'reviews', label: 'Reviews' }]}
            active={tab}
            onChange={setTab}
          />

          <div className="pt-4 pb-4">
            {tab === 'portfolio' && (
              <div>
                <p className="text-sm text-px-muted mb-4 leading-relaxed">{CREATOR.bio}</p>
                <div className="grid grid-cols-3 gap-2">
                  {CREATOR.portfolio.map((src, i) => (
                    <PortfolioThumb key={i} src={src} onClick={() => navigate('creator-portfolio')} />
                  ))}
                </div>
              </div>
            )}
            {tab === 'services' && (
              <div className="flex flex-col gap-3">
                {CREATOR.services.map(s => (
                  <div key={s.id} className="bg-px-surface rounded-2xl p-4 border border-px-border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-px-text">{s.name}</h3>
                      <span className="text-sm font-bold text-px-accent">${s.price}</span>
                    </div>
                    <p className="text-xs text-px-muted">{s.description}</p>
                    <div className="flex gap-3 mt-2 text-xs text-px-muted">
                      <span>⏱ {s.duration}</span>
                      <span>📁 {s.deliverables}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'reviews' && (
              <div className="flex flex-col gap-3">
                <div className="bg-px-surface2 rounded-2xl p-4 flex items-center gap-4 border border-px-border">
                  <div className="text-center">
                    <p className="font-serif text-4xl text-px-accent">{CREATOR.rating}</p>
                    <Stars rating={CREATOR.rating} />
                    <p className="text-xs text-px-muted mt-1">{CREATOR.reviews} reviews</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-px-green font-medium">98% completion rate</p>
                    <p className="text-xs text-px-muted mt-1">Responds within 2 hours</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 33. Edit Profile ──────────────────────────────────────────────────────────

export function EditProfileScreen() {
  const { navigate, goBack } = useNav();
  const [name, setName] = useState(CREATOR.name);
  const [location, setLocation] = useState(CREATOR.location);
  const [bio, setBio] = useState(CREATOR.bio.slice(0, 120));
  const [specialization, setSpecialization] = useState('Wedding & Portrait');
  const [experience, setExperience] = useState('8');

  const specs = ['Wedding', 'Portrait', 'Fashion', 'Events', 'Corporate', 'Product', 'Travel', 'Sports'];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Edit Profile" right={
        <button onClick={() => navigate('creator-profile')} className="text-sm font-medium text-px-accent">Save</button>
      } />
      <ScreenScroll className="px-5 pt-4">
        {/* Avatar */}
        <div className="flex flex-col items-center py-4 mb-2">
          <div className="relative">
            <img src={CREATOR.avatar} alt="" className="w-24 h-24 rounded-2xl object-cover border-2 border-px-border" />
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-px-accent rounded-full flex items-center justify-center">
              <Icon.Camera />
            </button>
          </div>
          <button className="text-xs text-px-accent mt-3">Change Cover Photo</button>
        </div>

        <div className="flex flex-col gap-4 pb-6">
          <Input label="Display Name" value={name} onChange={setName} />
          <Input label="Location" value={location} onChange={setLocation} icon={<Icon.Location />} />
          <Input label="Experience (years)" value={experience} onChange={setExperience} type="number" />
          <div>
            <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Specializations</label>
            <div className="flex flex-wrap gap-2">
              {specs.map(s => (
                <button key={s} onClick={() => setSpecialization(s)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${specialization === s ? 'bg-px-accent text-px-bg border-px-accent' : 'border-px-border text-px-muted'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Input label="Bio" value={bio} onChange={setBio} textarea rows={5} />

          <Divider />

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-px-text mb-3">Social Links</h3>
            {['Instagram', 'Website', 'Behance'].map(s => (
              <div key={s} className="mb-3">
                <Input label={s} placeholder={`Your ${s} URL`} />
              </div>
            ))}
          </div>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 34. Professional Portfolio Management ─────────────────────────────────────

export function CreatorPortfolioScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('all');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-px-text">My Portfolio</h1>
          <Btn size="sm" onClick={() => navigate('add-portfolio')}><Icon.Plus /> Add</Btn>
        </div>
        <TabBar tabs={[{ id: 'all', label: 'All' }, { id: 'photos', label: 'Photos' }, { id: 'videos', label: 'Videos' }]} active={tab} onChange={setTab} />
      </div>
      <ScreenScroll className="px-5 pt-3">
        <div className="grid grid-cols-3 gap-2 pb-4">
          {CREATOR.portfolio.map((src, i) => (
            <div key={i} className="aspect-square relative rounded-xl overflow-hidden group bg-px-surface2">
              <img src={src} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Icon.Edit />
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => navigate('add-portfolio')}
            className="aspect-square rounded-xl border-2 border-dashed border-px-border flex flex-col items-center justify-center gap-1 text-px-muted hover:border-px-border2 transition-colors">
            <Icon.Plus />
            <p className="text-[10px]">Add</p>
          </button>
        </div>
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 35. Add Portfolio Project ─────────────────────────────────────────────────

export function AddPortfolioScreen() {
  const { navigate } = useNav();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');

  const cats = ['Wedding', 'Portrait', 'Fashion', 'Events', 'Corporate', 'Product', 'Travel'];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Add Portfolio Project" />
      <ScreenScroll className="px-5 pt-4">
        {/* Upload area */}
        <button className="w-full h-48 rounded-3xl border-2 border-dashed border-px-border flex flex-col items-center justify-center gap-3 text-px-muted mb-5 hover:border-px-accent/50 transition-colors">
          <Icon.Upload />
          <div className="text-center">
            <p className="text-sm font-medium">Upload Photos or Videos</p>
            <p className="text-xs mt-0.5">JPEG, PNG, MP4 · Max 100MB</p>
          </div>
        </button>

        <div className="flex flex-col gap-4 pb-4">
          <Input label="Project Title" placeholder="e.g. Coastal Wedding at Sunset" value={title} onChange={setTitle} />
          <div>
            <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {cats.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-all ${category === c ? 'bg-px-accent text-px-bg border-px-accent' : 'border-px-border text-px-muted'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <Input label="Description" placeholder="Describe this project..." value={desc} onChange={setDesc} textarea rows={3} />
          <Input label="Location" placeholder="Where was this taken?" value={location} onChange={setLocation} icon={<Icon.Location />} />
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('creator-portfolio')}>Publish to Portfolio</Btn>
      </div>
    </div>
  );
}

// ── 36. My Services ───────────────────────────────────────────────────────────

export function MyServicesScreen() {
  const { navigate } = useNav();

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-px-text">My Services</h1>
          <p className="text-xs text-px-muted">{CREATOR.services.length} active services</p>
        </div>
        <Btn size="sm" onClick={() => navigate('add-service')}><Icon.Plus /> Add</Btn>
      </div>
      <ScreenScroll className="px-5">
        <div className="flex flex-col gap-3 pb-4">
          {CREATOR.services.map(s => (
            <div key={s.id} className="bg-px-surface rounded-2xl border border-px-border p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-px-text">{s.name}</h3>
                <div className="flex gap-2 items-center">
                  <span className="text-lg font-bold text-px-accent">${s.price}</span>
                  <button className="text-px-muted"><Icon.Edit /></button>
                </div>
              </div>
              <p className="text-sm text-px-muted mb-3">{s.description}</p>
              <div className="flex gap-4 text-xs text-px-muted">
                <span>⏱ {s.duration}</span>
                <span>📁 {s.deliverables}</span>
              </div>
              <Divider className="my-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-px-green font-medium">● Active</span>
                <div className="flex gap-2">
                  <Btn size="sm" variant="ghost">Pause</Btn>
                  <Btn size="sm" variant="outline" onClick={() => navigate('add-service')}>Edit</Btn>
                </div>
              </div>
            </div>
          ))}
          <Btn fullWidth variant="outline" onClick={() => navigate('add-service')}>
            <Icon.Plus /> Add New Service
          </Btn>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 37. Add / Edit Service ────────────────────────────────────────────────────

export function AddServiceScreen() {
  const { navigate } = useNav();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [deliverables, setDeliverables] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Add Service" />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex flex-col gap-4 pb-4">
          <Input label="Service Name" placeholder="e.g. Wedding Full Day Coverage" value={name} onChange={setName} />
          <Input label="Description" placeholder="Describe what's included..." value={desc} onChange={setDesc} textarea rows={4} />
          <Input label="Base Price ($)" placeholder="e.g. 2800" value={price} onChange={setPrice} type="number" icon={<Icon.Dollar />} />
          <Input label="Duration" placeholder="e.g. 10 hours, Full day" value={duration} onChange={setDuration} />
          <Input label="Deliverables" placeholder="e.g. 500+ edited photos, online gallery" value={deliverables} onChange={setDeliverables} />

          {/* Packages section */}
          <div>
            <h3 className="text-sm font-semibold text-px-text mb-3">Packages</h3>
            {['Basic', 'Standard', 'Premium'].map((pkg, i) => (
              <div key={pkg} className="bg-px-surface rounded-2xl p-4 border border-px-border mb-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-px-text">{pkg}</p>
                  <button className="text-xs text-px-accent">Configure</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('my-services')}>Save Service</Btn>
      </div>
    </div>
  );
}

// ── 38. Availability Calendar ─────────────────────────────────────────────────

export function AvailabilityScreen() {
  const { navigate } = useNav();
  const [selectedDates, setSelectedDates] = useState<number[]>([15, 22, 28]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const datesInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstDay = 2; // October 2026 starts on Thursday

  function toggleDate(d: number) {
    setSelectedDates(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
  }

  const booked = [15, 28];
  const blocked = [10, 11, 12, 18];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Availability" right={
        <button className="text-sm text-px-accent font-medium">Save</button>
      } />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex items-center justify-between mb-4">
          <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
            <Icon.Back />
          </button>
          <h2 className="text-base font-semibold text-px-text">October 2026</h2>
          <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
            <Icon.ChevronRight />
          </button>
        </div>

        {/* Days header */}
        <div className="grid grid-cols-7 mb-2">
          {days.map(d => (
            <p key={d} className="text-center text-[10px] text-px-muted py-1">{d}</p>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} />)}
          {datesInMonth.map(d => {
            const isBooked = booked.includes(d);
            const isBlocked = blocked.includes(d);
            const isSelected = selectedDates.includes(d);
            return (
              <button
                key={d}
                onClick={() => !isBooked && !isBlocked && toggleDate(d)}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-medium transition-all ${
                  isBooked ? 'bg-px-green/20 text-px-green cursor-default' :
                  isBlocked ? 'bg-px-red/20 text-px-red cursor-not-allowed' :
                  isSelected ? 'bg-px-accent text-px-bg' :
                  'bg-px-surface2 text-px-muted hover:bg-px-surface3'
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-5">
          {[
            { color: 'bg-px-accent', label: 'Available' },
            { color: 'bg-px-green/40', label: 'Booked' },
            { color: 'bg-px-red/40', label: 'Blocked' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-xs text-px-muted">{l.label}</span>
            </div>
          ))}
        </div>

        {/* Quick set */}
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-3">Working Hours</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-px-surface2 rounded-xl p-3">
              <p className="text-xs text-px-muted">Start Time</p>
              <p className="text-sm font-semibold text-px-text">8:00 AM</p>
            </div>
            <div className="bg-px-surface2 rounded-xl p-3">
              <p className="text-xs text-px-muted">End Time</p>
              <p className="text-sm font-semibold text-px-text">6:00 PM</p>
            </div>
          </div>
        </div>
      </ScreenScroll>
    </div>
  );
}
