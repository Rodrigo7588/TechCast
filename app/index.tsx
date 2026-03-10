import { Redirect } from 'expo-router';

export default function Index() {
  // O "as any" força o TypeScript a aceitar a rota sem reclamar
  return <Redirect href={"/(auth)/login" as any} />;
}