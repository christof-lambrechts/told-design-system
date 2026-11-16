import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import colorsCss from '../tokens/colors.css?raw';

const meta = { title: 'Fondations', parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** Noms des jetons sémantiques, lus dans le CSS généré depuis Figma. */
const semantic = [...new Set([...colorsCss.split("01-color/semantic : Light")[1].matchAll(/^\s*(--[a-z0-9-]+):/gm)].map((m) => m[1]))];
const groups: [string, RegExp][] = [
  ['Surfaces', /^--neutral-surface-(default|subtle|muted|strong|inverse|page|canvas|sidebar|overlay)$/],
  ['Bordures', /^--(neutral-border|control-border|danger-border)-/],
  ['Texte', /^--content-(default|muted|subtle)-/],
  ['Marque', /^--brand-(surface|border)-/],
  ['Statuts', /^--content-(success|danger|warning|brand)-default/],
  ['Encre et papier', /^--(ink|paper)-default$/],
  ['Étapes de l’éditeur', /^--step-/],
];

const card = { border: '1px solid var(--neutral-border-default)', borderRadius: 'var(--component-cards-md)', overflow: 'hidden', background: 'var(--neutral-surface-default)' };

function Swatch({ name }: { name: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const read = () => setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const o = new MutationObserver(read);
    o.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => o.disconnect();
  }, [name]);
  return (
    <div style={card}>
      <div style={{ height: 56, background: `var(${name})`, borderBottom: '1px solid var(--neutral-border-subtle)' }} />
      <div style={{ padding: '8px 10px' }}>
        <div className="text-body-12 semibold" style={{ wordBreak: 'break-all' }}>{name}</div>
        <div className="text-tag-xs" style={{ color: 'var(--content-subtle-default)' }}>{value}</div>
      </div>
    </div>
  );
}

const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 };

export const Couleurs: Story = {
  parameters: { docs: { description: { story: 'Jetons sémantiques de la collection Figma `01-color/semantic`. Basculer Clair / Sombre dans la barre du haut : chaque valeur suit son mode. Les composants n’utilisent que ces jetons, jamais les primitives.' } } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {groups.map(([title, re]) => (
        <section key={title}>
          <h3 className="text-h5" style={{ margin: '0 0 12px' }}>{title}</h3>
          <div style={grid}>
            {semantic.filter((n) => re.test(n)).map((n) => (
              <Swatch key={n} name={n} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};

const textStyles = [
  ['Heading/H1', 'text-h1'], ['Heading/H2', 'text-h2'], ['Heading/H3', 'text-h3'], ['Heading/H4', 'text-h4'], ['Heading/H5', 'text-h5'], ['Heading/H6', 'text-h6'],
  ['Body/18', 'text-body-18'], ['Body/16', 'text-body-16'], ['Body/14', 'text-body-14'], ['Body/12', 'text-body-12'], ['Body/10', 'text-body-10'],
  ['Other/Tag', 'text-tag'], ['Other/Tag Xs', 'text-tag-xs'],
];

export const Typographie: Story = {
  parameters: { docs: { description: { story: 'Plus Jakarta Sans Bold pour les titres, Figtree pour le texte (Regular, Medium, Semibold, Bold), DM Mono pour les étiquettes. Classes CSS : `.text-h1` … `.text-body-10`, plus `.medium`, `.semibold`, `.bold`.' } } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {textStyles.map(([n, c]) => (
        <div key={n} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'baseline', gap: 16 }}>
          <span className="text-tag-xs" style={{ color: 'var(--content-subtle-default)' }}>{n}</span>
          <span className={c}>Recueillez l’avis de vos utilisateurs</span>
        </div>
      ))}
    </div>
  ),
};

const spaces = ['025', '050', '100', '150', '200', '250', '300', '400', '500', '600', '800', '1000', '1200'];
const radii = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'];

export const EspacementsEtRayons: Story = {
  name: 'Espacements et rayons',
  parameters: { docs: { description: { story: 'Collection `02-spacing` (valeurs Desktop, plus petites en mobile) et `03-radius`. Élément arrondi dans un autre : rayon intérieur = rayon extérieur − marge.' } } },
  render: () => (
    <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {spaces.map((s) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="text-tag-xs" style={{ width: 90 }}>--base-{s}</span>
            <span style={{ height: 12, width: `var(--base-${s})`, background: 'var(--brand-surface-selected)', borderRadius: 2 }} />
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 96px)', gap: 16 }}>
        {radii.map((r) => (
          <div key={r} style={{ textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, margin: '0 auto', background: 'var(--brand-surface-muted)', border: '1px solid var(--brand-border-selected)', borderRadius: `var(--radius-${r})` }} />
            <span className="text-tag-xs">--radius-{r}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const shadows = ['shadow-flat-1', 'shadow-flat-2', 'shadow-flat-4', 'shadow-flat-8', 'shadow-fill-4', 'shadow-fill-8', 'shadow-inner-sidebar', 'shadow-glow-ai', 'shadow-glow-ai-strong', 'focus-ring'];

export const Ombres: Story = {
  parameters: { docs: { description: { story: 'Styles d’effet Figma. `shadow-glow-ai` pour la barre IA ; `focus-ring` pour le focus clavier.' } } },
  render: () => (
    <div style={{ ...grid, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 32, padding: 16 }}>
      {shadows.map((s) => (
        <div key={s} style={{ height: 96, borderRadius: 'var(--component-cards-lg)', background: 'var(--neutral-surface-default)', boxShadow: `var(--${s})`, display: 'grid', placeItems: 'center' }}>
          <span className="text-tag-xs">--{s}</span>
        </div>
      ))}
    </div>
  ),
};
