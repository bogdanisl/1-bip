import { Linking } from "react-native";
import { showMessage } from "react-native-flash-message";
import * as Clipboard from 'expo-clipboard';


export const openLinkingPhone = async (number: string) => {
    try {
        await Linking.openURL(`tel:${number}`);
    }
    catch(err) {
        await Clipboard.setStringAsync(number);
        showMessage({
            message: 'Skopiowano do schowka!',
            type: 'success',
        });
    }
}
export const openLinkingEmail = async (email: string) => {
    try {
        await Linking.openURL(`mailto:${email}`);
    }
    catch(err) {
        await Clipboard.setStringAsync(email);
        showMessage({
            message: 'Skopiowano do schowka!',
            type: 'success',
        });
    }
}