import { styles } from "@/assets/styles/recent_index";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Article } from "@/types/Article";
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
  path?: RelativePathString
};

export const ArticleCard = ({ article, style, path }: ArticleCardProps) => {
  const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;
  var he = require('he');
  const { t, i18n } = useTranslation();

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }, style]}>
      <View style={{ flex: 1, paddingRight: 40, position: 'relative', marginBottom: article.subtitle ? 0 : 8 }}>
        <Text
        onPress={()=>{console.log(path)}}
          style={[
            styles.recentHeader,
            {
              color: theme.text,
              flexWrap: 'wrap',
            },
          ]}
        >
          {he.decode(article.title) || 'Artykuł bez tytułu'}
        </Text>

        <View style={{ position: 'absolute', flexDirection: 'row', top: 0, right: 0, alignItems: 'center' }}>
          <MaterialIcons name="visibility" size={18} color={theme.subText} />
          <Text style={{ color: theme.subText }}> {article.views ?? 0}</Text>
        </View>
      </View>
      {article.subtitle && (
        <Text style={{ color: theme.subText, marginBottom: 8, marginTop: 5 }}>
          {article.subtitle}
        </Text>
      )}
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
        {
          path ?
            <ReadMoreButton article={article} theme={theme}  path={path} />
            :
            <ReadMoreButton article={article} theme={theme}/>

        }
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