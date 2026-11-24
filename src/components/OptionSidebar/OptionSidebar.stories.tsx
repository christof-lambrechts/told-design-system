import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChoiceChips } from '../ChoiceChips/ChoiceChips';
import { useState } from 'react';
import type { TextTone } from '../ColorPicker/ColorPicker';
import { OptionSidebar, OptionItem, PanelHeader } from './OptionSidebar';
import { Switch } from '../Choice/Choice';
import { Select, DropdownMenu, DropdownItem } from '../Select/Select';
import { Button } from '../Button/Button';
import { FormatOptionGroup } from './FormatOption';
import { GroupTab } from '../Tabs/Tabs';
import { PositionPicker, type Position } from './PositionPicker';
import { MediaFrameSettings, MediaCropSettings, type MediaFrameKind, type MediaOrientation, type MediaShadow, type MediaPlacement } from './MediaSettings';
import { EyebrowSettings, LogoSettings, OptionContextHeader, type EyebrowStyle, type BrandLogoChoice } from './BrandSettings';
import { AvatarSettings, type AvatarFrame, type AvatarShape, type AvatarSize } from './AvatarSettings';

const meta = { title: 'Composants/Panneaux/OptionSidebar', component: OptionSidebar, parameters: { layout: 'padded' } } satisfies Meta<typeof OptionSidebar>;
export default meta;

function Demo() {
  const [scope, setScope] = useState('step');
  const [format, setFormat] = useState('widget');
  return (
    <div style={{ border: '1px solid var(--neutral-border-default)', borderRadius: 12, overflow: 'hidden', width: 356 }}>
      <OptionSidebar
        header={<PanelHeader icon="questionscale" title="Échelle 1-5" description="Bloc question · obligatoire ·" onChangeType={() => {}} onMenu={() => {}} />}
        scopes={[{ value: 'step', label: 'Étape' }, { value: 'block', label: 'Bloc' }]}
        scope={scope}
        onScopeChange={setScope}
      >
        <OptionItem icon="layout" label="Format" value="Widget" defaultOpen>
          <Select options={[{ value: 'widget', label: 'Widget' }, { value: 'modal', label: 'Modale' }, { value: 'banner', label: 'Bannière' }]} value={format} onChange={setFormat} aria-label="Format" />
        </OptionItem>
        <OptionItem icon="position" label="Position" value="Bas à droite">
          <Switch label="Masquer sur mobile" />
        </OptionItem>
        <OptionItem icon="time" label="Déclencheur" required>
          <Switch label="Après 5 secondes" defaultChecked />
        </OptionItem>
        <OptionItem icon="party" label="Confettis" pro>
          <Switch label="Lancer à la fin" />
        </OptionItem>
      </OptionSidebar>
    </div>
  );
}

export const Panneau: StoryObj = { name: 'Panneau', render: () => <Demo /> };

export const EnTete: StoryObj = {
  name: 'En-tête (PanelHeader)',
  render: () => (
    <div style={{ display: 'grid', gap: 24, width: 324 }}>
      <PanelHeader icon="questionnps" title="Question 1 · NPS" description="Bloc question · obligatoire ·" onChangeType={() => {}} onMenu={() => {}} />
      <PanelHeader icon="logo" title="Image" description="Bloc secondaire" backLabel="Question 1" onBack={() => {}} onMenu={() => {}} />
    </div>
  ),
};

/** D-021 : collaboration (présence, conflit), interrupteur désactivé, pastilles nommées par le titre de section. */
export const Collaboration: StoryObj = {
  name: 'Collaboration',
  render: () => (
    <div style={{ width: 356, background: 'var(--neutral-surface-default)' }}>
      <OptionItem variant="row" icon="avatar" label="Avatar sur ce slide" holder="Léa" toggle={{ checked: true, onChange: () => {}, disabled: true }} info="L’avatar lit le texte de la slide." />
      <OptionItem variant="open" icon="text" label="Apparition des textes" labelId="apparition" conflict>
        <ChoiceChips aria-labelledby="apparition" value="fondu" onChange={() => {}} options={[
          { value: 'fondu', label: 'Fondu', glyph: 'Aa' },
          { value: 'glisse', label: 'Glissement', glyph: 'Aa', title: 'Différente du reste de la démo' },
          { value: 'mot', label: 'Mot à mot', glyph: 'Aa', disabled: true }]} />
      </OptionItem>
      <OptionItem variant="collapsible" icon="time" label="Durée" value="Auto" defaultOpen><div>Contenu</div></OptionItem>
    </div>
  ),
};

