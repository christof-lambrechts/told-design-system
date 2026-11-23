import { useEffect, useRef, useState, type CSSProperties, type ClipboardEvent, type KeyboardEvent, type ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Logo } from '../Logo/Logo';
import styles from './Auth.module.css';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/* ---------- CodeInput (8181:83416) + CodeDigit (8181:83342) ---------- */

export interface CodeInputProps {
  /** Les chiffres saisis (6 au plus). */
  value: string;
  onChange: (value: string) => void;
  length?: number;
  /** Message affiché sous les cases ; passe les cases en erreur. */
  error?: ReactNode;
  /** Secondes avant de pouvoir renvoyer le code (propriété Figma `hasCountdown`). 0 = lien actif. */
  countdown?: number;
  onResend?: () => void;
  autoFocus?: boolean;
  /** `success` : le code est bon. Les cases passent au vert une par une, se rejoignent au centre et laissent place à une coche ; puis `onVerified`. */
  status?: 'success';
  /** Change cette valeur (compteur) pour rejouer la secousse quand le même message d'erreur revient (nouvel essai incorrect). */
  errorKey?: number | string;
  /** Appelé à la fin de l'animation de validation (~1,2 s, 0,4 s en mouvement réduit) : passer à la page suivante. */
  onVerified?: () => void;
}

const STEP = 55; // largeur d'une case (48) + écart (7)

/** Code de vérification : 6 cases de 48 × 56, rayon 12, écart 7 et un espace de 8 au milieu. Le collage répartit les chiffres. */
export function CodeInput({ value, onChange, length = 6, error, countdown, onResend, autoFocus, status, onVerified, errorKey }: CodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [phase, setPhase] = useState<'idle' | 'success' | 'merging' | 'verified'>('idle');
  const done = useRef(onVerified); done.current = onVerified;
  const [shaking, setShaking] = useState(false);
  useEffect(() => {
    if (!error) return;
    setShaking(false);
    const r = requestAnimationFrame(() => setShaking(true));
    return () => cancelAnimationFrame(r);
  }, [error, errorKey]);
  useEffect(() => {
    if (status !== 'success') { setPhase('idle'); return; }
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setPhase('verified'); const t = setTimeout(() => done.current?.(), 400); return () => clearTimeout(t); }
    setPhase('success');
    const t1 = setTimeout(() => setPhase('merging'), length * 60 + 250);
    const t2 = setTimeout(() => setPhase('verified'), length * 60 + 550);
    const t3 = setTimeout(() => done.current?.(), length * 60 + 1150);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [status, length]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');
  const set = (i: number, d: string) => {
    const next = digits.slice();
    next[i] = d;
    onChange(next.join('').replace(/\s/g, '').slice(0, length));
  };
  const onKey = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft' && i > 0) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const d = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!d) return;
    e.preventDefault();
    onChange(d);
    refs.current[Math.min(d.length, length - 1)]?.focus();
  };
  const half = Math.ceil(length / 2);
  const mm = countdown ? `${Math.floor(countdown / 60)}:${String(countdown % 60).padStart(2, '0')}` : '';
  return (
    <div className={styles.code}>
      <div className={cx(styles.cases, phase !== 'idle' && styles[phase], !!error && shaking && styles.shake)} onAnimationEnd={() => setShaking(false)} role="group" aria-label="Code de vérification">
        {digits.map((d, i) => (
          <span key={i} style={{ display: 'contents' }}>
            {i === half && <span className={styles.gap} aria-hidden="true" />}
            <input
              ref={(el) => { refs.current[i] = el; }}
              className={cx(styles.digit, !!error && styles.digitError, phase !== 'idle' && styles.digitSuccess)}
              style={{ '--i': i, '--dx': `${((length - 1) / 2 - i) * STEP + (i < half ? 4 : -4)}px` } as CSSProperties}
              readOnly={phase !== 'idle'}
              inputMode="numeric"
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={d}
              aria-label={`Chiffre ${i + 1}`}
              aria-invalid={!!error}
              autoFocus={autoFocus && i === 0}
              onPaste={onPaste}
              onKeyDown={onKey(i)}
              onChange={(e) => {
                const ch = e.target.value.replace(/\D/g, '').slice(-1);
                set(i, ch);
                if (ch && i < length - 1) refs.current[i + 1]?.focus();
              }}
            />
          </span>
        ))}
        {phase !== 'idle' && <span className={styles.check} aria-hidden="true"><Icon name="tick-02" size={28} /></span>}
      </div>
      {phase !== 'idle' && <span className={styles.srOnly} role="status">Code vérifié</span>}
      {error && <p className={styles.error} role="alert">{error}</p>}
      {onResend && (
        <p className={cx(styles.resend, phase !== 'idle' && styles.fadeOut)}>
          <button type="button" className={styles.link} disabled={!!countdown} onClick={onResend}>Renvoyer le code</button>
          {countdown ? <span className={styles.muted}>dans {mm}</span> : null}
        </p>
      )}
    </div>
  );
}

