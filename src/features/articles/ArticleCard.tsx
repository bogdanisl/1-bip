import { styles } from "@/assets/styles/recent_index";
import { Colors } from "@/src/constants/theme";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import { Article } from "@/src/types/Article";
import { MaterialIcons } from "@expo/vector-icons";
import { View, Text, Dimensions, ViewStyle } from "react-native";
import { ReadMoreButton } from "../../components/buttons/ReadMoreButton";
import { Skeleton } from "../../components/skeleton";
import { useTranslation } from "react-i18next";
import { Br } from "../../components/Br";
import { RelativePathString } from "expo-router";

type ArticleCardProps = {
  article: Article;
  style?: ViewStyle | ViewStyle[];
  path?: RelativePathString;
  variant?: 'short' | 'full'
};

export const ArticleCard = ({ article, style, variant = 'full', path }: ArticleCardProps) => {
  var he = require('he');
  const theme = useColorScheme() == 'dark'? Colors.dark: Colors.light
  const { t, i18n } = useTranslation();
  const width = Dimensions.get('window').width;
  const isShort = variant == 'short';

  return (
    <View style={[
      styles.card,
      { backgroundColor: theme.background_2 },
      isShort && { maxHeight: 240 }, // fixed-ish height range
      style,
    ]}>
      {/* Header row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingRight: 8 }}>
        <View style={{ flex: 1, paddingRight: 12 }}>
          {/* Title – single line + ellipsis in short mode */}
          <Text
            numberOfLines={isShort ? 2 : 0}
            style={[
              styles.recentHeader,
              { color: theme.text },
              isShort && { height: 40 },
            ]}
          >
            {article.title}
          </Text>
        </View>

        {/* Views count */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
          <MaterialIcons name="visibility" size={22} color={theme.subText} />
          <Text style={{ color: theme.subText, marginLeft: 4, fontSize: 13 }}>
            {article.views ?? 0}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={isShort ? 1 : 0}
        style={[
          {
            color: theme.subText,
            marginTop: 6,
            marginBottom: 6,
            fontSize: 14,
            paddingRight: 30,
          },
          isShort && { height: 20 },

        ]}
      >
        {article.subtitle}
      </Text>

      <Br />

      <View style={[styles.infoRow, { marginTop: 0 }]}>
        <MaterialIcons name="schedule" size={18} color={theme.icon} />
        <Text style={[styles.infoText, { color: theme.text }]}>
          {article.publishedAt?.date ? t('added') + new Date(article.publishedAt.date).toLocaleDateString(i18n.language) : ''}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name='person-add-alt-1' size={18} color={theme.icon} />
        <Text style={[styles.infoText, { color: theme.text, marginRight: 10 }]}>
          {article.acceptedBy ? t('added_by_2') + article.acceptedBy : ''}
        </Text>
      </View>

      {/* <View style={styles.progressContainer}>
        <View style={[styles.progressBar]} />
      </View> */}
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <ReadMoreButton article={article} theme={theme} path={path}/>
      </View>
    </View>
  );
};

export const ArticleCardPreloader = () => {
  const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      <View style={{ flex: 1, paddingRight: 40, position: 'relative' }}>
        <Skeleton width={'100%'} height={20} theme={theme}></Skeleton>
      </View>
      <Skeleton width={'70%'} height={15} style={{ marginTop: 10 }} theme={theme}></Skeleton>
      <View style={[styles.infoRow, { marginTop: 20 }]}>
        <Skeleton width={'50%'} height={10} theme={theme}></Skeleton>
      </View>
      <View style={styles.infoRow}>
        <Skeleton width={'50%'} height={10} theme={theme}></Skeleton>
      </View>
      <View style={[styles.infoRow, { alignSelf: 'flex-end' }]}>
        <Skeleton width={'50%'} height={50} theme={theme}></Skeleton>
      </View>
    </View>
  );
};