/** Choix du format dans le panneau Options (Record, 21/11) : FormatOptionGroup, réglages sous la ligne choisie. */
export const FormatOptions: StoryObj = {
  name: 'FormatOption',
  render: () => {
    const [f, setF] = useState('announcement');
    const [o, setO] = useState('landscape');
    return (
      <div style={{ width: 328 }}>
        <FormatOptionGroup aria-label="Format" value={f} onChange={setF}
          options={[
            { value: 'demo', title: 'Démo guidée', description: 'On clique, étape par étape.', illustration: 'demo' },
            { value: 'announcement', title: 'Annonce', description: 'Vidéo courte à tes couleurs.', illustration: 'announcement' },
            { value: 'inapp', title: 'Animation in-app', description: 'Boucle muette, sans texte.', illustration: 'inapp' },
          ]}
          settings={<GroupTab size="sm" label="Orientation" value={o} onChange={setO} items={[{ value: 'landscape', label: 'Paysage 16:9' }, { value: 'portrait', label: 'Vertical 9:16' }]} />} />
      </div>
    );
  },
};

/** Réglage court sur la ligne (hasControl, 21/11) : la liste s'ouvre en place, sans badge ni dépliage. Une action sur la ligne (Recadrer) : Button primary-outline xs. */
export const ReglageSurLaLigne: StoryObj = {
  name: 'Réglage sur la ligne',
  render: () => {
    const [v, setV] = useState('Auto · 3 s');
    const [open, setOpen] = useState(false);
    const choices = ['Auto · 3 s', '2 s', '4 s', '6 s'];
    return (
      <div style={{ width: 328, minHeight: 240 }}>
        <OptionItem variant="row" icon="time" label="Durée" control={<>
          <Button color="neutral" variant="secondary-outline" size="md" iconRight="arrow-down-01" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)}>{v}</Button>
          {open && <div style={{ position: 'absolute', right: 0, top: 38, zIndex: 2 }}>
            <DropdownMenu autoFocus onEscape={() => setOpen(false)}>
              {choices.map((c) => <DropdownItem key={c} selected={c === v} onClick={() => { setV(c); setOpen(false); }}>{c}</DropdownItem>)}
            </DropdownMenu>
          </div>}
        </>} />
        <OptionItem variant="row" icon="crop" label="Cadrage du média" control={<Button variant="primary-outline" size="xs">Recadrer</Button>} />
      </div>
    );
  },
};

export const Positions: StoryObj = {
  name: 'PositionPicker',
  render: () => {
    const [w, setW] = useState<Position>('bottom-right');
    const [a, setA] = useState<Position>('bottom-left');
    return (
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <PositionPicker label="Position du widget" value={w} onChange={setW} />
        <PositionPicker label="Position de l’avatar" item="avatar" positions={5} value={a} onChange={setA} />
      </div>
    );
  },
};

export const ReglagesAvatar: StoryObj = {
  name: 'AvatarSettings',
  render: () => {
    const [on, setOn] = useState(true);
    const [avatar, setAvatar] = useState('lea');
    const [position, setPosition] = useState<Position>('bottom-left');
    const [size, setSize] = useState<AvatarSize>('md');
    const [shape, setShape] = useState<AvatarShape>('rounded');
    const [frame, setFrame] = useState<AvatarFrame>('color');
    const [color, setColor] = useState('#1A63FF');
    return (
      <div style={{ width: 360 }}>
          <OptionItem variant="open" icon="avatar" label="Avatar sur ce slide" toggle={{ checked: on, onChange: setOn, label: 'Avatar sur ce slide' }}>
            <AvatarSettings
              avatar={<ChoiceChips aria-label="Avatar" value={avatar} onChange={setAvatar} options={[
                { value: 'lea', label: 'Léa' },
                { value: 'hugo', label: 'Hugo' },
                { value: 'ines', label: 'Inès' }]} />}
              position={position} onPositionChange={setPosition}
              size={size} onSizeChange={setSize}
              shape={shape} onShapeChange={setShape}
              frame={frame} onFrameChange={setFrame}
              frameColor={color} onFrameColorChange={setColor}
            />
          </OptionItem>
      </div>
    );
  },
};

