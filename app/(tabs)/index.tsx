import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EPISODIOS = [
  { id: '1', titulo: 'O Futuro do React Native', duracao: '45 min', imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop' },
  { id: '2', titulo: 'Clean Code na Prática', duracao: '32 min', imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop' },
  { id: '3', titulo: 'Introdução a Banco de Dados', duracao: '50 min', imagem: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=400&auto=format&fit=crop' },
  { id: '4', titulo: 'Acessibilidade (WCAG 2.2)', duracao: '28 min', imagem: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=400&auto=format&fit=crop' },
];

export default function HomeScreen() {

  const renderizarEpisodio = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <Image source={{ uri: item.imagem }} style={styles.imagemCard} />
      <View style={styles.infoCard}>
        <Text style={styles.tituloEpisodio}>{item.titulo}</Text>
        <View style={styles.duracaoContainer}>
          <Ionicons name="time-outline" size={16} color="#B3B3B3" />
          <Text style={styles.textoDuracao}>{item.duracao}</Text>
        </View>
      </View>
      <Ionicons name="play-circle" size={40} color="#3B82F6" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Novos Episódios</Text>
      
      {/* O requisito de ouro do professor: FlatList */}
      <FlatList
        data={EPISODIOS}
        keyExtractor={item => item.id}
        renderItem={renderizarEpisodio}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', paddingHorizontal: 16 },
  h1: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginVertical: 20 },
  card: { flexDirection: 'row', backgroundColor: '#1C1C1C', borderRadius: 12, padding: 12, marginBottom: 16, alignItems: 'center' },
  imagemCard: { width: 70, height: 70, borderRadius: 8, marginRight: 12 },
  infoCard: { flex: 1 },
  tituloEpisodio: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  duracaoContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  textoDuracao: { color: '#B3B3B3', fontSize: 14 }
});