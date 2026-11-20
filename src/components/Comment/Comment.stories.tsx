import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommentCard, CommentComposer, CommentPin, Mention } from './Comment';

const meta = { title: 'Composants/Collaboration/Comment', component: CommentCard } satisfies Meta<typeof CommentCard>;
export default meta;

export const Etats: StoryObj = {
  name: 'Comment',
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 300 }}>
      {(['unread', 'open', 'resolved'] as const).map((s) => (
        <CommentCard key={s} author="Claire" date="il y a 10 min" state={s} replies={1} onReplies={() => {}} onResolve={() => {}} onReopen={() => {}} onMenu={() => {}}>
          Le montant est visible, il faut le flouter. <Mention>Jonathan</Mention> tu peux regarder ?
        </CommentCard>
      ))}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><CommentPin author="Claire" /><div style={{ flex: 1 }}><CommentComposer onSend={() => {}} /></div></div>
    </div>
  ),
};
