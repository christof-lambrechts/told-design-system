import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { OptionPopover, PopoverField, PositionPreview, ColorPreview } from './OptionPopover';
import { OptionSidebar, OptionItem, PanelHeader } from '../OptionSidebar/OptionSidebar';
import { FormatOptionGroup } from '../OptionSidebar/FormatOption';
import { PositionPicker, positionLabels, type Position } from '../OptionSidebar/PositionPicker';
import { GroupTab } from '../Tabs/Tabs';
import { ChoiceField } from '../OptionSidebar/ChoiceField';
import { Icon } from '../Icon/Icon';

const meta = {
  title: 'Composants/Panneaux/OptionPopover',
  component: PopoverField,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Micro-modale d’un réglage (Figma OptionPopover 9928:10884, PopoverField 9928:10883). Règle : 3 choix ou moins = GroupTab ; plus de 3 choix, ou réglage long et peu modifié = PopoverField + OptionPopover, avec une liste illustrée quand les choix se montrent mieux qu’ils ne se lisent.' } },
  },
} satisfies Meta<typeof PopoverField>;
export default meta;

const FRAMES = [
  { value: 'none', title: 'Aucun', description: 'Capture seule.', illustration: 'frame-none' as const },
  { value: 'mobile', title: 'Mobile', description: 'Téléphone.', illustration: 'frame-mobile' as const },
  { value: 'tablet', title: 'Tablette', description: 'Tablette.', illustration: 'frame-tablet' as const },
  { value: 'desktop', title: 'Ordinateur', description: 'Écran d’ordinateur.', illustration: 'frame-desktop' as const },
];
const FORMATS = [
  { value: 'demo', title: 'Démo guidée', description: 'On clique, étape par étape.', illustration: 'demo' as const },
  { value: 'announcement', title: 'Annonce', description: 'Vidéo courte à tes couleurs.', illustration: 'announcement' as const },
  { value: 'inapp', title: 'Animation in-app', description: 'Boucle muette, sans texte.', illustration: 'inapp' as const },
];
const DEVICES = [{ value: 'browser', label: 'Navigateur' }, { value: 'laptop', label: 'Portable' }, { value: 'imac', label: 'iMac' }, { value: 'display', label: 'Écran' }, { value: 'macbook', label: 'MacBook' }];
const COLORS = [{ value: 'silver', label: 'Argent', color: '#C9CBCF' }, { value: 'yellow', label: 'Jaune', color: '#E9C46A' }, { value: 'blue', label: 'Bleu', color: '#9DB4D8' }, { value: 'green', label: 'Vert', color: '#A8CBB7' }, { value: 'orange', label: 'Orange', color: '#F4A68B' }];

function Panel() {
  const [format, setFormat] = useState('announcement');
  const [formatOpen, setFormatOpen] = useState(false);
  const formatRow = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState('desktop');
  const [pos, setPos] = useState<Position>('bottom-left');
  const [size, setSize] = useState('md');
  const [device, setDevice] = useState('imac');
  const [color, setColor] = useState('blue');
  const [avatar, setAvatar] = useState(true);
  const f = FORMATS.find((x) => x.value === format)!;
  const fr = FRAMES.find((x) => x.value === frame)!;
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', minHeight: '100vh', background: 'var(--neutral-surface-canvas)' }}>
      <div style={{ width: 328, background: 'var(--neutral-surface-default)', borderLeft: '1px solid var(--neutral-border-divider)' }}>
        <OptionSidebar header={<PanelHeader icon="type-annonce" title="Options" />} width={328}>
          <div ref={formatRow}>
            <OptionItem variant="row" icon="type-annonce" label="Format" value={f.title as string} actionLabel="Changer" onAction={() => setFormatOpen((o) => !o)} />
          </div>
          <OptionPopover title="Format" open={formatOpen} onClose={() => setFormatOpen(false)} anchor={formatRow.current}>
            <FormatOptionGroup aria-label="Format" options={FORMATS} value={format} onChange={(v) => { setFormat(v); setFormatOpen(false); }} />
          </OptionPopover>
          <OptionItem variant={avatar ? 'open' : 'row'} icon="avatar" label="Avatar sur ce slide" info="Ces réglages valent pour tous les slides."
            toggle={{ checked: avatar, onChange: setAvatar }}>
            <PopoverField label="Position" title="Position de l’avatar" value={positionLabels[pos]} preview={<PositionPreview position={pos} />}>
              <PositionPicker aria-label="Position de l’avatar" item="avatar" positions={5} value={pos} onChange={setPos} />
            </PopoverField>
            <GroupTab label="Taille" fullWidth value={size} onChange={setSize} items={[{ value: 'sm', label: 'Petit' }, { value: 'md', label: 'Moyen' }, { value: 'lg', label: 'Grand' }]} />
          </OptionItem>
          <OptionItem variant="open" icon="device" label="Cadre du média" value={fr.title as string} info="Le cadre et la capture bougent ensemble.">
            <PopoverField label="Cadre" value={fr.title} preview={<Icon name="computer" size={18} />}>
              <FormatOptionGroup aria-label="Cadre" options={FRAMES} value={frame} onChange={setFrame} />
            </PopoverField>
            {frame === 'desktop' && (
              <PopoverField label="Appareil" value={`${DEVICES.find((d) => d.value === device)!.label} · ${COLORS.find((c) => c.value === color)!.label}`}
                preview={<ColorPreview color={COLORS.find((c) => c.value === color)!.color} />}>
                <ChoiceField label="Appareil" options={DEVICES} value={device} onChange={setDevice} />
                <ChoiceField label="Coloris" options={COLORS} value={color} onChange={setColor} />
              </PopoverField>
            )}
          </OptionItem>
        </OptionSidebar>
      </div>
    </div>
  );
}

export const DansLePanneau: StoryObj = { name: 'Dans le panneau Options', render: () => <Panel /> };

function Single({ startOpen = false }: { startOpen?: boolean }) {
  const [frame, setFrame] = useState('desktop');
  const [open, setOpen] = useState(startOpen);
  const fr = FRAMES.find((x) => x.value === frame)!;
  return (
    <div style={{ padding: 24, width: 296 }}>
      <PopoverField label="Cadre" value={fr.title} preview={<Icon name="computer" size={18} />} open={open} onOpenChange={setOpen} placement="bottom">
        <FormatOptionGroup aria-label="Cadre" options={FRAMES} value={frame} onChange={(v) => { setFrame(v); setOpen(false); }} />
      </PopoverField>
    </div>
  );
}

export const ChampSeul: StoryObj = { name: 'Champ (plus de 3 choix)', render: () => <Single /> };
export const Ouvert: StoryObj = { name: 'Micro-modale ouverte', render: () => <Single startOpen /> };
