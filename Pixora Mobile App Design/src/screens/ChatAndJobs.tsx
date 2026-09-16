import { useState, useRef, useEffect } from 'react';
import { useNav } from '../context';
import { MESSAGES, CHAT_MESSAGES, PROJECTS } from '../data';
import { Btn, Input, Icon, StatusBadge, SectionHeader, Badge } from '../components/UI';
import { TopBar, ScreenScroll, BottomNav } from '../components/Layout';

// ── 20. Messages List ─────────────────────────────────────────────────────────

export function MessagesListScreen() {
  const { navigate } = useNav();
  const [search, setSearch] = useState('');
  const filtered = MESSAGES.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-px-text">Messages</h1>
          <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
            <Icon.Edit />
          </button>
        </div>
        <div className="flex items-center gap-3 bg-px-surface2 rounded-2xl border border-px-border px-4 py-3">
          <span className="text-px-muted"><Icon.Search /></span>
          <input placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-px-text placeholder-px-muted2 outline-none" />
        </div>
      </div>
      <ScreenScroll>
        {filtered.map(m => (
          <button key={m.id} onClick={() => navigate('chat', { userId: m.id })}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-px-surface transition-colors w-full text-left">
            <div className="relative flex-shrink-0">
              <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-2xl object-cover" />
              {m.online && <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-px-green rounded-full border-2 border-px-bg" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-sm font-semibold text-px-text">{m.name}</p>
                <span className="text-xs text-px-muted">{m.time}</span>
              </div>
              <p className="text-xs text-px-muted truncate">{m.lastMessage}</p>
            </div>
            {m.unread > 0 && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-px-accent flex items-center justify-center text-[10px] font-bold text-px-bg">
                {m.unread}
              </span>
            )}
          </button>
        ))}
      </ScreenScroll>
      <BottomNav />
    </div>
  );
}

// ── 21. Chat Screen ───────────────────────────────────────────────────────────

