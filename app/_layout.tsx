import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones nativa do Expo

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        // Cores baseadas no seu Design System
        tabBarStyle: { backgroundColor: '#1C1C1C', borderTopColor: '#3B82F6' },
        tabBarActiveTintColor: '#3B82F6', // Azul quando selecionado
        tabBarInactiveTintColor: '#B3B3B3', // Cinza quando inativo
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}
    >
      {/* Tela 1: Home */}
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Episódios', 
          tabBarIcon: ({ color }) => <Ionicons name="headset" size={24} color={color} /> 
        }} 
      />
      
      {/* Tela 2: Favoritos */}
      <Tabs.Screen 
        name="favorito" 
        options={{ 
          title: 'Favoritos', 
          tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> 
        }} 
      />

      {/* Tela 3: Perfil */}
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil', 
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> 
        }} 
      />

      {/* Escondendo a rota 'explore' (que veio no template) para não poluir sua Bottom Bar */}
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}