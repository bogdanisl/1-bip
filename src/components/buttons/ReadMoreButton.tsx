import { styles } from "@/assets/styles/recent_index";
import { Article } from "@/src/types/Article";
import { RelativePathString, useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";

export const ReadMoreButton = ({ article, theme, path }: { article: Article; theme: any, path?: RelativePathString }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => {
      if (path) {
        router.push({
          pathname: path,
        });
      } else {
        router.push({
          pathname: `../recent/${article.id}`
        });
      }
      setLoading(false);
    }, 0);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.readMoreButton, { backgroundColor: theme.tint }]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.background_2} />
      ) : (
        <Text style={[styles.readMoreText, { color: theme.whiteText }]}>
          {t('read_more').toUpperCase()}
        </Text>
      )}
    </TouchableOpacity>
  );
};
