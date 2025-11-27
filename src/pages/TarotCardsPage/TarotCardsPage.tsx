import { Cell, Section, List } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Page } from '@/components/Page.tsx';
import { useSearchParams } from 'react-router-dom';

// Типы карт Таро
const tarotCards = [
  { id: 1, name: 'Шут', description: 'Начало нового пути, свобода, беззаботность' },
 { id: 2, name: 'Маг', description: 'Воля, мастерство, творчество' },
  { id: 3, name: 'Жрица', description: 'Интуиция, тайна, знание' },
  { id: 4, name: 'Императрица', description: 'Плодородие, забота, изобилие' },
  { id: 5, name: 'Император', description: 'Власть, структура, контроль' },
  { id: 6, name: 'Папа', description: 'Традиции, духовность, наставничество' },
 { id: 7, name: 'Влюбленные', description: 'Выбор, любовь, гармония' },
 { id: 8, name: 'Колесница', description: 'Победа, контроль, движение вперед' },
  { id: 9, name: 'Правосудие', description: 'Баланс, справедливость, истина' },
  { id: 10, name: 'Повешенный', description: 'Жертва, новое восприятие, перемены' },
  { id: 11, name: 'Смерть', description: 'Конец, перемены, трансформация' },
 { id: 12, name: 'Умеренность', description: 'Баланс, умеренность, гармония' },
 { id: 13, name: 'Дьявол', description: 'Плен, искушение, страхи' },
  { id: 14, name: 'Башня', description: 'Разрушение, резкие перемены, освобождение' },
  { id: 15, name: 'Звезда', description: 'Надежда, вдохновение, исцеление' },
  { id: 16, name: 'Луна', description: 'Иллюзии, интуиция, подсознание' },
  { id: 17, name: 'Солнце', description: 'Радость, успех, ясность' },
 { id: 18, name: 'Суд', description: 'Воскрешение, прощение, новая жизнь' },
  { id: 19, name: 'Мир', description: 'Гармония, завершение, достижение' },
  { id: 20, name: 'Сила', description: 'Храбрость, сила воли, сострадание' },
  { id: 21, name: 'Отшельник', description: 'Самоанализ, мудрость, одиночество' },
 { id: 22, name: 'Колесо Фортуны', description: 'Удача, циклы, перемены' }
];

