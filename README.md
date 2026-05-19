# HW7 — Анімація, оптимізація, аналіз бандлу
 
## Завдання 1. Аналіз застосунку
 
### Компонент для анімації
**`FilterSection` у `FilterScreen`** — accordion-секції з'являлись миттєво без переходу при відкритті/закритті.
 
### Компонент з ре-рендерами
**`CardItem` у `CardGrid`** — перемальовувався при будь-якій зміні стану в `SearchScreen` (наприклад, відкриття Sort dropdown), навіть якщо самі картки не змінювались.
 
Причина: анонімна стрілкова функція `() => onCardPress?.(item)` в `renderItem` створювала новий об'єкт при кожному рендері батька → `React.memo` на `CardItem` бачив новий проп `onPress` → перемальовував всі картки.
 
### Зайва залежність
**`@react-navigation/drawer`** присутній у `package.json`, але не використовується — drawer реалізований вручну через `Animated` + `PanResponder`. Тягнув за собою `react-native-reanimated` як транзитивну залежність (~667 KB).
 
---
 
## Завдання 2. Анімація через LayoutAnimation
 
**Файл:** `screens/FilterScreen.tsx` → компонент `FilterSection`
 
### Що зроблено
Додано `LayoutAnimation.configureNext` у функцію `handleToggle`. При кожному відкритті або закритті секції React Native автоматично анімує зміну layout — блок чіпів плавно з'являється і зникає замість миттєвої появи.

https://github.com/user-attachments/assets/05c0ddc1-8b5e-4b4c-9818-ec3fab3e1082

**Примітка:** на Android з увімкненою New Architecture (`newArchEnabled=true`) `LayoutAnimation` не працює — це відоме обмеження Fabric. Анімація працює коректно на iOS.


## Завдання 3. Оптимізація ре-рендерів
 
### Проблема (до оптимізації)
При відкритті Sort dropdown у `SearchScreen`:
1. `setSortVisible(true)` → ре-рендер `SearchScreen`
2. Ре-рендер `CardGrid`
3. Перемальовувались всі `CardItem` — хоча картки не змінились
Підтверджено через `console.log` в `CardItem` — при кожному відкритті dropdown в консолі з'являлись логи для всіх карток.
 
### Що зроблено
 
#### `components/CardItem.jsx`
Обгорнутий в `React.memo`. `handlePress` стабілізований через `useCallback` всередині компонента

#### `components/CardGrid.jsx`
`renderItem` стабілізований через `useCallback`. `item` передається як окремий проп замість анонімної стрілкової функції — це дозволяє `memo` + `useCallback` в `CardItem` коректно відпрацювати.

#### `screens/SearchScreen.tsx`
- `handleCardPress` через `useCallback` — стабільний референс для `CardGrid`
- `filteredCards` через `useMemo([cards, sortBy, filterVersion])` — фільтрація і сортування не перераховуються при відкритті dropdown
- Видалено `forceUpdate` + `useEffect` — замінено `filterVersion` як залежністю у `useMemo`

### Результат перевірки
Після оптимізації відкриття Sort dropdown не викликає жодного логу `CardItem render` — `memo` блокує зайві ре-рендери. Ре-рендер відбувається тільки при виборі опції сортування, коли `filteredCards` реально змінюється.


## Завдання 4. Аналіз та очищення залежностей
 
### Інструмент
`react-native-bundle-visualizer` — використано замість `source-map-explorer` через несумісність Metro source map з RN 0.85.2 (`column Infinity` помилка).

### Знахідка
`@react-navigation/drawer` встановлений у `package.json`, але не використовується в коді. Через нього в бандл потрапляв `react-native-reanimated` (667 KB / 14.9% бандлу) як транзитивна залежність.

### Дія
```bash
npm uninstall @react-navigation/drawer
cd ios && pod install && cd ..
```

### Результат
 
| | Байти | MB |
|---|---|---|
| **До** | 1 865 086 | 4.39 MB |
| **Після** | 1 564 620 | 3.58 MB |
| **Різниця** | −300 466 | **−810 KB / −18.4%** |

До:
<img width="1711" height="867" alt="Screenshot 2026-05-20 at 00 04 23" src="https://github.com/user-attachments/assets/88836226-4495-4cde-abee-ceb96c94e641" />

Після:
<img width="1713" height="864" alt="Screenshot 2026-05-20 at 00 04 36" src="https://github.com/user-attachments/assets/f3894c70-b880-4098-be22-2553d3ee292d" />


