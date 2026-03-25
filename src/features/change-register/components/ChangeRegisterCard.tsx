import { Skeleton } from '@/src/components/skeleton';
import { Colors } from '@/src/constants/theme';
import { useColorScheme } from '@/src/hooks/use-color-scheme.web';
import { ChangeRegisterEntry } from '@/src/types/ChangeRegister';
import { background } from '@expo/ui/swift-ui/modifiers';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Touchable, TouchableOpacity } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  item: ChangeRegisterEntry;
  theme: any;
  compact?: boolean;
  showArticleLink?: boolean;
}

function getIcon(type: string): string {
  const iconMap: Record<string, string> = {
    add: "add",
    edit: "edit",
    delete: "delete",
    publish: "upload",
    change_category: "category",
    sort: "sort",
    status_change: "sync_alt",
    moved_to_bin: "delete_outline",
    status_active: "check-circle",
    status_inactive: "cancel",
    "sort-attachments": "attach_file",
    "moved_from-bin": "restore"
  };

  return iconMap[type] || "history";
}


export function ChangeRegisterCard({
  item,
  theme,
  showArticleLink = true,
}: Props) {
  const { i18n, t } = useTranslation();
  const isInlineHistoryCard = !showArticleLink;
  const operationLabel = `${t(`change_register.operations.${item.operation}`)} ${t(`change_register.types.${item.itemType}`)}`;
  const formattedDate = new Date(item.date).toLocaleDateString(i18n.language, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleOpenArticle = () => {
    router.push(`./changeRegister/${item.objId}`);
  };

  const handleOpenVersionCompare = () => {
    if (!item.versionData?.versionId) {
      return;
    }

    router.push(`./${item.objId}/version/${item.versionData.versionId}`);
  };

  return (
    <TouchableOpacity
      disabled={isInlineHistoryCard}
      onPress={handleOpenArticle}
      style={[
        styles.card,
        {
          backgroundColor: theme.background_2,
        },
        isInlineHistoryCard && styles.inlineCard,
      ]}>
      {isInlineHistoryCard ? (
        <>
          <View style={[styles.inlineTopRow]}>
            <View style={styles.inlineMain}>
              <Text numberOfLines={1} style={[styles.inlineOperation, { color: theme.text }]}>
                {operationLabel}
              </Text>
              <View style={styles.inlineMetaRow}>
                <MaterialIcons name="schedule" size={14} color={theme.subText} />
                <Text numberOfLines={1} style={[styles.inlineMetaText, { color: theme.subText }]}>
                  {formattedDate}
                </Text>
              </View>
              <View style={styles.inlineMetaRow}>
                <MaterialIcons name="person-outline" size={14} color={theme.subText} />
                <Text numberOfLines={1} style={[styles.inlineMetaText, { color: theme.subText }]}>
                  {item.author}
                </Text>
              </View>
              {item.name && (
                <View style={styles.inlineMetaRow}>
                  <MaterialIcons name="attach-file" size={14} color={theme.subText} />
                  <Text numberOfLines={1} style={[styles.inlineMetaText, { color: theme.subText }]}>
                    {item.name}
                  </Text>
                </View>
              )}
            </View>
            <View style={{
              alignItems: 'flex-end',
              gap: 10,
              flexDirection: 'row'
            }}>

              {item.versionData?.version && (
                <Pressable
                  onPress={handleOpenVersionCompare}
                  style={[styles.versionBadge, styles.inlineVersionBadge, { backgroundColor: theme.background }]}
                >
                  <MaterialIcons name="label-outline" size={14} color={theme.tint} />
                  <Text style={[styles.versionText, { color: theme.tint }]}>
                    {t('change_register.version') + ' ' + item.versionData.version}
                  </Text>
                </Pressable>
              )}
              <View style={[styles.iconBadge, styles.inlineIconBadge, { backgroundColor: theme.background }]}>
                <MaterialIcons name={getIcon(item.operation) as any} size={18} color={theme.tint} />
              </View>
            </View>
          </View>

          {/* <View style={styles.inlineBottomRow}>
            <View style={styles.inlineMetaItem}>
              <MaterialIcons
                name={'person-outline'}
                size={14}
                color={theme.subText}
              />
              <Text numberOfLines={1} style={[styles.inlineMetaText, { color: theme.subText }]}>
                {item.author}
              </Text>
            </View>
          </View> */}
        </>
      ) : (
        <>
          <View style={styles.headerRow}>
            <View style={styles.titleWrap}>
              <Text style={[styles.title, { color: theme.text }]}>
                {item.title}
              </Text>

              <Text style={[styles.operation, { color: theme.tint }]}>
                {operationLabel}
              </Text>
            </View>

            {/* {item.versionData?.version ? (
              <Pressable
                onPress={handleOpenVersionCompare}
                style={[styles.versionBadge, { backgroundColor: theme.background }]}
              >
                <MaterialIcons name="label-outline" size={14} color={theme.tint} />
                <Text style={[styles.versionText, { color: theme.tint }]}>
                  {t('change_register.version')} {item.versionData.version}
                </Text>
              </Pressable>
            ) : null} */}

            <View style={[styles.iconBadge, { backgroundColor: theme.background }]}>
              <MaterialIcons name={getIcon(item.operation) as any} size={18} color={theme.tint} />
            </View>
          </View>

          <View style={styles.metaRow}>
            <MaterialIcons name="schedule" size={16} color={theme.subText} />
            <Text style={[styles.metaText, { color: theme.subText }]}>
              {formattedDate}
            </Text>
          </View>

          <View style={styles.metaRow}>
            <MaterialIcons name="person-outline" size={16} color={theme.subText} />
            <Text style={[styles.metaText, { color: theme.subText }]}>
              {item.author || t('change_register.unknown_author')}
            </Text>
          </View>

          {item.name ? (
            <View style={styles.metaRow}>
              <MaterialIcons name="attach-file" size={16} color={theme.subText} />
              <Text style={[styles.metaText, { color: theme.text }]}>{item.name}</Text>
            </View>
          ) : null}
        </>
      )}
    </TouchableOpacity>
  );
}

interface PreloaderProps {
  theme: any
}

export const ChangeRegisterCardPreloader = ({ theme }: PreloaderProps) => {
  return (
    <View style={[styles.card, styles.inlineCard, { backgroundColor: theme.background_2 }]}>
      <View style={styles.inlineTopRow}>
        <View style={styles.inlineMain}>
          <Skeleton borderRadius={5} width={'60%'} height={25} theme={theme} />
          <View style={styles.inlineMetaRow}>
            <Skeleton borderRadius={5} width={'40%'} height={15} theme={theme} />
          </View>
          <View style={styles.inlineMetaRow}>
            <Skeleton borderRadius={5} width={'50%'} height={15} theme={theme} />
          </View>
        </View>

        <Skeleton duration={1200} width={34} height={34} borderRadius={55} theme={theme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 18,
    gap: 10,
  },
  inlineCard: {
    height: 125,
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleWrap: {
    flex: 1,
    gap: 6,
  },
  titleLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 17,
    lineHeight: 24,
    fontFamily: 'Poppins-SemiBold',
    flexShrink: 1,
  },
  linkTitle: {
    textDecorationLine: 'underline',
  },
  operation: {
    fontSize: 13,
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inlineTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  inlineBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  inlineMain: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    minWidth: 0,
  },
  inlineOperation: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  inlineMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
  },
  inlineMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minWidth: 0,
    flex: 1,
  },
  inlineMetaText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
  },
  iconBadge: {
    width: 34,
    height: 34,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineIconBadge: {
    margin: 0,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  versionBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,

    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  inlineVersionBadge: {
    minWidth: 74,
    height: 34,
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  inlineVersionSpacer: {
    width: 74,
  },
  versionText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
});