export function ChatScreen() {
  const { navigate, current } = useNav();
  const userId = current.params.userId as string ?? 'm1';
  const contact = MESSAGES.find(m => m.id === userId) ?? MESSAGES[0];
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send() {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: `c${Date.now()}`, from: 'me', text: input, time: 'Now' }]);
    setInput('');
  }

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-px-border bg-px-bg">
        <button onClick={() => navigate('messages')} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
          <Icon.Back />
        </button>
        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-2xl object-cover" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-px-text">{contact.name}</p>
          <p className="text-xs text-px-green">{contact.online ? 'Online now' : 'Last seen recently'}</p>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
            <Icon.Phone />
          </button>
          <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
            <Icon.Video />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'} gap-2`}>
              {m.from !== 'me' && (
                <img src={contact.avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-auto" />
              )}
              <div className="max-w-[72%]">
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'me'
                    ? 'bg-px-accent text-px-bg rounded-br-sm'
                    : 'bg-px-surface2 text-px-text rounded-bl-sm border border-px-border'
                }`}>
                  {m.text}
                </div>
                <p className={`text-[10px] text-px-muted mt-1 ${m.from === 'me' ? 'text-right' : ''}`}>{m.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto">
        {['Send project details', 'Share location', 'Request quote'].map(a => (
          <button key={a} onClick={() => a === 'Send project details' ? navigate('send-project') : undefined}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-px-surface2 border border-px-border text-xs text-px-muted hover:text-px-text">
            {a}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 pb-8 pt-2 border-t border-px-border bg-px-surface">
        <button className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted">
          <Icon.Paperclip />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 bg-px-surface2 border border-px-border rounded-2xl px-4 py-3 text-sm text-px-text placeholder-px-muted2 outline-none focus:border-px-accent transition-colors"
        />
        <button onClick={send} className="w-9 h-9 rounded-2xl bg-px-accent flex items-center justify-center text-px-bg">
          <Icon.Send />
        </button>
      </div>
    </div>
  );
}

// ── 22. Send Project Details ──────────────────────────────────────────────────

export function SendProjectScreen() {
  const { navigate, goBack } = useNav();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Send Project Details" />
      <ScreenScroll className="px-5 pt-4">
        <p className="text-sm text-px-muted mb-5">Share your project brief with the creator so they can prepare a tailored proposal.</p>
        <div className="flex flex-col gap-4">
          <Input label="Project Title" placeholder="e.g. Wedding Photography Oct 15" value={title} onChange={setTitle} />
          <Input label="Description" placeholder="Describe your project, style preferences, references..." value={desc} onChange={setDesc} textarea rows={4} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Date" placeholder="Event date" value={date} onChange={setDate} icon={<Icon.Calendar />} />
            <Input label="Budget" placeholder="Your budget" value={budget} onChange={setBudget} icon={<Icon.Dollar />} />
          </div>
          <div>
            <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Attach References</label>
            <button className="w-full h-28 rounded-2xl border-2 border-dashed border-px-border flex flex-col items-center justify-center gap-2 text-px-muted hover:border-px-border2 transition-colors">
              <Icon.Upload />
              <p className="text-sm">Upload images or files</p>
              <p className="text-xs">Max 10MB each</p>
            </button>
          </div>
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4 flex gap-3">
        <Btn variant="outline" onClick={goBack}>Cancel</Btn>
        <Btn fullWidth onClick={() => navigate('chat')}>Send Details</Btn>
      </div>
    </div>
  );
}

// ── 24. Post a Project ────────────────────────────────────────────────────────

export function PostProjectScreen() {
  const { navigate } = useNav();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [req, setReq] = useState('');

  const cats = ['Wedding', 'Portrait', 'Events', 'Fashion', 'Corporate', 'Product', 'Documentary', 'Music Video'];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Post a Project" />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex flex-col gap-4 pb-4">
          <Input label="Project Title" placeholder="e.g. Wedding Photography for Oct 15" value={title} onChange={setTitle} />

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

          <Input label="Description" placeholder="Describe your project in detail..." value={desc} onChange={setDesc} textarea rows={4} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Location" placeholder="City, State" value={location} onChange={setLocation} icon={<Icon.Location />} />
            <Input label="Date" placeholder="Project date" value={date} onChange={setDate} icon={<Icon.Calendar />} />
          </div>
          <Input label="Budget Range" placeholder="e.g. $1,500 – $2,500" value={budget} onChange={setBudget} icon={<Icon.Dollar />} />
          <Input label="Requirements" placeholder="Experience needed, equipment, style preferences..." value={req} onChange={setReq} textarea rows={3} />

          <div>
            <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Reference Images (Optional)</label>
            <button className="w-full h-24 rounded-2xl border-2 border-dashed border-px-border flex items-center justify-center gap-3 text-px-muted">
              <Icon.Upload />
              <p className="text-sm">Upload references</p>
            </button>
          </div>
        </div>
      </ScreenScroll>
      <div className="px-5 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={() => navigate('my-projects')}>Post Project</Btn>
      </div>
    </div>
  );
}

// ── 25. My Projects ───────────────────────────────────────────────────────────

export function MyProjectsScreen() {
  const { navigate } = useNav();

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-px-text">My Projects</h1>
        <Btn size="sm" onClick={() => navigate('post-project')}>
          <Icon.Plus /> Post
        </Btn>
      </div>
      <ScreenScroll className="px-5">
        {PROJECTS.length === 0 ? (
          <div className="mt-8">
            <div className="w-16 h-16 rounded-3xl bg-px-surface2 flex items-center justify-center text-3xl mb-4 mx-auto">📂</div>
            <p className="text-center text-base font-semibold text-px-text mb-2">No projects yet</p>
            <p className="text-center text-sm text-px-muted mb-6">Post a project to start receiving proposals from professionals.</p>
            <Btn fullWidth onClick={() => navigate('post-project')}>Post Your First Project</Btn>
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-4">
            {PROJECTS.map(p => (
              <button key={p.id} onClick={() => navigate('project-details', { projectId: p.id })}
                className="bg-px-surface rounded-2xl border border-px-border p-4 text-left hover:border-px-border2 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-px-text flex-1 pr-2">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-px-muted mb-3 line-clamp-2">{p.description}</p>
                <div className="flex gap-4 text-xs text-px-muted mb-3">
                  <span className="flex items-center gap-1"><Icon.Calendar /> {p.date}</span>
                  <span className="flex items-center gap-1"><Icon.Location /> {p.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-px-accent">{p.budget}</span>
                  <span className="text-xs text-px-muted">{p.applications} applications</span>
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

// ── 26. Project Details ───────────────────────────────────────────────────────

export function ProjectDetailsScreen() {
  const { navigate, current } = useNav();
  const pid = current.params.projectId as string ?? 'pr1';
  const project = PROJECTS.find(p => p.id === pid) ?? PROJECTS[0];

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Project Details" right={
        <button className="text-px-muted text-sm text-px-accent">Edit</button>
      } />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex items-center justify-between mb-3">
          <Badge color="accent">{project.category}</Badge>
          <StatusBadge status={project.status} />
        </div>
        <h1 className="text-xl font-semibold text-px-text mb-2">{project.title}</h1>
        <p className="text-sm text-px-muted leading-relaxed mb-4">{project.description}</p>

        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '📅', label: 'Date', value: project.date },
              { icon: '📍', label: 'Location', value: project.location },
              { icon: '💰', label: 'Budget', value: project.budget },
              { icon: '🕐', label: 'Posted', value: project.posted },
            ].map(d => (
              <div key={d.label}>
                <p className="text-lg mb-1">{d.icon}</p>
                <p className="text-xs text-px-muted">{d.label}</p>
                <p className="text-sm font-medium text-px-text">{d.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-px-text">{project.applications}</p>
              <p className="text-xs text-px-muted">Applications received</p>
            </div>
            <Btn onClick={() => navigate('applications', { projectId: project.id })}>View Proposals</Btn>
          </div>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 27. Applications / Proposals ──────────────────────────────────────────────

import { PROFESSIONALS } from '../data';

export function ApplicationsScreen() {
  const { navigate } = useNav();
  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Proposals (12)" />
      <ScreenScroll className="px-5 pt-4">
        <div className="flex flex-col gap-3 pb-4">
          {PROFESSIONALS.map((pro, i) => (
            <button key={pro.id} onClick={() => navigate('accept-reject', { proId: pro.id })}
              className="bg-px-surface rounded-2xl border border-px-border p-4 text-left hover:border-px-border2">
              <div className="flex items-center gap-3 mb-3">
                <img src={pro.avatar} alt={pro.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-px-text">{pro.name}</p>
                    {pro.verified && <svg className="w-3.5 h-3.5 text-px-violet" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                  </div>
                  <p className="text-xs text-px-muted">{pro.specialization} · {pro.experience} yrs exp</p>
                </div>
                <span className="text-sm font-bold text-px-accent">${(pro.price * 8).toLocaleString()}</span>
              </div>
              <p className="text-xs text-px-muted mb-3 line-clamp-2">
                {i === 0 ? "I would love to be part of your special day. With 8 years of wedding photography experience and over 150 weddings captured, I know how to tell your love story beautifully." :
                 i === 1 ? "Having photographed in Brooklyn many times, I know exactly the best lighting spots and timings. My editorial style would be perfect for your occasion." :
                 "I specialize in documentary-style coverage that feels authentic and emotional. My clients always rave about how natural the photos feel."}
              </p>
              <div className="flex gap-2">
                <Btn size="sm" onClick={() => navigate('accept-reject', { proId: pro.id })}>Accept</Btn>
                <Btn size="sm" variant="outline">View Profile</Btn>
              </div>
            </button>
          ))}
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 29. Accept / Reject Proposal ──────────────────────────────────────────────

export function AcceptRejectScreen() {
  const { navigate, current } = useNav();
  const proId = current.params.proId as string ?? 'p1';
  const pro = PROFESSIONALS.find(p => p.id === proId) ?? PROFESSIONALS[0];
  const [decision, setDecision] = useState<'accept' | 'reject' | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-px-bg overflow-hidden">
      <TopBar title="Review Proposal" />
      <ScreenScroll className="px-5 pt-4">
        <div className="bg-px-surface rounded-2xl p-4 border border-px-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={pro.avatar} alt={pro.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div>
              <p className="text-base font-bold text-px-text">{pro.name}</p>
              <p className="text-xs text-px-muted">{pro.specialization}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-px-yellow text-sm">★</span>
                <span className="text-sm font-semibold text-px-text">{pro.rating}</span>
                <span className="text-xs text-px-muted">({pro.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-px-border mb-4" />
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-px-surface2 rounded-xl p-3">
              <p className="text-xs text-px-muted">Proposed Price</p>
              <p className="text-lg font-bold text-px-accent">${(pro.price * 8).toLocaleString()}</p>
            </div>
            <div className="bg-px-surface2 rounded-xl p-3">
              <p className="text-xs text-px-muted">Availability</p>
              <p className="text-sm font-semibold text-px-green">{pro.available ? 'Confirmed' : 'On Request'}</p>
            </div>
          </div>
          <div className="bg-px-surface2 rounded-xl p-3">
            <p className="text-xs text-px-muted mb-1">Message</p>
            <p className="text-sm text-px-text leading-relaxed">
              I would love to be part of your special day. With {pro.experience} years of experience capturing beautiful moments, I can guarantee stunning results that exceed your expectations.
            </p>
          </div>
        </div>

        {!decision ? (
          <div className="flex gap-3 mb-4">
            <button onClick={() => setDecision('reject')}
              className="flex-1 h-14 rounded-2xl border border-px-red/40 bg-px-red/10 text-px-red font-medium text-sm flex items-center justify-center gap-2">
              <Icon.X /> Decline
            </button>
            <button onClick={() => setDecision('accept')}
              className="flex-1 h-14 rounded-2xl bg-px-green text-white font-medium text-sm flex items-center justify-center gap-2">
              <Icon.Check /> Accept
            </button>
          </div>
        ) : (
          <div className={`rounded-2xl p-4 mb-4 text-center ${decision === 'accept' ? 'bg-px-green/10 border border-px-green/30' : 'bg-px-red/10 border border-px-red/30'}`}>
            <p className={`font-semibold mb-1 ${decision === 'accept' ? 'text-px-green' : 'text-px-red'}`}>
              {decision === 'accept' ? '✅ Proposal Accepted!' : '❌ Proposal Declined'}
            </p>
            <p className="text-xs text-px-muted">
              {decision === 'accept' ? `${pro.name} will be notified and the booking will proceed.` : `${pro.name} has been notified.`}
            </p>
          </div>
        )}
        {decision === 'accept' && (
          <Btn fullWidth onClick={() => navigate('chat')}>Message {pro.name}</Btn>
        )}
      </ScreenScroll>
    </div>
  );
}
