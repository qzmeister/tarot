import { Button, Cell, Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useState } from 'react';
import { Link } from '@/components/Link/Link.tsx';
import { Page } from '@/components/Page.tsx';
import { useSearchParams } from 'react-router-dom';

export const TarotThemePage: FC = () => {
  const [searchParams] = useSearchParams();
  const cardCount = searchParams.get('cards') || '3';
  const [customTheme, setCustomTheme] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const maxChars = 200;

  const handleCustomThemeChange = (value: string) => {
    if (value.length <= maxChars) {
      setCustomTheme(value);
    }
  };

  return (
    <Page>
      <List>
        <Section header="Выберите тему расклада">
          <Link to={`/tarot-cards?cards=${cardCount}&theme=Учеба`}>
            <Cell>
              <Button size="l" mode="filled" style={{ width: '100%' }}>
                Учеба
              </Button>
            </Cell>
          </Link>
          <Link to={`/tarot-cards?cards=${cardCount}&theme=Работа`}>
            <Cell>
              <Button size="l" mode="filled" style={{ width: '100%' }}>
                Работа
              </Button>
            </Cell>
          </Link>
          <Link to={`/tarot-cards?cards=${cardCount}&theme=Личная%20жизнь`}>
            <Cell>
              <Button size="l" mode="filled" style={{ width: '100%' }}>
                Личная жизнь
              </Button>
            </Cell>
          </Link>
          <Cell 
            onClick={() => setShowCustomInput(!showCustomInput)}
            style={{ cursor: 'pointer' }}
          >
            <Button 
              size="l" 
              mode={showCustomInput ? "white" : "filled"} 
              style={{ width: '100%' }}
            >
              Своё
            </Button>
          </Cell>
          {showCustomInput && (
            <div style={{ padding: '16px', backgroundColor: 'var(--tgui--section_bg_color, #f5f5f5)' }}>
              <textarea
                value={customTheme}
                onChange={(e) => handleCustomThemeChange(e.target.value)}
                placeholder="Введите свой запрос (до 200 символов)"
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '1px solid var(--tgui--secondary_bg_color, #e0e0e0)',
                  backgroundColor: 'var(--tgui--section_bg_color, #f5f5f5)',
                  fontSize: '16px',
                  resize: 'vertical',
                  marginBottom: '8px'
                }}
              />
              <div style={{ textAlign: 'right', fontSize: '14px', color: 'var(--tgui--subtitle_text_color, #8e8e93)', marginBottom: '8px' }}>
                {customTheme.length}/{maxChars}
              </div>
              <Link to={`/tarot-cards?cards=${cardCount}&theme=${encodeURIComponent(customTheme)}`}>
                <Button 
                  size="l" 
                  mode="filled" 
                  style={{ width: '100%', marginTop: '8px' }}
                  disabled={!customTheme.trim()}
                >
                  Начать расклад
                </Button>
              </Link>
            </div>
          )}
        </Section>
      </List>
    </Page>
  );
};