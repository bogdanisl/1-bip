import React from 'react';
import { Text } from 'react-native';
import { diffWords } from '../utils/diff';

interface Props {
  oldText: string;
  newText: string;
  style?: object;
}

/**
 * Renders a word-level diff between oldText and newText.
 * - Deleted words: red background + strikethrough
 * - Added words:   green background
 * - Unchanged:     default style
 */
export function DiffText({ oldText, newText, style }: Props) {
  const tokens = diffWords(oldText, newText);

  return (
    <Text style={style}>
      {tokens.map((token, i) => {
        if (token.op === 'equal') {
          return <Text key={i}>{token.value}</Text>;
        }
        if (token.op === 'insert') {
          return (
            <Text
              key={i}
              style={{
                backgroundColor: '#dcfce7',
                color: '#166534',
              }}
            >
              {token.value}
            </Text>
          );
        }
        // delete
        return (
          <Text
            key={i}
            style={{
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              textDecorationLine: 'line-through',
            }}
          >
            {token.value}
          </Text>
        );
      })}
    </Text>
  );
}