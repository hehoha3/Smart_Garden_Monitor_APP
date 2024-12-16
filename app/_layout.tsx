import { Stack } from "expo-router";

// Import your global CSS file
import "../global.css";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="imagesShow" options={{ headerShown: false }} />
            <Stack.Screen name="imagesShow/[url]" options={{ headerShown: false }} />
        </Stack>
    );
}