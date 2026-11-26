import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GuidedPlayer, type GuidedStep } from './GuidedPlayer';
import { ValueCorrection } from './ValueCorrection';
import { AmbientBackground } from '../Ambient/AmbientBackground';
import { WidgetButton } from '../Widget/Widget';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = { title: 'Gabarits/Lecteur Record/GuidedPlayer', component: GuidedPlayer, parameters: { layout: 'padded' } } satisfies Meta<typeof GuidedPlayer>;
export default meta;

/* Capture fictive « Clients · relances » (SVG local, aucune ressource distante). */
const ROWS = [['Menuiserie Kerbrat', 'Claire Morvan', '4 812,37 €'], ['Atelier Ombelle', 'Hugo Lestrade', '980,00 €'], ['Garage Kervella', 'Inès Caradec', '12 406,20 €'], ['Boulangerie du Port', '', '2 115,80 €'], ['Transports Ruellan', 'Yann Le Goff', '7 330,00 €']];
const capture = (highlight = -1) => {
  const rows = ROWS.map((r, i) => {
    const y = 130 + i * 52;
    return `<text x="190" y="${y}" font-size="15" fill="#1f2429">${r[0]}</text>${r[1] ? `<text x="420" y="${y}" font-size="15" fill="#1f2429">${r[1]}</text>` : `<rect x="420" y="${y - 12}" width="96" height="14" rx="3" fill="#dfe5ea"/>`}<text x="640" y="${y}" font-size="15" fill="#1f2429">${r[2]}</text><line x1="190" x2="840" y1="${y + 20}" y2="${y + 20}" stroke="#e8ecf0"/>${i === highlight ? `<rect x="560" y="${y + 30}" width="120" height="30" rx="6" fill="#1a63ff"/>` : ''}`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="480" viewBox="0 0 900 480" font-family="Arial, sans-serif"><rect width="900" height="480" fill="#fff"/><rect width="160" height="480" fill="#122e4a"/>${[0, 1, 2, 3, 4].map((i) => `<rect x="24" y="${40 + i * 30}" width="110" height="6" rx="3" fill="${i === 1 ? '#c9d3dc' : '#5a7089'}"/>`).join('')}<text x="190" y="48" font-size="18" font-weight="bold" fill="#122e4a">Clients · relances</text><text x="190" y="92" font-size="12" fill="#6c8091">Client</text><text x="420" y="92" font-size="12" fill="#6c8091">Contact</text><text x="640" y="92" font-size="12" fill="#6c8091">Montant dû</text>${rows}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const STEPS: GuidedStep[] = Array.from({ length: 6 }, (_, i) => ({
  id: `s${i + 1}`, image: capture(i % 5), width: 900, height: 480, alt: `Étape ${i + 1}`, duration: 3000,
  cursor: { x: 0.69, y: (160 + (i % 5) * 52) / 480 },
  zoom: i === 2 ? { x: 0.69, y: 0.6, scale: 1.6 } : undefined,
  tooltip: i === 2 ? 'Le zoom suit le point cliqué.' : `Clique sur « Relancer » pour la ligne ${(i % 5) + 1}.`,
}));

export const Etapes: StoryObj = {
  name: 'Départ, étapes, fin',
  render: () => (
    <div style={{ maxWidth: 900 }}>
      <GuidedPlayer steps={STEPS}
        start={{ title: 'Relancer un client', description: '6 étapes · environ 20 s', actions: <WidgetButton>Commencer la démo</WidgetButton> }}
        end={{ title: 'Prêt à essayer ?', description: 'Relance tes clients en moins d’une minute.', actions: <><WidgetButton>Essayer gratuitement</WidgetButton><WidgetButton variant="secondary" surface="dark">Rejouer la démo</WidgetButton></> }} />
    </div>
  ),
};

/* R-50 et R-51 : la démo jouée avec les données fictives, une valeur à regarder sur l'image, la pellicule pour afficher une étape. */
export const ResultatDonneesFictives: StoryObj = {
  name: 'Résultat des données fictives (R-50, R-51, R-55)',
  parameters: { layout: 'fullscreen' },
  render: function Render() {
    const [index, setIndex] = useState(0);
    const [seen, setSeen] = useState<Set<number>>(new Set());
    const [contact, setContact] = useState('Yann Le Goff');
    const [blocking, setBlocking] = useState(false);
    const steps: GuidedStep[] = STEPS.map((s) => ({
      ...s, tooltip: undefined, cursor: undefined, zoom: undefined,
      overlays: s.id === 's3' || s.id === 's5' ? [{ id: 'contact', x: 415 / 900, y: 320 / 480, width: 104 / 900, height: 26 / 480,
        content: <ValueCorrection value={contact} tone={blocking ? 'blocking' : 'review'} description="L’IA n’est pas sûre de ce nom. Il apparaît sur 3 étapes."
          note="Appliquer refait les 3 images (1 à 2 s)." onApply={setContact} onKeep={() => {}} /> }] : [],
    }));
    return (
      <AmbientBackground tone="lavender" intensity="pale" style={{ minHeight: '100vh' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 16px', display: 'grid', gap: 16 }}>
          <GuidedPlayer steps={steps} state="step" index={index} onIndexChange={setIndex}
            onStepShown={(i) => setSeen((v) => (v.has(i) ? v : new Set(v).add(i)))} />
          <div style={{ display: 'flex', gap: 6 }}>
            {steps.map((s, i) => (
              <button key={s.id} type="button" onClick={() => setIndex(i)} aria-label={`Étape ${i + 1}${s.overlays?.length ? ', une valeur à regarder' : ''}`} aria-current={i === index ? 'step' : undefined}
                style={{ all: 'unset', cursor: 'pointer', width: 68, height: 40, borderRadius: 6, overflow: 'hidden', position: 'relative', outline: i === index ? '2px solid var(--brand-primary-500)' : '1px solid var(--neutral-border-default)', opacity: seen.has(i) ? 1 : 0.6 }}>
                <img src={s.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {s.overlays?.length ? <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: 'var(--orange-500)' }} /> : null}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge color="orange" appearance="subtle" size="sm">{seen.size} / {steps.length} images vues</Badge>
            <Button size="sm" color="neutral" variant="secondary-outline" onClick={() => setBlocking(!blocking)}>{blocking ? 'Revenir à « à regarder »' : 'Voir le cas bloquant (R-55)'}</Button>
            <Button size="md" color="neutral" disabled={seen.size < steps.length}>Créer la démo · {steps.length} étapes</Button>
          </div>
        </div>
      </AmbientBackground>
    );
  },
};

export const Fonds: StoryObj = {
  name: 'AmbientBackground',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 240px)', gap: 12 }}>
      {(['lavender', 'brand'] as const).flatMap((tone) => (['pale', 'soft', 'medium', 'vivid'] as const).map((intensity) => (
        <AmbientBackground key={tone + intensity} tone={tone} intensity={intensity} style={{ height: 160, borderRadius: 12 }}>
          <span style={{ display: 'block', padding: 12, font: '12px/16px var(--font-family-body)' }}>{tone} · {intensity}</span>
        </AmbientBackground>
      )))}
      <AmbientBackground tone="lavender" intensity="soft" animated style={{ height: 160, borderRadius: 12, gridColumn: 'span 4' }}>
        <span style={{ display: 'block', padding: 12, font: '12px/16px var(--font-family-body)' }}>animated (aucun mouvement avec la réduction des animations)</span>
      </AmbientBackground>
    </div>
  ),
};
