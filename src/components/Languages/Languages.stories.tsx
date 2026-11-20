import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageItem, TranslationTable, type TranslationGroup } from './Languages';
import { FormatCard, LogicRule, OptionToggle } from '../OptionSidebar/OptionDetails';
import { Select } from '../Select/Select';
import { Input } from '../Input/Input';

const meta = {
  title: 'Composants/Langues et reglages/Traduction',
  component: TranslationTable,
  parameters: { docs: { description: { component: 'TranslationTable : traduire un Told. Élément et langue par défaut restent fixes, les autres langues défilent. Une case vide est à traduire, une case en squelette est en cours de traduction.' } } },
} satisfies Meta<typeof TranslationTable>;
export default meta;

const groups: TranslationGroup[] = [
  { title: 'Étape 1 · Votre avis', pages: [{ title: 'Page 1', rows: [
    { id: 'q1', label: 'Question', values: { fr: 'Que pensez-vous de notre nouvelle fonctionnalité ?', en: 'What do you think of our new feature?', es: null } },
    { id: 'd1', label: 'Description', values: { fr: 'Notez de 1 à 5.', en: 'Rate from 1 to 5.' } },
  ] }] },
  { title: 'Textes communs', rows: [
    { id: 'next', label: 'Bouton · Suivant', values: { fr: 'Suivant', en: 'Next', es: 'Siguiente' } },
    { id: 'prev', label: 'Bouton · Précédent', values: { fr: 'Précédent', en: 'Previous' } },
  ] },
];

export const Tableau: StoryObj = {
  render: () => {
    const [g, setG] = useState(groups);
    return (
      <div style={{ width: 1000 }}>
        <TranslationTable languages={[{ code: 'fr', label: 'Français', isDefault: true }, { code: 'en', label: 'English' }, { code: 'es', label: 'Español' }]}
          groups={g} summary="3 langues · 3 textes à traduire" onTranslateWithAI={() => {}}
          onChange={(id, lang, v) => setG((gs) => gs.map((x) => ({ ...x, rows: x.rows?.map((r) => r.id === id ? { ...r, values: { ...r.values, [lang]: v } } : r), pages: x.pages?.map((p) => ({ ...p, rows: p.rows.map((r) => r.id === id ? { ...r, values: { ...r.values, [lang]: v } } : r) })) })))} />
      </div>
    );
  },
};

export const ListeDesLangues: StoryObj = {
  name: 'Liste des langues',
  render: () => {
    const [on, setOn] = useState({ en: true, es: false });
    return (
      <div style={{ width: 300, display: 'grid', gap: 2 }}>
        <LanguageItem code="fr" label="Français" isDefault selected />
        <LanguageItem code="en" label="English" enabled={on.en} onEnabledChange={(v) => setOn({ ...on, en: v })} />
        <LanguageItem code="es" label="Español" enabled={on.es} onEnabledChange={(v) => setOn({ ...on, es: v })} />
      </div>
    );
  },
};

export const Reglages: StoryObj = {
  name: 'Réglages (OptionContent)',
  render: () => {
    const [p, setP] = useState(true);
    const [f, setF] = useState('anchored');
    return (
      <div style={{ width: 326, display: 'grid', gap: 16 }}>
        <OptionToggle label="Barre de progression" active={p} onActiveChange={setP}>
          <Select size="md" value="steps" options={[{ value: 'steps', label: 'Étapes' }, { value: 'bar', label: 'Barre continue' }]} label="Style" />
        </OptionToggle>
        <FormatCard icon="format-infobulle" title="Ancré" help="Accroché à un élément de la page, au plus près du bouton expliqué." recommended selected={f === 'anchored'} onSelect={() => setF('anchored')} />
        <FormatCard icon="format-modale" title="Modale" help="Au centre de l’écran, au-dessus d’un voile." selected={f === 'modal'} onSelect={() => setF('modal')} />
        <LogicRule condition={<><Select size="sm" value="eq" options={[{ value: 'eq', label: 'est égale à' }]} /><Input size="sm" defaultValue="5" /></>}
          destination={<Select size="sm" value="end" options={[{ value: 'end', label: 'Message de fin' }]} />} onRemove={() => {}} />
        <LogicRule kind="else" destination={<Select size="sm" value="q2" options={[{ value: 'q2', label: 'Question 2' }]} />} />
      </div>
    );
  },
};
