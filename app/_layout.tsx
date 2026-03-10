import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // O Stack controla a navegação em "pilha" e esconde o cabeçalho global
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="episodio" />
    </Stack>
  );
}