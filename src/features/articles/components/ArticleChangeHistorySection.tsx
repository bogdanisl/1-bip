import { EmptyState } from '@/src/components/EmptyState';
import ActivityIndicator from '@/src/components/ActivityIndicator';
import { Br } from '@/src/components/Br';
import { useArticleChangeHistory } from '@/src/hooks/use-change-register';
import { Article } from '@/src/types/Article';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { ChangeRegisterCard, ChangeRegisterCardPreloader } from '@/src/features/change-register/components/ChangeRegisterCard';
import { ChangeRegisterEntry } from '@/src/types/ChangeRegister';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  article: Article;
  theme: any;
}

export function ArticleChangeHistorySection({ article, theme }: Props) {
  const { t } = useTranslation();
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const skeletonData: ChangeRegisterEntry[] = Array.from({ length: Number(article.versionCount ?? '6') }, (_, i) => ({
    id: -i - 1,
  } as ChangeRegisterEntry));
  const [isOpen, setIsOpen] = React.useState(false);
  const arrowRotation = useRef(new Animated.Value(0)).current;
  const {
    items,
    isLoading,
    error,
    reload,
  } = useArticleChangeHistory({
    articleId: article.id,
    enabled: isOpen,
  });


  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: isOpen ? 1 : 0,
      duration: 280,
      useNativeDriver: true,
    }).start();

    Animated.timing(animatedHeight, {
      toValue: isOpen ? 1 : 0,
      duration: (280),
      useNativeDriver: false,
    }).start();
  }, [arrowRotation, isOpen]);

  const rotation = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const contentHeight = (((article.versionCount ?? 1) * 140) + 10);


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => setIsOpen((previous) => !previous)}
        style={styles.header}
        activeOpacity={0.85}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {t('change_register.page_title')}
          </Text>

          <View style={[styles.countBadge, { backgroundColor: theme.tint }]}>
            <Text style={[styles.countText, { color: theme.whiteText }]}>
              {article.versionCount ?? 0}
            </Text>
          </View>
        </View>

        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <MaterialIcons name="expand-more" size={28} color={theme.subText} />
        </Animated.View>
      </TouchableOpacity>

      <Br theme={theme}/>

      <Animated.View
        style={{
          height: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          }),
          overflow: 'hidden',
        }}
      >
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.list}>
              {skeletonData.map((item) => (
                <ChangeRegisterCardPreloader
                  key={item.id}
                  theme={theme}
                />
              ))}
            </View>
          ) : null}

          {!isLoading && error ? (
            <View style={styles.stateWrap}>
              <EmptyState
                iconName="error-outline"
                title={t('change_register.error_title')}
                description={t('change_register.history_error_description')}
                onRefresh={reload}
              />
            </View>
          ) : null}

          {!isLoading && !error && items.length === 0 ? (
            <View style={styles.stateWrap}>
              <EmptyState
                iconName="history-toggle-off"
                title={t('change_register.history_empty_title')}
                description={t('change_register.history_empty_description')}
              />
            </View>
          ) : null}

          {!isLoading && !error && items.length > 0 ? (
            <View style={styles.list}>
              {items.map((item) => (
                <ChangeRegisterCard
                  key={`${item.id}`}
                  item={item}
                  theme={theme}
                  compact
                  showArticleLink={false}
                />
              ))}
            </View>
          ) : null}
        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  countBadge: {
    minWidth: 25,
    height: 25,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700'
  },
  content: {
    marginTop: 12,
  },
  loadingBox: {
    borderWidth: 1,
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  stateWrap: {
    paddingVertical: 16,
  },
  list: {
    gap: 12,
  },
});
