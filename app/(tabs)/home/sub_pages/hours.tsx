import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { OpenHoursDTO } from '@/types/OpenHours';
import { fetchOpenHours } from '@/utils/data';

const ROW_HEIGHT = 60;
const ROW_COUNT = 5;

const OpeningHoursCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const now = new Date();
  const [schedule, setSchedule] = useState<OpenHoursDTO[]>([])
  const polandTime = new Date(now.getTime() + (now.getTimezoneOffset() + 60) * 60000);
  const currentMinutes = polandTime.getHours() * 60 + polandTime.getMinutes();
  const dayOfWeek = polandTime.getDay();

  const nowM = (polandTime.getHours() * 60)
  // const openM = (Number(schedule[1].startAt.split(':')[0]) * 60);
  //const endM = ((Number(schedule[1].endAt.split(':')[0]) * 60) + Number(schedule[1].endAt.split(':')[1]));
  // if (currentMinutes >= openM && currentMinutes < endM) {
  //   console.log({currentMinutes})
  //   console.log({openM})
  //   console.log({endM})
  //   //console.log(nowM)
  // }
  // else {
  //   console.log('closed')
  // }

  useEffect(() => {
    const getHours = async () => {
      const hours = await fetchOpenHours();
      //console.log(hours)
      if (hours) {

        hours.map(h => {
          console.log(h.startAt)
          if (h.status != 0) {
            const startAtSplit = h.startAt.split(':')
            const endAtAtSplit = h.startAt.split(':')
            const startAtM = Number(startAtSplit[0]) + Number(startAtSplit[1])
            const endAtM = Number(endAtAtSplit[0]) + Number(endAtAtSplit[1])
            const hour: OpenHoursDTO = {
              id: h.id,
              name: h.name,
              slug: h.slug,
              startAt: h.startAt,
              endAt: h.endAt,
              startM: startAtM,
              endAtM: endAtM,
              status: h.status
            }
            schedule?.push(hour)
          }
        })
      }
    }
    getHours();
  }, [])


  const today = schedule.find((s) => s.id === dayOfWeek);
  const isOpenNow = today ? currentMinutes >= today.startM && currentMinutes < today.endAtM : false;
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  const toggleExpand = () => {
    const toValue = expanded ? 0 : ROW_HEIGHT * (ROW_COUNT + 1);

    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(arrowRotation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Меняем состояние после анимации закрытия
    if (expanded) {
      setTimeout(() => setExpanded(false), 300);
    } else {
      setExpanded(true);
    }
  };
  const getSubtitle = (): string => {
    if (isWeekend) return 'Wrócimy w poniedziałek o 06:30';
    if (!today) return '';

    if (isOpenNow) {
      return `Zamknięcie o ${today.endAt}`;
    }
    if (currentMinutes < today.startM) {
      return `Otwarcie dziś o ${today.startAt}`;
    }

    // Ищем следующий рабочий день
    for (let i = 1; i <= 7; i++) {
      const nextDayNum = (dayOfWeek + i) % 7 || 7;
      if (nextDayNum >= 1 && nextDayNum <= 5) {
        const next = schedule.find(s => s.id === nextDayNum);
        if (next) {
          const dayName = nextDayNum === 1 && dayOfWeek >= 5 ? 'poniedziałek' : next.name.toLowerCase();
          return `Otwarcie w ${dayName} o ${next.startAt}`;
        }
      }
    }
    return 'Otwarcie w poniedziałek o 06:30';
  };

  const rotation = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const getMainStatus = (): { text: string; isOpen: boolean } => {
    if (isWeekend) return { text: 'Zamknięte w weekend', isOpen: false };
    if (!today) return { text: 'Zamknięte', isOpen: false };

    if (isOpenNow) {
      return { text: 'Otwarte', isOpen: true };
    }
    if (currentMinutes < today.startM) {
      return { text: 'Zamknięte', isOpen: false };
    }

    // Закрыто после рабочего дня → показываем следующий день
    return { text: 'Zamknięte', isOpen: false };
  };


  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      {/* Header */}
      <TouchableOpacity activeOpacity={0.8} onPress={toggleExpand} style={styles.header}>
        <View style={styles.statusRow}>
          <MaterialIcons
            name="access-time"
            size={36}
            color={theme.tint}
          />
          <View style={{ flex: 1 }}>
            {/* Основной статус — большой и жирный */}
            <Text style={[
              styles.statusText,
              {
                color: isOpenNow ? theme.green : theme.tint,
                fontWeight: '700',
                fontSize: 16,
              }
            ]}>
              {getMainStatus().text}
            </Text>

            {/* Серый подтекст снизу */}
            <Text style={{
              color: theme.text + '80', // серый, полупрозрачный
              fontSize: 13,
              marginTop: 2,
            }}>
              {getSubtitle()}
            </Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={28} color={theme.text} />
        </Animated.View>
      </TouchableOpacity>

      {/* Анимированный список */}
      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
        <View style={{ paddingBottom: 12 }}>
          {expanded &&
            schedule.map((item) => {
              const isToday = item.id === dayOfWeek;
              const isTodayOpen = isToday && isOpenNow;

              return (
                <View
                  key={item.id}
                  style={[
                    styles.row,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <View style={styles.dayContainer}>
                    <MaterialIcons name='calendar-month' size={20} color={theme.tint} />
                    <Text
                      style={[
                        styles.dayText,
                        { color: theme.text },
                      ]}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                  </View>

                  <View style={[styles.timeContainer, { backgroundColor: (isOpenNow && isToday) ? theme.green : isToday ? theme.tint : 'transparent' }]}>
                    <MaterialIcons
                      name="access-time"
                      size={20}
                      color={isTodayOpen ? 'white' : theme.icon}
                    />
                    <Text
                      style={[
                        styles.timeText,
                        { color: isTodayOpen ? 'white' : theme.text },
                      ]}
                    >
                      {item.startAt} – {item.endAt}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  statusText: {
    fontSize: 15.5,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    height: ROW_HEIGHT,
  },
  todayRow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OpeningHoursCard;