import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tipagem da nossa Anotação
interface Anotacao {
  id: string;
  texto: string;
}

export default function AnotacoesScreen() {
  // --- ESTADOS DO CRUD ---
  // 1. O Array que guarda todas as anotações
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  // 2. O texto que está sendo digitado no input
  const [textoInput, setTextoInput] = useState('');
  // 3. Estado para saber se estamos criando ou editando (guarda o ID de quem está sendo editado)
  const [idEditando, setIdEditando] = useState<string | null>(null);

  // --- FUNÇÕES DO CRUD ---

  // CREATE (Criar) e UPDATE (Atualizar)
  const salvarAnotacao = () => {
    if (textoInput.trim() === '') {
      Alert.alert('Erro', 'A anotação não pode estar vazia.');
      return;
    }

    if (idEditando) {
      // UPDATE: Se tem um ID editando, a gente atualiza a lista
      setAnotacoes(anotacoes.map(item => 
        item.id === idEditando ? { ...item, texto: textoInput } : item
      ));
      setIdEditando(null); // Sai do modo de edição
    } else {
      // CREATE: Se não tem ID, a gente cria uma nova
      const novaAnotacao: Anotacao = {
        id: Date.now().toString(), // Gera um ID único baseado na data
        texto: textoInput,
      };
      // Coloca a nova anotação no topo da lista
      setAnotacoes([novaAnotacao, ...anotacoes]);
    }

    setTextoInput(''); // Limpa o campo de texto
  };

  // READ (Ler - Preparar para edição)
  const iniciarEdicao = (anotacao: Anotacao) => {
    setTextoInput(anotacao.texto);
    setIdEditando(anotacao.id);
  };

  // DELETE (Apagar)
  const deletarAnotacao = (id: string) => {
    Alert.alert(
      'Apagar Anotação',
      'Tem certeza que deseja excluir esta anotação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Apagar', 
          style: 'destructive', 
          onPress: () => {
            // Filtra a lista, removendo o item com o ID passado
            setAnotacoes(anotacoes.filter(item => item.id !== id));
            // Se o usuário apagar a anotação que ele estava editando, limpa o input
            if (idEditando === id) {
              setTextoInput('');
              setIdEditando(null);
            }
          } 
        }
      ]
    );
  };

  // --- RENDERIZAÇÃO DA TELA ---
  const renderItem = ({ item }: { item: Anotacao }) => (
    <View style={styles.cardAnotacao}>
      <Text style={styles.textoAnotacao}>{item.texto}</Text>
      
      {/* Botões de Ação */}
      <View style={styles.acoesContainer}>
        <TouchableOpacity 
          style={styles.botaoAcao} 
          onPress={() => iniciarEdicao(item)}
          accessibilityLabel="Editar anotação"
        >
          <Ionicons name="pencil" size={20} color="#3B82F6" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoAcao} 
          onPress={() => deletarAnotacao(item.id)}
          accessibilityLabel="Deletar anotação"
        >
          <Ionicons name="trash" size={20} color="#FF4C4C" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1} accessibilityRole="header">Minhas Anotações</Text>
      
      {/* Área de Input (Formulário) */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que você aprendeu hoje?"
          placeholderTextColor="#B3B3B3"
          value={textoInput}
          onChangeText={setTextoInput}
          multiline // Permite texto longo (várias linhas)
        />
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAnotacao}>
          <Text style={styles.textoBotaoSalvar}>
            {idEditando ? 'Atualizar' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* READ: A Lista que exibe os dados */}
      {anotacoes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma anotação ainda.</Text>
        </View>
      ) : (
        <FlatList
          data={anotacoes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lista}
        />
      )}
    </SafeAreaView>
  );
}

// --- DESIGN SYSTEM DO TECHCAST ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    padding: 16,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3B82F6',
    minHeight: 80,
    textAlignVertical: 'top', // Para o texto começar em cima no Android
  },
  botaoSalvar: {
    backgroundColor: '#3B82F6',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 20,
  },
  cardAnotacao: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textoAnotacao: {
    color: '#E5E5E5',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  acoesContainer: {
    flexDirection: 'row',
  },
  botaoAcao: {
    padding: 8,
    marginLeft: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#B3B3B3',
    fontSize: 16,
  }
});