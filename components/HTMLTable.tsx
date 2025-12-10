import RenderHtml from 'react-native-render-html';
import { useWindowDimensions, View, Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

// Twój własny komponent tabeli
const HtmlTable = ({ html }: { html: string }) => {
  const { width } = useWindowDimensions();
  const contentWidth = width - 40; // marginesy

  // Proste parsowanie HTML tabeli (bez zewnętrznych bibliotek)
  const rows = html.match(/<tr[^>]*>([\s\S]*?)<\/tr>/g) || [];
    const theme = useColorScheme() == 'dark'? Colors.dark:Colors.light
  return (
    <View style={{ 
      borderWidth: 1, 
      borderColor: '#ccc', 
      marginVertical: 10,
      width: '100%'
    }}>
      {rows.map((row, rowIndex) => {
        const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) || [];
        
        return (
          <View 
            key={rowIndex}
            style={{ 
              flexDirection: 'row',
              minHeight: 44,
              alignItems: 'center',
              backgroundColor: rowIndex === 0 ? '#f5f5f5' : 'white'
            }}
          >
            {cells.map((cell, cellIndex) => {
              // Usuń tagi HTML z treści komórki
              const text = cell
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .trim();

              const isHeader = /<th/.test(cell);

              return (
                <View
                  key={cellIndex}
                  style={{
                    flex: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    justifyContent: 'center',
                  }}
                >
                  <Text 
                    style={{ 
                      fontWeight: isHeader ? '700' : 'normal',
                      fontSize: 16,
                      lineHeight: 22,
                      color: theme.text,
                    }}
                  >
                    {text}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};