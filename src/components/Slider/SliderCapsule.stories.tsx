import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SliderCapsule } from './SliderCapsule';

const meta = { title: 'Composants/Formulaires/SliderCapsule', component: SliderCapsule } satisfies Meta<typeof SliderCapsule>;
export default meta;
const fmt = (v: number) => `× ${v.toFixed(1).replace('.', ',')}`;

export const Etats: StoryObj = {
  name: 'SliderCapsule',
  render: () => {
    const [z, setZ] = useState(2.1);
    const [o, setO] = useState(40);
    const [a, setA] = useState(2); const [b, setB] = useState(20);
    return (
      <div style={{ display: 'grid', gap: 16, width: 440 }}>
        <SliderCapsule label="Zoom" min={1} max={3} step={0.1} value={z} onChange={setZ} defaultValue={1.6} format={fmt} />
        <SliderCapsule label="Opacité" value={o} onChange={setO} format={(v) => `${v} %`} />
        <SliderCapsule label="Durée" min={0} max={30} value={a} onChange={setA} rangeEnd={b} onRangeEndChange={setB} format={(v) => `${v} s`} />
      </div>
    );
  },
};
