import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker, type ColorFill, type TextTone, type GlassTone } from './ColorPicker';
import { ColorField } from '../Contrast/Contrast';

const meta: Meta = { title: 'Composants/Saisie et choix/ColorPicker' };
export default meta;
const kit = ['#7A8599', '#FFFFFF', '#1F1F1F', '#5B63C9', '#2F5BFF', '#4BA9F2', '#5A9AB0', '#7CD9B8', '#A6D46A', '#F2DA3A', '#E8822C', '#DB6A4B', '#D9443F', '#9D55F0', '#E05A78'];

/** Le sélecteur complet : Fond | Texte, Unie | Dégradé, vos couleurs, contour glass. */
export const Complet: StoryObj = {
  render: () => {
    const [v, setV] = useState<ColorFill>({ type: 'solid', color: '#161C36' });
    const [t, setT] = useState<TextTone>('light');
    const [g, setG] = useState<{ enabled: boolean; tone: GlassTone }>({ enabled: true, tone: 'dark' });
    const [sw, setSw] = useState(kit);
    const [anim, setAnim] = useState(false);
    return (
      <div style={{ padding: 16, border: '1px solid #E4E7EC', borderRadius: 16, width: 'fit-content', background: '#fff' }}>
        <ColorPicker value={v} onChange={setV} allowGradient textTone={t} onTextToneChange={setT} swatches={sw} onAddSwatch={(c) => setSw([...sw, c])}
          glass={g} onGlassChange={setG} animated={anim} onAnimatedChange={setAnim} />
      </div>
    );
  },
};

/** Le champ couleur ouvre le sélecteur au clic sur la pastille. */
export const DansUnChamp: StoryObj = {
  name: 'Dans ColorField',
  render: () => {
    const [c, setC] = useState('#3BA08E');
    const [t, setT] = useState<TextTone>('light');
    return <div style={{ width: 300, minHeight: 640 }}><ColorField label="Couleur du fond" value={c} onChange={setC} swatches={kit} textTone={t} onTextToneChange={setT} background={t === 'light' ? '#FFFFFF' : '#161C36'} /></div>;
  },
};
