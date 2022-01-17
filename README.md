# Vietnamese lunar calendar

A JavaScript  library convert solar date to vietnamese lunar date

# Installation

```bash
npm i vietnamese-lunar-calendar
```

# Examples

Convert Solar date to Lunar date

```typescript
import { LunarDate } from 'vietnamese-lunar-calendar';

new LunarDate();

new LunarDate(2022, 2, 1);
/*
  Output:
  Lunar year: 2022
  Lunar month: 1
  Lunar date: 1
*/

new LunarDate(new Date(2022, 1, 1));
/*
  Output:
  Lunar year: 2022
  Lunar month: 1
  Lunar date: 1
*/
```

# Interface

| Property        |                                   |
| --------------- | --------------------------------- |
| year            | lunar year in number              |
| month           | lunar month in number             |
| date            | lunar date in number              |
| lunarYear       | lunar year in ganzhi              |
| lunarMonth      | lunar month in ganzhi             |
| lunarDate       | lunar date in ganzhi              |
| isLeap          | whether lunar year is a leap year |
| isVegetarianDay | Buddhists vegetarian day          |
| luckyHours      | auspicious time to do something   |
| holiday         | public holidays in Vietnam        |

# Thanks

[Hồ Ngọc Đức Lunar Calendar](https://www.informatik.uni-leipzig.de/~duc/amlich/)