/* ---------- PasswordStrength (8182:1187) ---------- */

export type PasswordLevel = 'weak' | 'medium' | 'good' | 'excellent';
const levelInfo: Record<PasswordLevel, [number, string, string]> = {
  weak: [1, 'Faible', 'danger'], medium: [2, 'Moyen', 'warning'], good: [3, 'Bon', 'success'], excellent: [4, 'Excellent', 'success'],
};

export interface PasswordStrengthProps {
  level: PasswordLevel;
  /** Propriété Figma `hasRules` : liste des règles avec leur état. */
  rules?: { label: string; ok: boolean }[];
}

/** Force du mot de passe : 4 segments de 4, écart 4, libellé du niveau, règles cochées. */
export function PasswordStrength({ level, rules }: PasswordStrengthProps) {
  const [n, label, tone] = levelInfo[level];
  return (
    <div className={styles.pw} data-tone={tone}>
      <div className={styles.gauge}>
        <div className={styles.segments} aria-hidden="true">
          {[1, 2, 3, 4].map((i) => <span key={i} className={cx(styles.seg, i <= n && styles.segOn)} />)}
        </div>
        <span className={styles.level} aria-live="polite">{label}</span>
      </div>
      {rules && (
        <ul className={styles.rules}>
          {rules.map((r) => (
            <li key={r.label} className={cx(styles.rule, r.ok && styles.ruleOk)}>
              <Icon name={r.ok ? 'tick-02' : 'cancel-01'} size={14} />{r.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ---------- DividerLabel (8182:1188) ---------- */

/** Séparateur avec libellé (« ou ») entre deux méthodes de connexion. */
export function DividerLabel({ children = 'ou' }: { children?: ReactNode }) {
  return <div className={styles.divider} role="separator"><span>{children}</span></div>;
}

/* ---------- SocialButton (8182:1247) ---------- */

const GoogleLogo = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);
const MicrosoftLogo = () => (
  <svg width="16" height="16" viewBox="0 0 21 21" aria-hidden="true">
    <rect x="1" y="1" width="9" height="9" fill="#F25022" /><rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
    <rect x="1" y="11" width="9" height="9" fill="#00A4EF" /><rect x="11" y="11" width="9" height="9" fill="#FFB900" />
  </svg>
);

export interface SocialButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  provider: 'google' | 'microsoft';
}

/** Connexion externe : bouton contour neutre md (34), logo du service à gauche, pleine largeur. */
export function SocialButton({ provider, className, children, ...rest }: SocialButtonProps) {
  return (
    <button type="button" className={cx(styles.social, className)} {...rest}>
      {provider === 'google' ? <GoogleLogo /> : <MicrosoftLogo />}
      <span>{children ?? `Continuer avec ${provider === 'google' ? 'Google' : 'Microsoft'}`}</span>
    </button>
  );
}

/* ---------- AuthPanel (8182:1367) ---------- */

export interface AuthPanelProps {
  /** Couleur de fond selon le contexte d'arrivée. */
  theme?: 'default' | 'website' | 'mobile' | 'email';
  title?: ReactNode;
  /** Propriétés Figma `subtitle` + `hasSubtitle`. */
  subtitle?: ReactNode;
  /** Illustration du bas (image ou composant). */
  illustration?: ReactNode;
  className?: string;
}

/** Colonne de marque des écrans de connexion : logo, accroche, illustration. Marges 64, écart 32. */
export function AuthPanel({ theme = 'default', title = 'Écoutez vos utilisateurs, là où ils sont.', subtitle = 'Questionnaires, product tours et annonces dans votre produit, en quelques minutes.', illustration, className }: AuthPanelProps) {
  return (
    <aside className={cx(styles.panel, className)} data-theme-panel={theme}>
      <div className={styles.panelTop}>
        <Logo size="lg" />
        <div className={styles.pitch}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      {illustration && <div className={styles.illu}>{illustration}</div>}
    </aside>
  );
}
