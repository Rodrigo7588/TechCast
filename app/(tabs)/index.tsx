import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Pressable, TextInput } from 'react-native';
import { Link } from 'expo-router';

// 1. NOVO MODELO DE DADOS (Conforme sua documentação)
interface Episodio {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  videoUrl: string; // Adicionado
  audioUrl: string; // Adicionado
}

// Dados simulados atualizados
const DADOS_EPISODIOS: Episodio[] = [
  { 
    id: '1', 
    titulo: 'Acessibilidade na Web e Mobile', 
    descricao: 'Como aplicar WCAG 2.2 em projetos React Native.', 
    duracao: '15 min',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    audioUrl: ''
  },
  { 
    id: '2', 
    titulo: 'Clean Code na Prática', 
    descricao: 'Escrevendo código que humanos entendem.', 
    duracao: '22 min',
    videoUrl: '',
    audioUrl: ''
  },
];

export default function HomeScreen() {

  const renderizarItem = ({ item }: { item: Episodio }) => (
    <Link href={{ pathname: "/episodio/[id]", params: { id: item.id } }} asChild>
      <Pressable 
        style={({ pressed }) => [
          styles.card, 
          pressed && styles.cardPressionado
        ]}
        // Acessibilidade: Leitores de tela vão ler isso ao focar no card
        accessibilityRole="button"
        accessibilityLabel={`Episódio: ${item.titulo}. Duração: ${item.duracao}.`}
      >
        <View style={styles.cardHeader}>
          {/* Acessibilidade: Hierarquia de texto simulada */}
          <Text style={styles.titulo} accessibilityRole="header">{item.titulo}</Text>
          <Text style={styles.duracao}>{item.duracao}</Text>
        </View>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </Pressable>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Título da Aplicação (H1) */}
      <Text style={styles.h1} accessibilityRole="header">TechCast</Text>

      {/* Campo de Busca (Requisito da Tela 1) */}
      <View style={styles.buscaContainer}>
        <TextInput 
          style={styles.inputBusca}
          placeholder="Buscar episódios..."
          placeholderTextColor="#B3B3B3"
          accessibilityLabel="Campo de busca de episódios"
        />
      </View>

      <FlatList
        data={DADOS_EPISODIOS}
        renderItem={renderizarItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listaContent}
      />
    </SafeAreaView>
  );
}

// 2. DESIGN SYSTEM (Cores da sua documentação)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // Fundo Principal doc
    paddingTop: 40,
  },
  h1: {
    fontSize: 32, // H1 doc
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  buscaContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputBusca: {
    backgroundColor: '#1C1C1C',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3B82F6', // Cor de destaque doc
  },
  listaContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1C1C1C', // Card doc
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // Cor de destaque doc
  },
  cardPressionado: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }]
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  titulo: {
    color: '#FFFFFF', // Texto Principal doc
    fontSize: 16, // Usando o tamanho de texto padrão como base para card
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  duracao: {
    color: '#3B82F6', // Destacando a duração com a cor primária
    fontSize: 14,
    fontWeight: 'bold',
  },
  descricao: {
    color: '#E5E5E5', // Texto secundário doc
    fontSize: 14,
    lineHeight: 20,
  },
});