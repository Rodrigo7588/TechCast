import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarStyle: { backgroundColor: '#1C1C1C', borderTopColor: '#3B82F6', paddingBottom: 5, height: 60 },
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#B3B3B3',
        headerStyle: { backgroundColor: '#0D0D0D' },
        headerTintColor: '#FFFFFF',
        headerTitleAlign: 'center',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Início', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="explore" 
        options={{ title: 'Explorar', tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="anotacoes" 
        options={{ title: 'Anotações', tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="favorito" 
        options={{ title: 'Favoritos', tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} /> }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ title: 'Perfil', tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> }} 
      />
      
      {/* --- A SUA NOVA TELA AQUI --- */}
      <Tabs.Screen 
        name="sobre" 
        options={{ 
          title: 'Sobre', 
          tabBarIcon: ({ color }) => <Ionicons name="information-circle" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}