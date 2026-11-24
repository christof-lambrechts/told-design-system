import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { OptionItem } from '../OptionSidebar/OptionSidebar';
import type { TextTone } from '../ColorPicker/ColorPicker';
import {
  OverlaySettings, ProgressSettings, FooterSettings, WidgetAvatarSettings, LabelSettings, CloseSettings, CoverSettings,
  WidgetLogoSettings, SoundSettings, RadiusSettings, NavButtonsSettings, ShadowSettings, GlassSettings, type RadiusChoice, type NavButton,
} from './Customisation';

const meta: Meta = { title: 'Composants/Panneaux/Réglages d’apparence' };
export default meta;

const sounds = [
  { value: 'silk', label: 'Silk', description: 'Ultra discret · élégant' },
  { value: 'crystal', label: 'Crystal', description: 'Pur · net · minimal' },
  { value: 'wood', label: 'Wood', description: 'Chaud · organique · tactile' },
  { value: 'paper', label: 'Paper', description: 'Léger · éditorial · intelligent' },
];

/** Tous les réglages d'apparence (OptionCustomisation), chacun dans son OptionItem ouverte. */
export const Tous: StoryObj = {
  render: () => {
    const [overlay, setOverlay] = useState(true); const [ovTone, setOvTone] = useState<TextTone>('light'); const [blur, setBlur] = useState(true);
    const [prog, setProg] = useState(true); const [progStyle, setProgStyle] = useState('steps');
    const [hideFooter, setHideFooter] = useState(false); const [hideBadge, setHideBadge] = useState(false);
    const [avatar, setAvatar] = useState(true); const [name, setName] = useState('');
    const [label, setLabel] = useState(true); const [kind, setKind] = useState<'badge' | 'text'>('badge');
    const [hideClose, setHideClose] = useState(false); const [closeTone, setCloseTone] = useState<TextTone>('light'); const [hideSkip, setHideSkip] = useState(false);
    const [cover, setCover] = useState(true); const [logo, setLogo] = useState(true);
    const [sound, setSound] = useState(true); const [which, setWhich] = useState('silk');
    const [radius, setRadius] = useState<RadiusChoice>('sm');
    const [nav, setNav] = useState<{ right: NavButton; left: NavButton }>({ right: { icon: 'none', label: 'Suivant' }, left: { icon: 'none', label: 'Précédent' } });
    const [shadow, setShadow] = useState(true); const [level, setLevel] = useState('light'); const [op, setOp] = useState(15); const [color, setColor] = useState('#000000');
    const [gShadow, setGShadow] = useState(true); const [light, setLight] = useState(true);
    const item = (title: string, children: ReactNode) => <OptionItem variant="open" label={title}>{children}</OptionItem>;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 328px)', gap: 24, alignItems: 'start' }}>
        {item('Voile', <OverlaySettings enabled={overlay} onEnabledChange={setOverlay} tone={ovTone} onToneChange={setOvTone} blur={blur} onBlurChange={setBlur} />)}
        {item('Progression', <ProgressSettings enabled={prog} onEnabledChange={setProg} style={progStyle} onStyleChange={setProgStyle} />)}
        {item('Pied de page', <FooterSettings plan="free" hideFooter={hideFooter} onHideFooterChange={setHideFooter} hideBadge={hideBadge} onHideBadgeChange={setHideBadge} />)}
        {item('Avatar', <WidgetAvatarSettings enabled={avatar} onEnabledChange={setAvatar} name={name} onNameChange={setName} />)}
        {item('Label', <LabelSettings enabled={label} onEnabledChange={setLabel} kind={kind} onKindChange={setKind} />)}
        {item('Fermeture', <CloseSettings hideClose={hideClose} onHideCloseChange={setHideClose} tone={closeTone} onToneChange={setCloseTone} hideSkip={hideSkip} onHideSkipChange={setHideSkip} />)}
        {item('Couverture', <CoverSettings enabled={cover} onEnabledChange={setCover} />)}
        {item('Logo', <WidgetLogoSettings enabled={logo} onEnabledChange={setLogo} />)}
        {item('Sons', <SoundSettings enabled={sound} onEnabledChange={setSound} sound={which} onSoundChange={setWhich} sounds={sounds} />)}
        {item('Arrondi', <RadiusSettings value={radius} onChange={setRadius} />)}
        {item('Boutons', <NavButtonsSettings right={nav.right} left={nav.left} onChange={(s, b) => setNav({ ...nav, [s]: b })} />)}
        {item('Ombre', <ShadowSettings enabled={shadow} onEnabledChange={setShadow} level={level} onLevelChange={setLevel} opacity={op} onOpacityChange={setOp} color={color} onColorChange={setColor} />)}
        {item('Verre', <GlassSettings shadow={gShadow} onShadowChange={setGShadow} animatedLight={light} onAnimatedLightChange={setLight} />)}
      </div>
    );
  },
};
