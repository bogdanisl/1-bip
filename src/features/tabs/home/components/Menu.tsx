import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';
import { router, RelativePathString } from 'expo-router';
import { storage } from '@/src/services/storage/asyncStorage';
import { useSelectedBipStore } from '@/src/hooks/use-selected-bip';
import IconPdf from '@/assets/icons/file-pdf-regular-full.svg';
import { ReadMoreButton } from '@/src/components/buttons/ReadMoreButton';

interface MenuProps {
  type?: 'top' | 'bottom';
  theme: any
}

export const Menu: React.FC<MenuProps> = ({ type = 'bottom', theme }) => {
  const { t } = useTranslation();
  const selectedBip = useSelectedBipStore((state) => state.selectedBip);
  const [documentsCount, setDocumentsCount] = useState(0);


  useEffect(() => {
    const loadCount = async () => {
      const documents = await storage.get<Document[]>(`${selectedBip?.id}/documents`);
      if (!documents) return;
      setDocumentsCount(documents.length)
    }
    loadCount();
  }, [])

  const { width } = Dimensions.get('screen');
  const handlePress = (route: RelativePathString) => {
    router.push(route);
  }

  const menuItems = useMemo(
    () => [
      { title: t('home.categories'), subtitle: t('home.categories_desc'), icon: 'list', route: '/(tabs)/home/categories' },
      { title: t('home.downloads'), subtitle: t('home.downloads_desc'), icon: 'download', route: '/(tabs)/home/documents', badge: documentsCount },
      { title: t('home.office_data'), subtitle: t('home.office_data_desc'), icon: 'account-balance', route: '/(tabs)/home/data' },
      { title: t('home.positions'), subtitle: t('home.positions_desc'), icon: 'work', route: '/(tabs)/home/employees' },
      { title: t('home.bip_editors'), subtitle: t('home.bip_editors_desc'), icon: 'group', route: '/(tabs)/home/editors' },
      { title: t('home.visit_statistics'), subtitle: t('home.visit_statistics_desc'), icon: 'bar-chart', route: '/(tabs)/home/statistics' },
      { title: t('home.change_log'), subtitle: t('home.change_log_desc'), icon: 'history', route: '/(tabs)/home/changeRegister' },
      { title: t('home.instruction'), subtitle: t('home.instruction_desc'), icon: 'file-open', route: '/(tabs)/home/instruction_bip' },
    ],
    [t, documentsCount]
  );

  const displayedItems = useMemo(() => {
    if (type === 'top') {
      return menuItems.slice(0, 2);
    }

    if (type === 'bottom') {
      return menuItems.slice(2);
    }

    return menuItems;
  }, [menuItems, type]);

  const handlePressInstruction = () => {
    router.push('/(tabs)/home/instruction_bip');
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 16, justifyContent: 'center' }}>
      {displayedItems.map((item: any, index: number) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.85}
          onPress={() => handlePress(item.route)}
          style={{
            width: (width - 48) / 2,
            height: 130,
            backgroundColor: theme.background_2,
            borderRadius: 20,
            padding: 16,
            justifyContent: 'space-between',
            elevation: 8,
          }}
        >
          {item.badge != null && item.badge > 0 && (
            <View style={{
              position: 'absolute',
              top: 8,
              right: 8,
              minWidth: 25,
              height: 25,
              borderRadius: 25,
              backgroundColor: theme.tint,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 6,
            }}>
              <Text style={{ color: theme.whiteText, fontSize: 14, fontWeight: '700' }}>{item.badge}</Text>
            </View>
          )}

          <MaterialIcons name={item.icon as any} size={36} color={theme.tint} />
          <View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: theme.text, marginBottom: 4 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: theme.icon, lineHeight: 14, height: 28 }}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* {type == 'bottom' &&
        <View style={{
          width: (width - 48) / 2,
          elevation: 8,
        }}>
          <View style={{ alignItems: 'center' }}>
            <IconPdf width={50} height={50} fill={theme.subText} style={{ marginVertical: 0 }} />
          </View>
          <TouchableOpacity
            onPress={handlePressInstruction}
            style={{
              backgroundColor: theme.tint,
              paddingHorizontal: 15,
              paddingVertical: 10,
              marginTop: 10,
              borderRadius: 10
            }}
          >
            <Text style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 13,
              fontFamily: 'Poppins-Bold',
            }}>
              {t('home.instruction').toUpperCase()}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: theme.subText,
              fontSize: 13,
              marginTop: 10
            }}
          >
            {t('home.instruction_desc')}
          </Text>
        </View>
      } */}
    </View>
  )
};
