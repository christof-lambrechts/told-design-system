import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthPanel, CodeInput, DividerLabel, PasswordStrength, SocialButton } from './Auth';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

const meta = {
  title: 'Composants/Connexion/Auth',
  component: CodeInput,
  parameters: { docs: { description: { component: 'Écrans de connexion, d’inscription et de vérification. AuthPanel donne la colonne de marque ; dedans ou à côté : SocialButton, DividerLabel, champs, PasswordStrength et CodeInput.' } } },
} satisfies Meta<typeof CodeInput>;
export default meta;

export const Code: StoryObj = {
  name: 'Code de vérification',
  render: () => {
    const [v, setV] = useState('48');
    const [s, setS] = useState(30);
    useEffect(() => { if (!s) return; const t = setTimeout(() => setS(s - 1), 1000); return () => clearTimeout(t); }, [s]);
    return <CodeInput value={v} onChange={setV} countdown={s} onResend={() => setS(30)} />;
  },
};

export const CodeErreur: StoryObj = {
  name: 'Code en erreur',
  render: () => <CodeInput value="481927" onChange={() => {}} error="Code incorrect. Vérifiez le dernier e-mail reçu ou renvoyez un code." onResend={() => {}} />,
};

export const MotDePasse: StoryObj = {
  name: 'Force du mot de passe',
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 400 }}>
      {(['weak', 'medium', 'good', 'excellent'] as const).map((l, i) => (
        <PasswordStrength key={l} level={l} rules={[{ label: '12 caractères minimum', ok: i >= 1 }, { label: 'Au moins un chiffre', ok: i >= 2 }]} />
      ))}
    </div>
  ),
};

export const Connexion: StoryObj = {
  name: 'Écran de connexion',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '720px 1fr', height: 900 }}>
      <AuthPanel />
      <div style={{ display: 'grid', alignContent: 'center', justifyItems: 'center' }}>
        <div style={{ width: 400, display: 'grid', gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 24 }}>Se connecter</h1>
          <SocialButton provider="google" />
          <SocialButton provider="microsoft" />
          <DividerLabel />
          <Input label="E-mail" placeholder="vous@entreprise.fr" />
          <Button fullWidth>Continuer</Button>
        </div>
      </div>
    </div>
  ),
};

export const Panneaux: StoryObj = {
  name: 'Thèmes du panneau',
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['default', 'website', 'mobile', 'email'] as const).map((t) => <div key={t} style={{ width: 360, height: 300 }}><AuthPanel theme={t} /></div>)}
    </div>
  ),
};
