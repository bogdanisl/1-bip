import { ButtonProps, TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import TranslateIcon from '@/assets/icons/language-solid-full.svg';
import { useTranslation } from "react-i18next";

interface Props {
    theme: any;
    onPress: () => void;
    loading?: boolean; // добавили флаг загрузки
    buttonProps?: ButtonProps;
    label: string
}

export const TranslateButton = ({ theme, buttonProps, onPress, loading, label }: Props) => {
    const { i18n } = useTranslation();
    if (i18n.language === 'pl') return <View />;

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={loading} // блокируем кнопку во время загрузки
            style={{
                marginTop: 8,
                marginLeft: 2,
                flexDirection: 'row',
                alignItems: 'center',
                maxWidth: '40%',
            }}
            {...buttonProps}
        >
            <View
                style={{
                    padding: 2,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: theme.subText
                }}
            >
                <View style={{
                    padding: 7,
                    backgroundColor: theme.tint,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {loading ? (
                        <ActivityIndicator size="small" color={theme.whiteText} />
                    ) : (
                        <TranslateIcon width={25} height={25} fill={theme.whiteText} />
                    )}
                </View>
            </View>
            <Text style={{
                color: theme.text,
                fontSize: 14,
                marginLeft: 5,
            }}>{label}</Text>
        </TouchableOpacity>
    );
};