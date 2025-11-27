import { Button, Cell, Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section>
          <Cell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
            <Link to="/tarot-layout">
              <Button size="l" mode="filled">
                Расклад Таро
              </Button>
            </Link>
          </Cell>
        </Section>
      </List>
    </Page>
  );
};
