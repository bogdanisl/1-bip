import { styles } from "@/assets/styles/recent_index";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { MaterialIcons } from "@expo/vector-icons";
import { View,Text } from "react-native";
import { ReadMoreButton } from "../../buttons/ReadMoreButton";

export const HandleArticleCard = ({ article }: { article: HandleArticle }) => {
  const theme = useColorScheme() === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.card, { backgroundColor: theme.background_2 }]}>
      <Text style={[styles.recentHeader, { color: theme.text }]}>
        Uchwała:{' '}
        <Text style={{ fontWeight: 'bold' }}>
          {article.handleNumber || 'brak numeru'}
        </Text>
        , z dnia:{' '}
        <Text style={{ fontWeight: 'bold' }}>
          {article.fromDay || 'brak daty'}
        </Text>
      </Text>

      {article.regarding && (
        <Text style={{ color: theme.text, marginTop: 4 }}>
          w sprawie: <Text style={{ fontWeight: '600' }}>{article.regarding}</Text>
        </Text>
      )}

      <View style={styles.infoRow}>
        <MaterialIcons name="schedule" size={18} color={theme.icon} />
        <Text style={[styles.infoText, { color: theme.text }]}>
          Dodano: {article.addedDate.toLocaleDateString('pl-PL')}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { }]} />
      </View>

      <ReadMoreButton article={article} theme={theme} />
    </View>
  );
};