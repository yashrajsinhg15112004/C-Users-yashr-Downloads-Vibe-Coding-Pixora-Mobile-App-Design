import { useState } from 'react';
import { useNav } from '../context';
import { PROFESSIONALS, CATEGORIES, BOOKINGS } from '../data';
import {
  Btn, Input, Avatar, Stars, Badge, SectionHeader, ProCardHorizontal, ProCardVertical,
  PortfolioThumb, Chip, Divider, TabBar, StatusBadge, Icon, EmptyState,
} from '../components/UI';
import { TopBar, ScreenScroll, BottomNav } from '../components/Layout';

// ── 9. Client Home Dashboard ──────────────────────────────────────────────────

export function ClientHomeScreen() {
  const { navigate } = useNav();
  const [catActive, setCatActive] = useState('wedding');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-px-bg">
      <ScreenScroll>
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between">
          <div>
            <p className="text-xs text-px-muted">Good morning 👋</p>
            <h1 className="text-lg font-semibold text-px-text">Find your creator</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('notifications')} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
              <Icon.Bell dot />
            </button>
            <button onClick={() => navigate('profile')} className="w-9 h-9 rounded-full overflow-hidden border-2 border-px-accent">
              <img src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=80&h=80&fit=crop&auto=format" alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* Location pill */}
        <button onClick={() => navigate('location')} className="mx-5 mb-3 flex items-center gap-2 bg-px-surface2 rounded-2xl px-3.5 py-2.5 border border-px-border text-left w-[calc(100%-2.5rem)]">
          <span className="text-px-accent"><Icon.Location /></span>
          <span className="text-sm text-px-text">New York, NY</span>
          <span className="ml-auto text-px-muted"><Icon.ChevronDown /></span>
        </button>

        {/* Search bar */}
        <button onClick={() => navigate('search')} className="mx-5 mb-5 flex items-center gap-3 bg-px-surface rounded-2xl border border-px-border px-4 py-3.5">
          <span className="text-px-muted"><Icon.Search /></span>
          <span className="text-sm text-px-muted">Search photographers, videographers...</span>
        </button>

        {/* Categories */}
        <div className="px-5 mb-5">
          <SectionHeader title="Popular Categories" action="See all" onAction={() => navigate('search')} />
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                onClick={() => { setCatActive(c.id); navigate('search'); }}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border transition-all ${catActive === c.id ? 'bg-px-accent/15 border-px-accent' : 'bg-px-surface border-px-border'}`}
              >
                <span className="text-xl">{c.icon}</span>
                <span className={`text-[10px] font-medium whitespace-nowrap ${catActive === c.id ? 'text-px-accent' : 'text-px-muted'}`}>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recommended horizontal */}
        <div className="mb-5">
          <div className="px-5 mb-3">
            <SectionHeader title="Recommended for You" action="See all" onAction={() => navigate('search')} />
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto pb-1">
            {PROFESSIONALS.slice(0, 4).map(p => (
              <ProCardVertical key={p.id} pro={p} onClick={() => navigate('pro-profile', { proId: p.id })} />
            ))}
          </div>
        </div>

        {/* Nearby list */}
        <div className="px-5 mb-5">
          <SectionHeader title="Near New York" action="See all" onAction={() => navigate('search')} />
          <div className="flex flex-col gap-3 mt-3">
            {PROFESSIONALS.filter(p => p.location.includes('New York')).map(p => (
              <ProCardHorizontal key={p.id} pro={p} onClick={() => navigate('pro-profile', { proId: p.id })} />
            ))}
          </div>
        </div>

        {/* Featured Portfolio */}
        <div className="px-5 mb-5">
          <SectionHeader title="Featured Portfolios" action="Browse" onAction={() => navigate('search')} />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {PROFESSIONALS.flatMap(p => p.portfolio.slice(0, 2)).slice(0, 6).map((src, i) => (
              <PortfolioThumb key={i} src={src} onClick={() => navigate('portfolio-gallery', { proId: PROFESSIONALS[Math.floor(i/2)].id })} />
            ))}
          </div>
        </div>

        <div className="h-4" />
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 10. Location Screen ───────────────────────────────────────────────────────

export function LocationScreen() {
  const { navigate, goBack } = useNav();
  const [search, setSearch] = useState('');
  const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX', 'San Francisco, CA', 'Miami, FL', 'Seattle, WA', 'Boston, MA'];
  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <TopBar title="Select Location" />
      <div className="px-5 pt-4">
        <div className="flex items-center gap-3 bg-px-surface2 rounded-2xl border border-px-border px-4 py-3 mb-4">
          <span className="text-px-muted"><Icon.Search /></span>
          <input
            placeholder="Search city or area..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-px-text placeholder-px-muted2 outline-none"
          />
        </div>
      </div>
      <ScreenScroll className="px-5">
        <button
          onClick={() => { navigate('client-home'); }}
          className="w-full flex items-center gap-3 p-4 rounded-2xl bg-px-accent/10 border border-px-accent/30 mb-4"
        >
          <span className="text-px-accent text-lg">📍</span>
          <div className="text-left">
            <p className="text-sm font-semibold text-px-text">Use Current Location</p>
            <p className="text-xs text-px-muted">New York, NY (detected)</p>
          </div>
        </button>
        <p className="text-xs font-medium text-px-muted uppercase tracking-wide mb-3">Popular Cities</p>
        {filtered.map(city => (
          <button
            key={city}
            onClick={() => navigate('client-home')}
            className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-px-surface2 transition-colors mb-1"
          >
            <span className="text-px-muted"><Icon.Location /></span>
            <div className="text-left">
              <p className="text-sm text-px-text">{city}</p>
              <p className="text-xs text-px-muted">{Math.floor(Math.random() * 200 + 50)} professionals</p>
            </div>
            <span className="ml-auto text-px-muted"><Icon.ChevronRight /></span>
          </button>
        ))}
      </ScreenScroll>
    </div>
  );
}

// ── 11. Search Results ────────────────────────────────────────────────────────

export function SearchResultsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('photographers');
  const [query, setQuery] = useState('');
  const filtered = PROFESSIONALS.filter(p => tab === 'photographers' ? p.type === 'Photographer' : p.type === 'Videographer');

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <TopBar title="" />
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center gap-2 bg-px-surface2 rounded-2xl border border-px-border px-4 py-3 mb-4">
          <span className="text-px-muted"><Icon.Search /></span>
          <input
            placeholder="Search by name, style, or location..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-px-text placeholder-px-muted2 outline-none"
          />
          <button onClick={() => navigate('filter')} className="text-px-accent ml-1">
            <Icon.Filter />
          </button>
        </div>
        <TabBar
          tabs={[{ id: 'photographers', label: 'Photographers' }, { id: 'videographers', label: 'Videographers' }]}
          active={tab}
          onChange={setTab}
        />
      </div>
      <ScreenScroll className="px-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-px-muted">{filtered.length} results found</p>
          <button className="text-xs text-px-accent">Sort: Top Rated</button>
        </div>
        <div className="flex flex-col gap-3 pb-4">
          {filtered.map(p => (
            <ProCardHorizontal key={p.id} pro={p} onClick={() => navigate('pro-profile', { proId: p.id })} />
          ))}
        </div>
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 12. Filter Screen ─────────────────────────────────────────────────────────

export function FilterScreen() {
  const { navigate } = useNav();
  const [priceRange, setPriceRange] = useState([100, 800]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedExp, setSelectedExp] = useState<string | null>(null);
  const [available, setAvailable] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-px-border">
        <button onClick={() => navigate('search')} className="text-sm text-px-muted">Cancel</button>
        <h1 className="text-sm font-semibold text-px-text">Filters</h1>
        <button className="text-sm text-px-accent">Reset</button>
      </div>
      <ScreenScroll className="px-5 py-4">
        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-px-text mb-3">Price Range (per hour)</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-px-accent font-medium">${priceRange[0]}</span>
            <span className="text-sm text-px-accent font-medium">${priceRange[1]}</span>
          </div>
          <div className="h-1.5 bg-px-surface2 rounded-full relative">
            <div className="absolute h-full bg-px-accent rounded-full" style={{ left: '10%', right: '20%' }} />
          </div>
        </div>
        <Divider className="mb-6" />

        {/* Rating */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-px-text mb-3">Minimum Rating</h3>
          <div className="flex gap-2">
            {[4, 4.5, 4.8].map(r => (
              <button key={r} onClick={() => setSelectedRating(r)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm transition-all ${selectedRating === r ? 'border-px-accent bg-px-accent/10 text-px-accent' : 'border-px-border text-px-muted'}`}>
                ⭐ {r}+
              </button>
            ))}
          </div>
        </div>
        <Divider className="mb-6" />

        {/* Experience */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-px-text mb-3">Experience</h3>
          <div className="flex gap-2 flex-wrap">
            {['1-3 years', '3-5 years', '5-8 years', '8+ years'].map(e => (
              <button key={e} onClick={() => setSelectedExp(e)}
                className={`px-3 py-2 rounded-xl border text-sm transition-all ${selectedExp === e ? 'border-px-accent bg-px-accent/10 text-px-accent' : 'border-px-border text-px-muted'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>
        <Divider className="mb-6" />

        {/* Specialization */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-px-text mb-3">Specialization</h3>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.slice(0, 6).map(c => (
              <Chip key={c.id} label={c.label} />
            ))}
          </div>
        </div>
        <Divider className="mb-6" />

        {/* Availability */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-px-text">Available Now</h3>
            <p className="text-xs text-px-muted">Show only available professionals</p>
          </div>
          <button onClick={() => setAvailable(!available)}
            className={`w-11 h-6 rounded-full transition-all ${available ? 'bg-px-accent' : 'bg-px-surface3'}`}>
            <div className={`w-5 h-5 bg-white rounded-full m-0.5 transition-transform ${available ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('search')}>Apply Filters</Btn>
      </div>
    </div>
  );
}

// ── 13. Professional Profile ──────────────────────────────────────────────────

export function ProfessionalProfileScreen() {
  const { navigate, current } = useNav();
  const proId = current.params.proId as string ?? 'p1';
  const pro = PROFESSIONALS.find(p => p.id === proId) ?? PROFESSIONALS[0];
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-px-bg">
      <ScreenScroll>
        {/* Cover */}
        <div className="relative h-56">
          <img src={pro.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-px-bg via-transparent to-transparent" />
          <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
            <button onClick={() => navigate('search')} className="w-9 h-9 rounded-2xl bg-black/40 backdrop-blur flex items-center justify-center text-white">
              <Icon.Back />
            </button>
            <div className="flex gap-2">
              <button onClick={() => setLiked(!liked)} className={`w-9 h-9 rounded-2xl bg-black/40 backdrop-blur flex items-center justify-center ${liked ? 'text-px-red' : 'text-white'}`}>
                <Icon.Heart filled={liked} />
              </button>
              <button className="w-9 h-9 rounded-2xl bg-black/40 backdrop-blur flex items-center justify-center text-white">
                <Icon.Share />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-5 -mt-8 relative z-10">
          <div className="flex items-end gap-3 mb-4">
            <img src={pro.avatar} alt={pro.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-px-bg" />
            <div className="pb-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h1 className="text-xl font-bold text-px-text">{pro.name}</h1>
                {pro.verified && (
                  <svg className="w-5 h-5 text-px-violet" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-px-muted">{pro.specialization}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5 text-xs text-px-muted">
              <Icon.Location />
              {pro.location}
            </div>
            <div className="flex items-center gap-1 text-xs text-px-muted">
              <Stars rating={pro.rating} small />
              <span>{pro.rating} ({pro.reviews})</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: 'Projects', value: `${pro.reviews + 20}+` },
              { label: 'Experience', value: `${pro.experience} yrs` },
              { label: 'From', value: `$${pro.price}/${pro.priceUnit}` },
            ].map(s => (
              <div key={s.label} className="bg-px-surface2 rounded-2xl p-3 text-center border border-px-border">
                <p className="text-base font-bold text-px-text">{s.value}</p>
                <p className="text-[10px] text-px-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Availability badge */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl mb-5 ${pro.available ? 'bg-px-green/10 border border-px-green/30' : 'bg-px-red/10 border border-px-red/30'}`}>
            <span className={`w-2 h-2 rounded-full ${pro.available ? 'bg-px-green' : 'bg-px-red'}`} />
            <span className={`text-sm font-medium ${pro.available ? 'text-px-green' : 'text-px-red'}`}>
              {pro.available ? 'Available for bookings' : 'Currently unavailable'}
            </span>
          </div>

          {/* Tabs */}
          <TabBar
            tabs={[
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'services', label: 'Services' },
              { id: 'reviews', label: 'Reviews' },
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />

          {/* Tab content */}
          <div className="pt-4 pb-4">
            {activeTab === 'portfolio' && (
              <div>
                <p className="text-sm text-px-muted mb-3 leading-relaxed">{pro.bio}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {pro.tags.map(t => <Badge key={t} color="accent">{t}</Badge>)}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {pro.portfolio.map((src, i) => (
                    <PortfolioThumb key={i} src={src} onClick={() => navigate('portfolio-gallery', { proId: pro.id, startIndex: i })} />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'services' && (
              <div className="flex flex-col gap-3">
                {pro.services.map(s => (
                  <button key={s.id} onClick={() => navigate('service-details', { service: s, proId: pro.id })}
                    className="bg-px-surface rounded-2xl p-4 border border-px-border text-left hover:border-px-border2 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold text-px-text">{s.name}</h3>
                      <span className="text-sm font-bold text-px-accent">${s.price}</span>
                    </div>
                    <p className="text-xs text-px-muted mb-2">{s.description}</p>
                    <div className="flex gap-3 text-xs text-px-muted">
                      <span>⏱ {s.duration}</span>
                      <span>📁 {s.deliverables}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="flex flex-col gap-3">
                <div className="bg-px-surface2 rounded-2xl p-4 flex items-center gap-4 border border-px-border mb-2">
                  <div className="text-center">
                    <p className="font-serif text-4xl text-px-accent">{pro.rating}</p>
                    <Stars rating={pro.rating} />
                    <p className="text-xs text-px-muted mt-1">{pro.reviews} reviews</p>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map(n => (
                      <div key={n} className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-px-muted w-3">{n}</span>
                        <div className="flex-1 h-1.5 bg-px-surface3 rounded-full">
                          <div className="h-full bg-px-accent rounded-full" style={{ width: n === 5 ? '78%' : n === 4 ? '15%' : '5%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {[
                  { name: 'Emily W.', avatar: 'https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=60&h=60&fit=crop&auto=format', rating: 5, text: 'Marcus was absolutely incredible at our wedding. Every shot was perfect.', date: 'Sep 10, 2026' },
                  { name: 'David K.', avatar: 'https://images.unsplash.com/photo-1475274226786-e636f48a5645?w=60&h=60&fit=crop&auto=format', rating: 5, text: 'Professional, creative and delivered beyond expectations.', date: 'Aug 22, 2026' },
                  { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1542992933-ce75d0187ec1?w=60&h=60&fit=crop&auto=format', rating: 4, text: 'Great work, very easy to communicate with.', date: 'Jul 15, 2026' },
                ].map(r => (
                  <div key={r.name} className="bg-px-surface rounded-2xl p-4 border border-px-border">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-px-text">{r.name}</p>
                        <Stars rating={r.rating} small />
                      </div>
                      <span className="text-xs text-px-muted">{r.date}</span>
                    </div>
                    <p className="text-sm text-px-muted">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScreenScroll>

      {/* Bottom CTA */}
      <div className="flex gap-3 px-5 pb-8 pt-4 bg-px-surface border-t border-px-border">
        <button onClick={() => navigate('chat')} className="w-12 h-12 rounded-2xl bg-px-surface2 border border-px-border flex items-center justify-center text-px-muted hover:text-px-text transition-colors">
          <Icon.Message />
        </button>
        <Btn fullWidth onClick={() => navigate('booking-request', { proId: pro.id })}>Book Now · ${pro.price}/{pro.priceUnit}</Btn>
      </div>
    </div>
  );
}

// ── 14. Portfolio Gallery ─────────────────────────────────────────────────────

export function PortfolioGalleryScreen() {
  const { navigate, current } = useNav();
  const proId = current.params.proId as string ?? 'p1';
  const pro = PROFESSIONALS.find(p => p.id === proId) ?? PROFESSIONALS[0];
  const [active, setActive] = useState((current.params.startIndex as number) ?? 0);
  const [tab, setTab] = useState('all');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title={`${pro.name}'s Portfolio`} right={
        <button className="text-px-muted"><Icon.Share /></button>
      } />
      <div className="px-5 pt-2">
        <TabBar tabs={[{ id: 'all', label: 'All' }, { id: 'photo', label: 'Photos' }, { id: 'video', label: 'Videos' }]} active={tab} onChange={setTab} />
      </div>
      <ScreenScroll>
        {/* Featured image */}
        <div className="px-5 pt-4 pb-3">
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <img src={pro.portfolio[active]} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 px-5 pb-4 overflow-x-auto">
          {pro.portfolio.map((src, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${active === i ? 'border-px-accent' : 'border-transparent'}`}>
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="px-5 pb-4">
          <p className="text-xs font-medium text-px-muted uppercase tracking-wide mb-3">All Work ({pro.portfolio.length})</p>
          <div className="grid grid-cols-2 gap-2">
            {pro.portfolio.map((src, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="aspect-square rounded-2xl overflow-hidden bg-px-surface2 relative">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                {active === i && (
                  <div className="absolute inset-0 ring-2 ring-px-accent ring-inset rounded-2xl" />
                )}
              </button>
            ))}
          </div>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 15. Service Details ───────────────────────────────────────────────────────

export function ServiceDetailsScreen() {
  const { navigate, current } = useNav();
  const proId = current.params.proId as string ?? 'p1';
  const pro = PROFESSIONALS.find(p => p.id === proId) ?? PROFESSIONALS[0];
  const service = (current.params.service as typeof pro.services[0]) ?? pro.services[0];

  const addons = [
    { name: 'Rush delivery (48hr)', price: 200 },
    { name: 'Printed album (50 pages)', price: 350 },
    { name: 'Extra hour coverage', price: pro.price },
  ];
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  function toggleAddon(name: string) {
    setSelectedAddons(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  }

  const total = service.price + selectedAddons.reduce((acc, name) => {
    const a = addons.find(a => a.name === name);
    return acc + (a?.price ?? 0);
  }, 0);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Service Details" />
      <ScreenScroll className="px-5 pt-4">
        <div className="bg-px-surface rounded-3xl border border-px-border p-5 mb-4">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-lg font-semibold text-px-text">{service.name}</h2>
            <span className="font-serif text-2xl text-px-accent">${service.price}</span>
          </div>
          <p className="text-sm text-px-muted leading-relaxed mb-4">{service.description}</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Duration', value: service.duration, icon: '⏱' },
              { label: 'Deliverables', value: service.deliverables, icon: '📁' },
              { label: 'Format', value: 'JPEG + RAW', icon: '🖼' },
              { label: 'Delivery', value: '7-14 days', icon: '📦' },
            ].map(d => (
              <div key={d.label} className="bg-px-surface2 rounded-2xl p-3 border border-px-border">
                <p className="text-lg mb-1">{d.icon}</p>
                <p className="text-xs text-px-muted">{d.label}</p>
                <p className="text-xs font-semibold text-px-text mt-0.5">{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional */}
        <div className="flex items-center gap-3 bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-xl object-cover" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-px-text">{pro.name}</p>
            <div className="flex items-center gap-1">
              <Stars rating={pro.rating} small />
              <span className="text-xs text-px-muted">{pro.rating} ({pro.reviews})</span>
            </div>
          </div>
          <button onClick={() => navigate('pro-profile', { proId: pro.id })} className="text-xs text-px-accent">View Profile</button>
        </div>

        {/* Add-ons */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-3">Optional Add-ons</h3>
          <div className="flex flex-col gap-2">
            {addons.map(a => (
              <button
                key={a.name}
                onClick={() => toggleAddon(a.name)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${selectedAddons.includes(a.name) ? 'border-px-accent bg-px-accent/5' : 'border-px-border bg-px-surface'}`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${selectedAddons.includes(a.name) ? 'border-px-accent bg-px-accent' : 'border-px-border'}`}>
                  {selectedAddons.includes(a.name) && <Icon.Check />}
                </div>
                <span className="flex-1 text-sm text-px-text text-left">{a.name}</span>
                <span className="text-sm font-semibold text-px-accent">+${a.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </ScreenScroll>

      <div className="px-5 pb-8 pt-4 bg-px-surface border-t border-px-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-px-muted">Total</span>
          <span className="text-xl font-bold text-px-accent">${total}</span>
        </div>
        <Btn fullWidth size="lg" onClick={() => navigate('booking-request', { proId: pro.id, service })}>Book This Service</Btn>
      </div>
    </div>
  );
}

// ── 16. Booking Request ───────────────────────────────────────────────────────

export function BookingRequestScreen() {
  const { navigate, current } = useNav();
  const proId = current.params.proId as string ?? 'p1';
  const pro = PROFESSIONALS.find(p => p.id === proId) ?? PROFESSIONALS[0];
  const [eventType, setEventType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [msg, setMsg] = useState('');
  const [budget, setBudget] = useState('');

  const eventTypes = ['Wedding', 'Portrait', 'Event', 'Corporate', 'Fashion', 'Other'];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Booking Request" />
      <ScreenScroll className="px-5 pt-4">
        {/* Pro info */}
        <div className="flex items-center gap-3 bg-px-surface rounded-2xl p-4 border border-px-border mb-5">
          <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="text-sm font-semibold text-px-text">{pro.name}</p>
            <p className="text-xs text-px-muted">{pro.specialization}</p>
          </div>
          <span className="ml-auto text-sm font-bold text-px-accent">${pro.price}/{pro.priceUnit}</span>
        </div>

        {/* Event type */}
        <div className="mb-4">
          <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Event / Project Type</label>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map(e => (
              <button key={e} onClick={() => setEventType(e)}
                className={`px-3 py-2 rounded-full text-sm border transition-all ${eventType === e ? 'bg-px-accent text-px-bg border-px-accent' : 'border-px-border text-px-muted'}`}>
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input label="Date" placeholder="Select date" value={date} onChange={setDate} type="date" icon={<Icon.Calendar />} />
          <Input label="Time" placeholder="Start time" value={time} onChange={setTime} type="time" />
        </div>
        <Input label="Location / Venue" placeholder="Where is the shoot?" value={location} onChange={setLocation} icon={<Icon.Location />} className="mb-4" />
        <Input label="Estimated Budget" placeholder="e.g. $2,000 – $3,000" value={budget} onChange={setBudget} icon={<Icon.Dollar />} className="mb-4" />
        <Input label="Additional Message" placeholder="Tell the photographer about your vision, references, special requirements..." value={msg} onChange={setMsg} textarea rows={4} className="mb-4" />

        <div className="h-4" />
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('booking-confirm')}>Send Booking Request</Btn>
      </div>
    </div>
  );
}

// ── 17. Booking Confirmation ──────────────────────────────────────────────────

export function BookingConfirmationScreen() {
  const { navigate } = useNav();
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-px-bg px-8 text-center">
      <div className="w-24 h-24 rounded-full bg-px-green/15 flex items-center justify-center text-5xl mb-6">
        ✅
      </div>
      <h1 className="font-serif text-3xl text-px-text mb-2">Request Sent!</h1>
      <p className="text-px-muted text-sm leading-relaxed mb-2">
        Your booking request has been sent to <span className="text-px-text font-medium">Marcus Rivera</span>.
      </p>
      <p className="text-px-muted text-sm mb-8">
        You'll receive a notification once they respond.
      </p>
      <div className="bg-px-surface rounded-3xl p-5 border border-px-border w-full text-left mb-8">
        <div className="flex flex-col gap-3">
          {[
            { icon: '📸', label: 'Professional', value: 'Marcus Rivera' },
            { icon: '📅', label: 'Date', value: 'Oct 15, 2026' },
            { icon: '⏰', label: 'Time', value: '2:00 PM' },
            { icon: '📍', label: 'Location', value: 'Brooklyn, NY' },
            { icon: '💰', label: 'Estimated', value: '$2,800' },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-3">
              <span className="text-lg">{r.icon}</span>
              <span className="text-sm text-px-muted flex-1">{r.label}</span>
              <span className="text-sm font-medium text-px-text">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Btn fullWidth onClick={() => navigate('my-bookings')}>View My Bookings</Btn>
        <Btn fullWidth variant="outline" onClick={() => navigate('chat')}>Message Marcus</Btn>
      </div>
    </div>
  );
}

// ── 18. My Bookings ───────────────────────────────────────────────────────────

export function MyBookingsScreen() {
  const { navigate } = useNav();
  const [tab, setTab] = useState('upcoming');
  const statuses = ['upcoming', 'pending', 'completed', 'cancelled'];
  const filtered = BOOKINGS.filter(b => b.status === tab);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="My Bookings" noBack />
      <div className="px-5 pt-2">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {statuses.map(s => (
            <Chip key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} active={tab === s} onClick={() => setTab(s)} />
          ))}
        </div>
      </div>
      <ScreenScroll className="px-5">
        {filtered.length === 0 ? (
          <EmptyState icon="📅" title="No bookings" body={`You have no ${tab} bookings.`} action="Browse Professionals" onAction={() => navigate('search')} />
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {filtered.map(b => (
              <button key={b.id} onClick={() => navigate('booking-details', { bookingId: b.id })}
                className="bg-px-surface rounded-2xl border border-px-border p-4 text-left hover:border-px-border2 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <img src={b.professional.avatar} alt={b.professional.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-px-text">{b.professional.name}</p>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-px-muted">{b.type}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-px-muted">
                  <span className="flex items-center gap-1"><Icon.Calendar /> {b.date}</span>
                  <span className="flex items-center gap-1"><Icon.Location /> {b.location.split(',')[0]}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-px-accent">${b.amount.toLocaleString()}</span>
                  <span className="text-xs text-px-muted">{b.status === 'completed' ? 'Paid' : `Deposit: $${b.paid}`}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 19. Booking Details ───────────────────────────────────────────────────────

export function BookingDetailsScreen() {
  const { navigate, current } = useNav();
  const bookingId = current.params.bookingId as string ?? 'b1';
  const booking = BOOKINGS.find(b => b.id === bookingId) ?? BOOKINGS[0];
  const pro = booking.professional;

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Booking Details" right={
        <button className="text-px-muted"><Icon.Share /></button>
      } />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex items-center gap-3 bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <img src={pro.avatar} alt={pro.name} className="w-14 h-14 rounded-2xl object-cover" />
          <div className="flex-1">
            <p className="text-base font-semibold text-px-text">{pro.name}</p>
            <p className="text-xs text-px-muted">{pro.specialization}</p>
            <Stars rating={pro.rating} small />
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Event Details */}
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-3">Event Details</h3>
          {[
            { icon: '📸', label: 'Service', value: booking.type },
            { icon: '📅', label: 'Date', value: booking.date },
            { icon: '⏰', label: 'Time', value: booking.time },
            { icon: '📍', label: 'Location', value: booking.location },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-3 mb-3 last:mb-0">
              <span className="text-lg w-8">{r.icon}</span>
              <span className="text-xs text-px-muted w-16">{r.label}</span>
              <span className="text-sm text-px-text">{r.value}</span>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <h3 className="text-sm font-semibold text-px-text mb-3">Payment</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-px-muted">Total Amount</span>
            <span className="text-sm font-bold text-px-text">${booking.amount.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-px-muted">Paid</span>
            <span className="text-sm font-bold text-px-green">${booking.paid.toLocaleString()}</span>
          </div>
          {booking.paid < booking.amount && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-px-muted">Balance Due</span>
              <span className="text-sm font-bold text-px-accent">${(booking.amount - booking.paid).toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-4">
          <Btn fullWidth onClick={() => navigate('chat')}>Message {pro.name}</Btn>
          {booking.status === 'upcoming' && (
            <>
              <Btn fullWidth variant="outline">Reschedule</Btn>
              <Btn fullWidth variant="danger">Cancel Booking</Btn>
            </>
          )}
        </div>
      </ScreenScroll>
    </div>
  );
}
