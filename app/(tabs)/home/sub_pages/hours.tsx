import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const OpeningHoursCard = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Current time in UTC+1 (Poland)
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const polandTime = new Date(utc + 3600000); // UTC+1
  const currentHour = polandTime.getHours();
  const currentMinute = polandTime.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const dayOfWeek = polandTime.getDay(); // 0 = Sunday, 1 = Monday...

  // Schedule (Monday = 1, Sunday = 0)
  const schedule = [
    { day: 1, name: 'Poniedziałek', open: '06:30', close: '15:00', minutes: { open: 6 * 60 + 30, close: 15 * 60 } },
    { day: 2, name: 'Wtorek',       open: '07:00', close: '15:00', minutes: { open: 7 * 60,     close: 15 * 60 } },
    { day: 3, name: 'Środa',       open: '07:00', close: '15:59', minutes: { open: 7 * 60,     close: 15 * 60 + 59 } },
    { day: 4, name: 'Czwartek',    open: '07:00', close: '15:00', minutes: { open: 7 * 60,     close: 15 * 60 } },
    { day: 5, name: 'Piątek',      open: '07:00', close: '13:00', minutes: { open: 7 * 60,     close: 13 * 60 } },
  ];

  const today = schedule.find(s => s.day === dayOfWeek) || null;
  const isOpenNow = today
    ? currentTimeInMinutes >= today.minutes.open && currentTimeInMinutes < today.minutes.close
    : false;

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2, shadowColor: '#000' }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>GODZINY PRACY</Text>
        <View style={[styles.statusBadge, { backgroundColor: isOpenNow ? '#1DB954' : '#666' }]}>
          <Text style={styles.statusText}>{isOpenNow ? 'OTWARTE' : 'ZAMKNIĘTE'}</Text>
        </View>
      </View>

      {/* Schedule List */}
      <View style={styles.list}>
        {schedule.map((item, index) => {
          const isToday = item.day === dayOfWeek;
          const isTodayOpen = isToday && isOpenNow;

          return (
            <View
              key={index}
              style={[
                styles.row,
                { backgroundColor: isTodayOpen ? '#1DB954' : theme.background },
                isTodayOpen && styles.todayRow,
              ]}
            >
              {/* Day + Icon */}
              <View style={styles.dayContainer}>
                <MaterialIcons name="calendar-today" size={20} color="#D32F2F" />
                <Text style={[styles.dayText, { color: isTodayOpen ? 'white' : theme.text }]}>
                  {item.name.toUpperCase()}
                </Text>
              </View>

              {/* Clock Icon + Hours */}
              <View style={styles.timeContainer}>
                <MaterialIcons
                  name="access-time"
                  size={20}
                  color={isTodayOpen ? 'white' : theme.icon}
                />
                <Text style={[styles.timeText, { color: isTodayOpen ? 'white' : theme.text }]}>
                  {item.open} – {item.close}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 20,
    marginTop:120,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  todayRow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  dayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dayText: {
    fontSize: 15,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OpeningHoursCard;