import { Response } from "@/types/Response";
import { VersionResponse } from "@/types/VersionResponse";
import { Platform } from "react-native";
import * as Application from 'expo-application'

export async function checkVersion(): Promise<VersionResponse | null> {
    try {
        const os = Platform.OS;
        const version = Application.nativeApplicationVersion || '1.0.0'
        const appSlug = "BIP"

        const response = await fetch(`https://api.voyager.am1.pl/version`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ os, version, appSlug }),
        });
        if (!response.ok) {
            console.warn('Failed to check app version: ', response);
            return null;
        }

        const version_response: VersionResponse = await response.json();
        console.log(version_response)
        return version_response;
    }
    catch (err) {
        console.warn('Failed to check app version: ', err);
        return null;
    }
}