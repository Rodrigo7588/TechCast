import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const EPISODIOS = [
  { id: '1', titulo: 'O Futuro do React Native', duracao: '10 min', imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
  { id: '2', titulo: 'Clean Code na Prática', duracao: '10 min', imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop', videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' },
];

export default function HomeScreen() {
  // Guarda o ID do vídeo que está tocando no momento
  const [videoAtivo, setVideoAtivo] = useState<string | null>(null);

  const renderizarEpisodio = ({ item }: { item: any }) => {
    // Se o usuário clicou no play, renderiza o Player de Vídeo em vez do card
    if (videoAtivo === item.id) {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: item.videoUrl }}
            style={styles.player}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay // Faz o vídeo começar sozinho
          />
          <TouchableOpacity style={styles.botaoFecharVideo} onPress={() => setVideoAtivo(null)}>
            <Text style={styles.textoFecharVideo}>Fechar Vídeo</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Se não clicou no play, mostra o card normal
    return (
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => setVideoAtivo(item.id)}>
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
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Novos Episódios</Text>
      
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
  textoDuracao: { color: '#B3B3B3', fontSize: 14 },
  
  // Estilos novos para o Player de Vídeo
  videoContainer: { backgroundColor: '#1C1C1C', borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
  player: { width: '100%', height: 200 },
  botaoFecharVideo: { backgroundColor: '#FF4C4C', padding: 10, alignItems: 'center' },
  textoFecharVideo: { color: '#FFFFFF', fontWeight: 'bold' }
});