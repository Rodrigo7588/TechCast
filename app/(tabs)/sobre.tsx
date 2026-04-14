import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="headset" size={80} color="#3B82F6" style={styles.icone} />
        
        <Text style={styles.titulo} accessibilityRole="header">TechCast</Text>
        <Text style={styles.versao}>Versão 1.0.0</Text>
        
        <View style={styles.cardInfo}>
          <Text style={styles.descricao}>
            Aplicativo desenvolvido como requisito de avaliação da disciplina. Focado em acessibilidade, persistência de dados local e navegação em abas.
          </Text>
        </View>

        <View style={styles.rodape}>
          <Text style={styles.creditoTitulo}>Desenvolvido por:</Text>
          <Text style={styles.creditoNome}>Rodrigo Abreu</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icone: {
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  versao: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 30,
  },
  cardInfo: {
    backgroundColor: '#1C1C1C',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3B82F6',
    width: '100%',
    marginBottom: 40,
  },
  descricao: {
    color: '#E5E5E5',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  rodape: {
    alignItems: 'center',
  },
  creditoTitulo: {
    color: '#B3B3B3',
    fontSize: 14,
    marginBottom: 4,
  },
  creditoNome: {
    color: '#3B82F6',
    fontSize: 20,
    fontWeight: 'bold',
  },
});