import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination, PaginationButton } from './Pagination';

const meta = { title: 'Composants/Navigation/Pagination', component: Pagination } satisfies Meta<typeof Pagination>;
export default meta;

export const Defaut: StoryObj = {
  name: 'Pagination',
  render: () => {
    const [p, setP] = useState(1);
    const [n, setN] = useState(10);
    return <div style={{ width: 640, background: 'var(--neutral-surface-default)' }}><Pagination page={p} pageCount={20} onPageChange={setP} rowCount={45} rowsPerPage={n} onRowsPerPageChange={setN} /></div>;
  },
};

export const Cases: StoryObj = {
  name: 'PaginationButton',
  render: () => <div style={{ display: 'flex', gap: 8 }}><PaginationButton>1</PaginationButton><PaginationButton selected>2</PaginationButton><PaginationButton>3</PaginationButton></div>,
};
