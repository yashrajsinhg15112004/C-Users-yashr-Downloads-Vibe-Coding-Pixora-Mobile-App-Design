import { useState, useEffect } from 'react';
import { useNav } from '../context';
import { Btn, Input, Icon } from '../components/UI';
import { ScreenScroll } from '../components/Layout';

// ── 1. Splash Screen ──────────────────────────────────────────────────────────

export function SplashScreen() {
  const { navigate } = useNav();
  useEffect(() => {
    const t = setTimeout(() => navigate('welcome'), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-px-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1770301312795-abdc6deee5a8?w=800&h=1000&fit=crop&auto=format"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-px-bg/80 via-transparent to-px-bg" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-3xl bg-px-accent flex items-center justify-center shadow-2xl">
          <svg className="w-10 h-10 text-px-bg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div className="text-center">
          <h1 className="font-serif text-4xl text-px-text tracking-tight">Pixora</h1>
          <p className="text-px-muted text-sm mt-1 tracking-widest uppercase">Creative Hiring Platform</p>
        </div>
        <div className="flex gap-1.5 mt-4">
          {[0,1,2].map(i => (
            <div key={i} className={`h-1 rounded-full bg-px-accent transition-all duration-300 ${i === 0 ? 'w-6' : 'w-2 opacity-40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── 2. Welcome Screen ─────────────────────────────────────────────────────────

export function WelcomeScreen() {
  const { navigate } = useNav();
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1542992933-ce75d0187ec1?w=800&h=900&fit=crop&auto=format"
          alt="Photographer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-px-bg via-px-bg/40 to-transparent" />
        <div className="absolute top-8 left-6">
          <div className="w-10 h-10 rounded-2xl bg-px-accent/90 flex items-center justify-center">
            <span className="font-serif text-lg text-px-bg font-bold">P</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-6">
          <h1 className="font-serif text-4xl text-px-text leading-tight mb-2">
            Your perfect shot starts here
          </h1>
          <p className="text-px-muted text-sm leading-relaxed">
            Connect with world-class photographers and videographers for any occasion.
          </p>
        </div>
      </div>
      <div className="bg-px-bg px-6 pt-6 pb-8 flex flex-col gap-3">
        <Btn fullWidth size="lg" onClick={() => navigate('choose-role')}>Get Started</Btn>
        <Btn fullWidth size="lg" variant="outline" onClick={() => navigate('login')}>Sign In</Btn>
        <p className="text-center text-xs text-px-muted mt-2">
          By continuing you agree to our{' '}
          <span className="text-px-accent">Terms</span> &{' '}
          <span className="text-px-accent">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}

// ── 3. Choose Role Screen ─────────────────────────────────────────────────────

export function ChooseRoleScreen() {
  const { navigate, setUserType, goBack } = useNav();
  const [selected, setSelected] = useState<'client' | 'creator' | null>(null);

  function proceed() {
    if (!selected) return;
    setUserType(selected);
    navigate('signup', { role: selected });
  }

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4 pb-2">
        <button onClick={goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted mb-6">
          <Icon.Back />
        </button>
        <h1 className="font-serif text-3xl text-px-text mb-1">How will you use Pixora?</h1>
        <p className="text-px-muted text-sm">Choose your role to get started.</p>
      </div>
      <ScreenScroll className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <RoleCard
            icon="📸"
            title="Hire a Professional"
            desc="Find and book talented photographers and videographers for your events, projects and shoots."
            active={selected === 'client'}
            onClick={() => setSelected('client')}
            image="https://images.unsplash.com/photo-1770301312795-abdc6deee5a8?w=600&h=300&fit=crop&auto=format"
          />
          <RoleCard
            icon="🎬"
            title="I'm a Creator"
            desc="Showcase your portfolio, get discovered by clients, and grow your photography or videography career."
            active={selected === 'creator'}
            onClick={() => setSelected('creator')}
            image="https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=600&h=300&fit=crop&auto=format"
          />
        </div>
      </ScreenScroll>
      <div className="px-6 pb-8 pt-4">
        <Btn fullWidth size="lg" disabled={!selected} onClick={proceed}>Continue</Btn>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, desc, active, onClick, image }: {
  icon: string; title: string; desc: string; active: boolean; onClick: () => void; image: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-3xl overflow-hidden border-2 transition-all text-left ${active ? 'border-px-accent' : 'border-px-border'}`}
    >
      <div className="relative h-36">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {active && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-px-accent rounded-full flex items-center justify-center">
            <Icon.Check />
          </div>
        )}
      </div>
      <div className="p-5 bg-px-surface">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className="text-base font-semibold text-px-text">{title}</h3>
        </div>
        <p className="text-sm text-px-muted leading-relaxed">{desc}</p>
      </div>
    </button>
  );
}

// ── 4. Login Screen ───────────────────────────────────────────────────────────

export function LoginScreen() {
  const { navigate, goBack, userType } = useNav();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    navigate(userType === 'creator' ? 'creator-home' : 'client-home');
  }

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4">
        <button onClick={goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted mb-6">
          <Icon.Back />
        </button>
        <h1 className="font-serif text-3xl text-px-text mb-1">Welcome back</h1>
        <p className="text-px-muted text-sm">Sign in to your Pixora account</p>
      </div>
      <ScreenScroll className="px-6 py-6">
        <div className="flex flex-col gap-4">
          <Input label="Email" placeholder="you@example.com" value={email} onChange={setEmail} type="email" />
          <div>
            <Input label="Password" placeholder="••••••••" value={password} onChange={setPassword} type="password" />
            <button onClick={() => navigate('forgot-password')} className="text-xs text-px-accent mt-2 block ml-auto">Forgot password?</button>
          </div>
          <Btn fullWidth size="lg" onClick={handleLogin} className="mt-2">Sign In</Btn>
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-px-border" />
            <span className="text-xs text-px-muted">or continue with</span>
            <div className="flex-1 h-px bg-px-border" />
          </div>
          <div className="flex gap-3">
            {['G', 'A'].map(s => (
              <button key={s} className="flex-1 h-12 rounded-2xl border border-px-border bg-px-surface flex items-center justify-center text-sm font-semibold text-px-text hover:bg-px-surface2 transition-colors">
                {s === 'G' ? '🔵 Google' : '⬛ Apple'}
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-px-muted mt-4">
            Don't have an account?{' '}
            <button onClick={() => navigate('signup')} className="text-px-accent font-medium">Sign up</button>
          </p>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 5. Sign Up Screen ─────────────────────────────────────────────────────────

export function SignUpScreen() {
  const { navigate, goBack, userType } = useNav();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4">
        <button onClick={goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted mb-6">
          <Icon.Back />
        </button>
        <h1 className="font-serif text-3xl text-px-text mb-1">Create account</h1>
        <p className="text-px-muted text-sm">Join Pixora as a {userType === 'creator' ? 'creative professional' : 'client'}</p>
      </div>
      <ScreenScroll className="px-6 py-6">
        <div className="flex flex-col gap-4">
          <Input label="Full Name" placeholder="Jordan Smith" value={name} onChange={setName} />
          <Input label="Email" placeholder="you@example.com" value={email} onChange={setEmail} type="email" />
          <Input label="Password" placeholder="Min 8 characters" value={password} onChange={setPassword} type="password" />
          <div className="bg-px-surface2 rounded-2xl p-4 border border-px-border">
            <p className="text-xs text-px-muted">Password must contain:</p>
            <div className="flex flex-col gap-1.5 mt-2">
              {['8+ characters', 'One uppercase letter', 'One number or symbol'].map(r => (
                <div key={r} className="flex items-center gap-2 text-xs text-px-muted">
                  <div className="w-3.5 h-3.5 rounded-full border border-px-border2 flex items-center justify-center" />
                  {r}
                </div>
              ))}
            </div>
          </div>
          <Btn fullWidth size="lg" onClick={() => navigate('otp')} className="mt-2">Create Account</Btn>
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-px-border" />
            <span className="text-xs text-px-muted">or</span>
            <div className="flex-1 h-px bg-px-border" />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 h-12 rounded-2xl border border-px-border bg-px-surface text-sm font-medium text-px-text">🔵 Google</button>
            <button className="flex-1 h-12 rounded-2xl border border-px-border bg-px-surface text-sm font-medium text-px-text">⬛ Apple</button>
          </div>
          <p className="text-center text-sm text-px-muted mt-2">
            Already have an account?{' '}
            <button onClick={() => navigate('login')} className="text-px-accent font-medium">Sign in</button>
          </p>
        </div>
      </ScreenScroll>
    </div>
  );
}

// ── 6. Forgot Password ────────────────────────────────────────────────────────

export function ForgotPasswordScreen() {
  const { navigate, goBack } = useNav();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4">
        <button onClick={goBack} className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted mb-6">
          <Icon.Back />
        </button>
        {!sent ? (
          <>
            <h1 className="font-serif text-3xl text-px-text mb-1">Reset password</h1>
            <p className="text-px-muted text-sm">Enter your email to receive a reset link.</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-3xl bg-px-green/15 flex items-center justify-center text-3xl mb-4">📧</div>
            <h1 className="font-serif text-3xl text-px-text mb-1">Check your email</h1>
            <p className="text-px-muted text-sm">We sent a reset link to <span className="text-px-text">{email}</span></p>
          </>
        )}
      </div>
      <div className="px-6 py-8 flex flex-col gap-4">
        {!sent ? (
          <>
            <Input label="Email" placeholder="you@example.com" value={email} onChange={setEmail} type="email" />
            <Btn fullWidth size="lg" onClick={() => setSent(true)}>Send Reset Link</Btn>
          </>
        ) : (
          <>
            <Btn fullWidth size="lg" onClick={() => navigate('otp')}>Open Email App</Btn>
            <Btn fullWidth size="lg" variant="ghost" onClick={() => setSent(false)}>Try Different Email</Btn>
            <p className="text-center text-xs text-px-muted">
              Didn't receive? <button className="text-px-accent">Resend in 60s</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── 7. OTP Verification ───────────────────────────────────────────────────────

export function OTPScreen() {
  const { navigate, userType } = useNav();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  function handleDigit(i: number, val: string) {
    if (val.length > 1) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
  }

  const complete = digits.every(d => d !== '');

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4">
        <div className="w-9 h-9 rounded-2xl bg-px-surface2 flex items-center justify-center text-px-muted mb-6">
          <Icon.Back />
        </div>
        <div className="w-14 h-14 rounded-3xl bg-px-accent/15 flex items-center justify-center text-2xl mb-4">🔐</div>
        <h1 className="font-serif text-3xl text-px-text mb-1">Enter OTP</h1>
        <p className="text-px-muted text-sm">We sent a 6-digit code to your email</p>
      </div>
      <div className="px-6 py-8 flex flex-col gap-8">
        <div className="flex gap-3 justify-between">
          {digits.map((d, i) => (
            <input
              key={i}
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              className="w-12 h-14 rounded-2xl bg-px-surface2 border-2 border-px-border text-center text-xl font-bold text-px-text outline-none focus:border-px-accent transition-colors"
            />
          ))}
        </div>
        <div>
          <Btn fullWidth size="lg" disabled={!complete} onClick={() => navigate('create-profile')}>Verify Code</Btn>
          <p className="text-center text-sm text-px-muted mt-4">
            Didn't receive? <button className="text-px-accent font-medium">Resend Code</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── 8. Create Profile ─────────────────────────────────────────────────────────

export function CreateProfileScreen() {
  const { navigate, userType } = useNav();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [specialization, setSpecialization] = useState('');

  function finish() {
    navigate(userType === 'creator' ? 'creator-home' : 'client-home');
  }

  const specs = ['Wedding', 'Portrait', 'Fashion', 'Events', 'Corporate', 'Documentary', 'Product', 'Travel'];

  return (
    <div className="flex-1 flex flex-col bg-px-bg">
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl text-px-text">Create your profile</h1>
          <button onClick={finish} className="text-sm text-px-muted">Skip</button>
        </div>
        <div className="flex gap-1 mb-4">
          {[1,2,3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= 2 ? 'bg-px-accent' : 'bg-px-border'}`} />
          ))}
        </div>
      </div>
      <ScreenScroll className="px-6">
        <div className="flex flex-col gap-5 pb-6">
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-px-surface2 border-2 border-dashed border-px-border flex items-center justify-center">
                <Icon.Camera />
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-px-accent rounded-full flex items-center justify-center">
                <Icon.Plus />
              </button>
            </div>
            <p className="text-xs text-px-muted">Add profile photo</p>
          </div>
          <Input label="Display Name" placeholder="Jordan Smith" value={name} onChange={setName} />
          <Input label="Location" placeholder="New York, NY" value={location} onChange={setLocation} icon={<Icon.Location />} />
          {userType === 'creator' && (
            <>
              <div>
                <label className="text-xs font-medium text-px-muted uppercase tracking-wide block mb-2">Specialization</label>
                <div className="flex flex-wrap gap-2">
                  {specs.map(s => (
                    <button
                      key={s}
                      onClick={() => setSpecialization(s)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${specialization === s ? 'bg-px-accent text-px-bg border-px-accent' : 'border-px-border text-px-muted'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Bio" placeholder="Tell clients about your style and experience..." value={bio} onChange={setBio} textarea rows={4} />
            </>
          )}
        </div>
      </ScreenScroll>
      <div className="px-6 pb-8 pt-4">
        <Btn fullWidth size="lg" onClick={finish}>Complete Profile</Btn>
      </div>
    </div>
  );
}
