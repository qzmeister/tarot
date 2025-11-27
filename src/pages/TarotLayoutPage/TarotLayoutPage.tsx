import { Button, Cell, Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';

export const TarotLayoutPage: FC = () => {
  return (
    <Page>
      <List>
        <Section header="Выберите количество карт">
          <Link to="/tarot-theme?cards=3">
            <Cell>
              <Button size="l" mode="filled" style={{ width: '100%' }}>
                Расклад на 3 карты
              </Button>
            </Cell>
          </Link>
          <Link to="/tarot-theme?cards=5">
            <Cell>
              <Button size="l" mode="filled" style={{ width: '100%' }}>
                Расклад на 5 карт
              </Button>
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};