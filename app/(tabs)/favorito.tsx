import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoritoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Meus Favoritos</Text>
      
      <View style={styles.emptyState}>
        <Ionicons name="heart-dislike-outline" size={80} color="#1C1C1C" />
        <Text style={styles.textoVazio}>Nenhum episódio favoritado ainda.</Text>
        <Text style={styles.subtextoVazio}>Os episódios que você curtir aparecerão aqui.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  h1: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginTop: 10 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  textoVazio: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  subtextoVazio: { color: '#B3B3B3', fontSize: 14, marginTop: 10, textAlign: 'center' }
});