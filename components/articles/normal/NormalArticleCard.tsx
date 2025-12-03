import { styles } from "@/assets/styles/recent_index";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { NormalArticle } from "@/types/Article";
import { MaterialIcons } from "@expo/vector-icons";
import { View,Text } from "react-native";
import { ReadMoreButton } from "../../buttons/ReadMoreButton";

export const NormalArticleCard = ({ article }: { article: NormalArticle }) => {
  const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      <Text style={[styles.recentHeader, { color: theme.text }]}>
        {article.title || 'Artykuł bez tytułu'}
      </Text>

      {article.subtitle && (
        <Text style={{ color: theme.subText, marginTop: 4 }}>
          {article.subtitle}
        </Text>
      )}

      <View style={styles.infoRow}>
        <MaterialIcons name="schedule" size={18} color={theme.icon} />
        <Text style={[styles.infoText, { color: theme.text }]}>
          Dodano: {article.addedDate.toLocaleDateString('pl-PL')}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar]} />
      </View>

      <ReadMoreButton article={article} theme={theme} />
    </View>
  );
};