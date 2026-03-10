import { Redirect } from 'expo-router';

export default function Index() {
  // Isso força o aplicativo a jogar o usuário direto para a tela de login ao abrir
  return <Redirect href={"/(auth)/login" as any} />;
}