export const TarotCardsPage: FC = () => {
  const [searchParams] = useSearchParams();
 const cardCount = parseInt(searchParams.get('cards') || '3');
  const theme = searchParams.get('theme') || 'Общее';
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [revealedCards, setRevealedCards] = useState<number>(0);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const [interpretation, setInterpretation] = useState<string>('');

  // Выбор случайных карт при загрузке
  useEffect(() => {
    const shuffled = [...tarotCards].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, cardCount).map(card => {
      // Map card names to their correct English names for the image files
      const cardNameMap: { [key: number]: string } = {
        1: 'TheFool',
        2: 'TheMagician',
        3: 'TheHighPriestess',
        4: 'TheEmpress',
        5: 'TheEmperor',
        6: 'TheHierophant',
        7: 'TheLovers',
        8: 'TheChariot',
        9: 'Strength',
        10: 'TheHermit',
        11: 'WheelOfFortune',
        12: 'Justice',
        13: 'TheHangedMan',
        14: 'Death',
        15: 'Temperance',
        16: 'TheDevil',
        17: 'TheTower',
        18: 'TheStar',
        19: 'TheMoon',
        20: 'TheSun',
        21: 'Judgement',
        22: 'TheWorld'
      };

      // Get the correct filename based on the card ID
      const cardFileName = `${String(card.id - 1).padStart(2, '0')}-${cardNameMap[card.id]}.png`;
      
      return {
        ...card,
        image: cardFileName, // Store just the filename, we'll add the full path when rendering
        imageFileName: cardFileName // Store the filename to check if it exists
      };
    });
    setSelectedCards(selected);
 }, [cardCount]);

  // Постепенное открытие карт
  useEffect(() => {
    if (selectedCards.length > 0) {
      const interval = setInterval(() => {
        setRevealedCards(prev => {
          if (prev < selectedCards.length) {
            return prev + 1;
          } else {
            clearInterval(interval);
            // Показываем интерпретацию после открытия всех карт
            setTimeout(() => {
              setShowInterpretation(true);
              fetchInterpretation();
            }, 1000);
            return prev;
          }
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [selectedCards]);

  // Функция для получения интерпретации от нейросети
  const fetchInterpretation = async () => {
    try {
      // Здесь будет вызов API нейросети
      // Пока что используем заглушку
      
      // Заглушка для API-запроса
      const mockInterpretation = `Интерпретация расклада на тему "${theme}":\n\nВаш расклад из ${cardCount} карт показывает важные аспекты в выбранной сфере. ${selectedCards.map((card, index) => `Карта ${index + 1} (${card.name}) указывает на ${card.description.toLowerCase()}.`).join(' ')}`;
      
      setInterpretation(mockInterpretation);
    } catch (error) {
      console.error('Error fetching interpretation:', error);
      setInterpretation('Ошибка при получении интерпретации. Пожалуйста, попробуйте еще раз.');
    }
 };

  return (
    <div style={{
      backgroundImage: 'url(/tarot-cards/background.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      <Page>
        <List>
        <Section header={`Расклад: ${theme}`}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            gap: '16px'
          }}>
            {/* First row: up to 3 cards */}
            {selectedCards.length > 0 && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '16px',
                width: '100%'
              }}>
                {selectedCards.slice(0, Math.min(3, selectedCards.length)).map((card, index) => (
                  <div
                    key={card.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      opacity: 1,
                      transition: 'opacity 0.5s ease-in-out'
                    }}
                  >
                    <div
                      style={{
                        width: '100px',
                        height: '160px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      {revealedCards > index ? (
                        <img
                          src={card.image ? `/tarot-cards/${card.image}?t=${Date.now()}` : '/tarot-cards/CardBacks.png'}
                          alt={card.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop
                            target.src = '/tarot-cards/CardBacks.png'; // Fallback image
                          }}
                          onLoad={(e) => {
                            // Optional: Add any onLoad logic if needed
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '48px' }}>❓</span>
                      )}
                    </div>
                    <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '14px' }}>{card.name}</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Remaining cards in second row */}
            {selectedCards.length > 3 && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '16px',
                width: '100%'
              }}>
                {selectedCards.slice(3, Math.min(revealedCards, selectedCards.length)).map((card, index) => {
                  const globalIndex = index + 3; // Adjust index to match the original position
                  return (
                    <div
                      key={card.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        opacity: 1,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                    >
                      <div
                        style={{
                          width: '100px',
                          height: '160px',
                          backgroundColor: '#f0f0f0',
                          border: '1px solid #ccc',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        {revealedCards > globalIndex ? (
                          <img
                            src={card.image ? `/tarot-cards/${card.image}?t=${Date.now()}` : '/tarot-cards/CardBacks.png'}
                            alt={card.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null; // Prevent infinite loop
                              target.src = '/tarot-cards/CardBacks.png'; // Fallback image
                            }}
                            onLoad={(e) => {
                              // Optional: Add any onLoad logic if needed
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: '48px' }}>❓</span>
                        )}
                      </div>
                      <div style={{ marginTop: '8px', fontWeight: 'bold', fontSize: '14px' }}>{card.name}</div>
                    </div>
                  );
                })}
                
                {/* Hidden cards placeholder for second row */}
                {Array.from({ length: selectedCards.length - Math.max(revealedCards, 3) }).map((_, index) => {
                  const globalIndex = index + Math.max(revealedCards, 3);
                  return (
                    <div
                      key={`hidden-${globalIndex}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '100px',
                          height: '160px',
                          backgroundColor: '#d0d0d0',
                          border: '1px solid #aaa',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <span style={{ fontSize: '48px' }}>❓</span>
                      </div>
                      <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#aaa', fontSize: '14px' }}>Карта {globalIndex + 1}</div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Handle case where we have 1-3 cards - only show hidden cards if there are more hidden than shown */}
            {selectedCards.length <= 3 && revealedCards < selectedCards.length && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: '16px',
                width: '100%'
              }}>
                {Array.from({ length: selectedCards.length - revealedCards }).map((_, index) => {
                  const globalIndex = index + revealedCards;
                  return (
                    <div
                      key={`hidden-${globalIndex}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <div
                        style={{
                          width: '10px',
                          height: '160px',
                          backgroundColor: '#d0d0',
                          border: '1px solid #aaa',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <span style={{ fontSize: '48px' }}>❓</span>
                      </div>
                      <div style={{ marginTop: '8px', fontWeight: 'bold', color: '#aaa', fontSize: '14px' }}>Карта {globalIndex + 1}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {showInterpretation && (
            <Section style={{ marginTop: '20px' }}>
              <Cell>
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <h3>Интерпретация расклада</h3>
                  {interpretation ? (
                    <p style={{ whiteSpace: 'pre-line' }}>{interpretation}</p>
                  ) : (
                    <p>Идет обращение к нейросети за интерпретацией...</p>
                  )}
                </div>
              </Cell>
            </Section>
          )}
        </Section>
      </List>
    </Page>
  </div>
  );
};