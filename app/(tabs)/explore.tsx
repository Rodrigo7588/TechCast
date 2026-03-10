import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tela de Explorar Categorias</Text>
      <Text style={styles.subtexto}>Em breve: Busca de episódios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0D0D0D', // Fundo padrão do TechCast
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  texto: { 
    color: '#FFFFFF', 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtexto: {
    color: '#B3B3B3',
    fontSize: 16
  }
});