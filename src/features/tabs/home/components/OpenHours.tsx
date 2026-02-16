import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { OpenHours, OpenHoursDTO } from '@/types/OpenHours';
import { fetchOpenHours } from '@/utils/data';
import { storage } from '@/utils/storage/asyncStorage';
import { useSelectedBipStore } from '@/hooks/use-selected-bip';
import { useTranslation } from 'react-i18next';
import { openHoursExample } from '@/constants/data_example';

const ROW_HEIGHT = 60;
const ROW_COUNT = 5;

const OpeningHoursCard = () => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);

  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const arrowRotation = useRef(new Animated.Value(0)).current;

  const now = new Date();
  const [schedule, setSchedule] = useState<OpenHoursDTO[]>([])
  const polandTime = new Date(now.getTime() + (now.getTimezoneOffset() + 60) * 60000);
  const currentMinutes = (polandTime.getHours() * 60 + polandTime.getMinutes());
  const dayOfWeek = polandTime.getDay();

  useEffect(() => {
    const getHours = async () => {
      if (selectedBip == null) {
        setSchedule(openHoursExample);
        return;
      }
      const hours = await storage.get<OpenHoursDTO[]>(`${selectedBip?.id}/hours`);
      if (hours) {
        setSchedule(hours);
      }
      else {
        setSchedule([]);
      }
    }
    getHours();
  }, [selectedBip])


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
    if (isWeekend) return t('opens_at_day') + t('monday').toLowerCase() + ` o ${schedule[0].startAt}`;
    if (!today) return '';

    if (isOpenNow) {
      return t('closing_at', { closesAt: today.endAt });
    }
    if (currentMinutes < today.startM) {
      return t('opens_at', { opensAt: today.startAt });
    }

    for (let i = 1; i <= 7; i++) {
      const nextDayNum = (dayOfWeek + i) % 7 || 7;
      if (nextDayNum >= 1 && nextDayNum <= 5) {
        const next = schedule.find(s => s.id === nextDayNum);
        if (next) {
          const dayName = nextDayNum === 1 && dayOfWeek >= 5 ? 'monday' : next.slug.toLowerCase();
          return t('opens_at_day') + t(dayName).toLowerCase() + ` o ${next.startAt}`;
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
    //console.log(schedule.length)
    if (isWeekend) return { text: 'close', isOpen: false };
    if (!today) return { text: 'close', isOpen: false };

    if (isOpenNow) {
      return { text: 'open', isOpen: true };
    }
    if (currentMinutes < today.startM) {
      return { text: 'close', isOpen: false };
    }
    return { text: 'close', isOpen: false };
  };

  if (schedule.length == 0) return null;

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
            <Text style={[
              styles.statusText,
              {
                color: isOpenNow ? theme.green : theme.tint,
                fontWeight: '700',
                fontSize: 16,
              }
            ]}>
              {t(getMainStatus().text)}
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
                    {
                      backgroundColor: theme.background,
                      shadowColor:'#000',
                      shadowOpacity: 0,
                      shadowRadius: 6,
                      shadowOffset: { width: 0, height: 2 },
                      elevation: 3,

                    },
                  ]}
                >
                  <View style={styles.dayContainer}>
                    <MaterialIcons name='calendar-month' size={20} color={theme.tint} />
                    <Text
                      style={[
                        styles.dayText,
                        {
                          color: theme.text,
                          fontSize: 16,
                        },
                      ]}
                    >
                      {t(item.slug.toLowerCase())}
                    </Text>
                  </View>

                  <View style={[styles.timeContainer, { backgroundColor: (isOpenNow && isToday) ? theme.green : isToday ? theme.tint : 'transparent' }]}>
                    <MaterialIcons
                      name="access-time"
                      size={20}
                      color={isToday ? 'white' : theme.icon}
                    />
                    <Text
                      style={[
                        styles.timeText,
                        { color: isToday ? 'white' : theme.text },
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
    borderRadius: 15,
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
    fontSize: 16,
    //    fontWeight: Platform.OS == 'android' ? '700' : '600',
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
    fontSize: 16,
    //fontWeight: Platform.OS == 'android' ? '700' : '600',
  },
});

export default OpeningHoursCard;