export const ReglagesMedia: StoryObj = {
  name: 'Cadre et cadrage du média',
  render: () => {
    const [kind, setKind] = useState<MediaFrameKind>('tablet');
    const [orientation, setOrientation] = useState<MediaOrientation>('portrait');
    const [shadow, setShadow] = useState<MediaShadow>('soft');
    const [slide, setSlide] = useState<MediaOrientation>('landscape');
    const [cz, setCz] = useState(1.2);
    const [placement, setPlacement] = useState<MediaPlacement>('corner');
    const [device, setDevice] = useState('tablet');
    const [finish, setFinish] = useState('gray');
    const [zoom, setZoom] = useState(1.8);
    const [anchor, setAnchor] = useState<Position>('bottom-right');
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 360, display: 'grid', gap: 12 }}>
          <GroupTab label="Orientation de l’Annonce (démo)" value={slide} onChange={(v) => { setSlide(v as MediaOrientation); if (v === 'portrait' && kind === 'desktop') { setKind('mobile'); setDevice('android'); } }} items={[{ value: 'landscape', label: 'Paysage 16:9' }, { value: 'portrait', label: 'Vertical 9:16' }]} />
          <OptionItem variant="open" icon="device" label="Cadre du média" value={device}>
            <MediaFrameSettings kind={kind} onKindChange={(k) => { setKind(k); setDevice(({ desktop: 'imac', tablet: 'tablet', mobile: 'android', none: '' } as const)[k]); setFinish(''); }}
              device={device} onDeviceChange={(d) => { setDevice(d); setFinish(''); }} finish={finish || undefined} onFinishChange={setFinish}
              orientation={orientation} onOrientationChange={setOrientation} shadow={shadow} onShadowChange={setShadow}
              slideOrientation={slide} placement={placement} onPlacementChange={setPlacement} captureZoom={cz} onCaptureZoomChange={setCz} />
          </OptionItem>
        </div>
        <div style={{ width: 360 }}>
          <OptionItem variant="open" icon="crop" label="Cadrage du média" value={`× ${zoom.toFixed(1).replace('.', ',')}`}>
            <MediaCropSettings zoom={zoom} onZoomChange={setZoom} anchor={anchor} onAnchorChange={setAnchor} onReset={() => { setZoom(1); setAnchor('center'); }} />
          </OptionItem>
        </div>
      </div>
    );
  },
};

export const SelonLaSelection: StoryObj = {
  name: 'Options selon la sélection',
  render: () => {
    const [sel, setSel] = useState<'slide' | 'eyebrow'>('eyebrow');
    const [st, setSt] = useState<EyebrowStyle>('badge');
    const [c, setC] = useState('#FFE84F');
    const [logo, setLogo] = useState<BrandLogoChoice>('told');
    const [logoTone, setLogoTone] = useState<TextTone>('dark');
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ width: 360, border: '1px solid var(--neutral-border-divider)', borderRadius: 12, background: 'var(--neutral-surface-default)' }}>
          {sel === 'eyebrow' ? (
            <>
              <OptionContextHeader title="Surtitre" onBack={() => setSel('slide')} />
              <div style={{ padding: 16 }}><EyebrowSettings variant={st} onVariantChange={setSt} color={c} onColorChange={setC} slideBackground="#F4EEFF" /></div>
            </>
          ) : (
            <div style={{ padding: 16, display: 'grid', gap: 12 }}>
              <strong>Options · Slide</strong>
              <button type="button" onClick={() => setSel('eyebrow')}>Sélectionner le surtitre</button>
            </div>
          )}
        </div>
        <div style={{ width: 360, display: 'grid', gap: 16 }}>
          <OptionItem variant="open" icon="brand-kit" label="Logo · offre gratuite" pro><LogoSettings plan="free" value="told" onUpgrade={() => {}} tone={logoTone} onToneChange={setLogoTone} /></OptionItem>
          <OptionItem variant="open" icon="brand-kit" label="Logo · offre payante"><LogoSettings plan="paid" value={logo} onChange={setLogo} onOpenBrandKit={() => {}} tone={logoTone} onToneChange={setLogoTone} /></OptionItem>
        </div>
      </div>
    );
  },
};
