import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 8,
        lineHeight: 22,
    },
    listItem: {
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 5,
        lineHeight: 22,
    },
    bold: {
        fontWeight: 'bold',
    },
    link: {
        textDecorationLine: 'underline',
    },
});