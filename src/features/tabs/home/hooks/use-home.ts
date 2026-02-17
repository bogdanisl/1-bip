import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelectedBipStore } from '../../../../hooks/use-selected-bip';
import { OfficeData } from '@/src/types/OfficeData';
import { officeDataExample } from '@/src/constants/data_example';
import { storage } from '@/src/services/storage/asyncStorage';
import { checkVersion } from '@/src/services/versionControl';
import { VersionResponse } from '@/src/types/VersionResponse';
import { Bip } from '@/src/types/Bip';


export function useHome() {
  const selectedBip = useSelectedBipStore((s) => s.selectedBip);

  // States
  const [officeData, setOfficeData] = useState<OfficeData | null>(null);
  const [savedBips, setSavedBips] = useState<Bip[] | null>(null);
  const [lang, setLang] = useState('pl-PL');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  // === Load language from AsyncStorage
  const loadLanguage = useCallback(async () => {
    const saved = await AsyncStorage.getItem('app_language');
    setLang(saved || 'pl-PL');
  }, []);

  // === Load selected BIPs from AsyncStorage
  const loadSavedBips = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selectedBipCities');
      if (jsonValue) {
        const parsed: Bip[] = JSON.parse(jsonValue);
        setSavedBips(parsed.length > 1 ? parsed : null);
      } else {
        setSavedBips(null);
      }
    } catch (error) {
      console.error('Failed to load selected BIP:', error);
      setSavedBips(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // === Load office data
  const loadOfficeData = useCallback(async () => {
    if (!selectedBip) {
      setOfficeData(officeDataExample);
      return;
    }

    const data = await storage.get<OfficeData>(`${selectedBip.id}/officeData`);
    setOfficeData(data || null);
  }, [selectedBip]);

  // === Check app version
  const checkAppVersion = useCallback(async () => {
    try {
      const result: VersionResponse | null = await checkVersion();
      if (result?.updateAvailable) {
        setIsUpdateAvailable(true);
      } else {
        setIsUpdateAvailable(false);
      }
    } catch (err) {
      console.error('Version check failed', err);
      setIsUpdateAvailable(false);
    }
  }, []);

  // === Pull-to-refresh
  const refresh = useCallback(async () => {
    setRefreshing(true);
    await loadSavedBips();
    await loadOfficeData();
    await checkAppVersion();
    setRefreshing(false);
  }, [loadSavedBips, loadOfficeData, checkAppVersion]);

  // === Initial load
  useEffect(() => {
    loadLanguage();
    loadSavedBips();
    loadOfficeData();
    checkAppVersion();
  }, [loadSavedBips, loadOfficeData, checkAppVersion, loadLanguage]);

  return {
    officeData,
    savedBips,
    lang,
    loading,
    refreshing,
    isUpdateAvailable,
    refresh,
  };
}
