import { Article } from '@/src/types/Article';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { DiffText } from './DiffText';

var he = require('he');

interface Props {
  article: Article;
  theme: any;
  /** When provided, title will show a word-level diff against this article. */
  compareWith?: Article;
}

export function ArticleHeaderDiff({ article, theme, compareWith }: Props) {
  const title = he.decode(article.title ?? '');
  const subtitle = article.subtitle ? he.decode(article.subtitle) : null;

  const oldTitle = compareWith ? he.decode(compareWith.title ?? '') : null;
  const oldSubtitle =
    compareWith && compareWith.subtitle
      ? he.decode(compareWith.subtitle)
      : null;

  const titleChanged = oldTitle !== null && oldTitle !== title;
  const subtitleChanged = oldSubtitle !== null && oldSubtitle !== subtitle;

  return (
    <View style={{ marginBottom: 10 }}>
      {/* TITLE */}
      {titleChanged && oldTitle ? (
        <DiffText
          oldText={oldTitle}
          newText={title}
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text,
            paddingRight: 50,
          }}
        />
      ) : (
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text,
            paddingRight: 50,
          }}
        >
          {title}
        </Text>
      )}

      {/* SUBTITLE */}
      {subtitle ? (
        subtitleChanged && oldSubtitle ? (
          <DiffText
            oldText={oldSubtitle}
            newText={subtitle}
            style={{ color: theme.subText, marginTop: 8, fontSize: 18 }}
          />
        ) : (
          <Text style={{ color: theme.subText, marginTop: 8, fontSize: 18 }}>
            {subtitle}
          </Text>
        )
      ) : null}

      {/* VIEWS */}
      <View style={{ alignItems: 'flex-end' }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        >
          <MaterialIcons name="visibility" size={18} color={theme.subText} />
          <Text style={{ color: theme.subText, marginLeft: 4 }}>
            {article.views ?? 0}
          </Text>
        </View>
      </View>
    </View>
  );
}