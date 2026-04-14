import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Anotacao {
  id: string;
  texto: string;
}

export default function AnotacoesScreen() {
  // --- ESTADOS DO COMPONENTE ---
  const [anotacoes, setAnotacoes] = useState<Anotacao[]>([]);
  const [textoInput, setTextoInput] = useState('');
  const [idEditando, setIdEditando] = useState<string | null>(null);

  // --- BANCO DE DADOS LOCAL (AsyncStorage) ---
  
  // Roda uma única vez quando a tela abre para carregar as notas salvas
  useEffect(() => {
    const carregarAnotacoes = async () => {
      try {
        const notasSalvas = await AsyncStorage.getItem('@techcast_notas');
        if (notasSalvas) {
          setAnotacoes(JSON.parse(notasSalvas)); // Transforma o texto de volta em Array
        }
      } catch (error) {
        console.error('Erro ao carregar as notas do celular', error);
      }
    };
    carregarAnotacoes();
  }, []);

  // Função auxiliar: Atualiza a tela E salva no banco ao mesmo tempo
  const atualizarBancoDeDados = async (novasAnotacoes: Anotacao[]) => {
    setAnotacoes(novasAnotacoes); // Atualiza o visual
    try {
      // Transforma o Array em texto (String) para salvar no celular
      await AsyncStorage.setItem('@techcast_notas', JSON.stringify(novasAnotacoes)); 
    } catch (error) {
      console.error('Erro ao salvar as notas no celular', error);
    }
  };

  // --- FUNÇÕES DO CRUD ---

  // CREATE e UPDATE (Criar ou Atualizar)
  const salvarAnotacao = () => {
    if (textoInput.trim() === '') {
      Alert.alert('Erro', 'A anotação não pode estar vazia.');
      return;
    }

    let novaLista: Anotacao[];

    if (idEditando) {
      // UPDATE: Atualiza o texto da anotação que tem o mesmo ID
      novaLista = anotacoes.map(item => 
        item.id === idEditando ? { ...item, texto: textoInput } : item
      );
      setIdEditando(null); // Sai do modo de edição
    } else {
      // CREATE: Cria uma anotação nova e coloca no topo
      const novaAnotacao: Anotacao = {
        id: Date.now().toString(), // ID único baseado no tempo
        texto: textoInput,
      };
      novaLista = [novaAnotacao, ...anotacoes];
    }

    atualizarBancoDeDados(novaLista); // Salva a lista nova no celular
    setTextoInput(''); // Limpa a caixa de texto
  };

  // READ (Preparar para edição)
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
            // Filtra a lista removendo o ID selecionado
            const novaLista = anotacoes.filter(item => item.id !== id);
            atualizarBancoDeDados(novaLista); // Salva a lista nova no celular
            
            // Se apagou a nota que estava editando, limpa o input
            if (idEditando === id) {
              setTextoInput('');
              setIdEditando(null);
            }
          } 
        }
      ]
    );
  };

  // --- RENDERIZAÇÃO DA LISTA ---
  const renderItem = ({ item }: { item: Anotacao }) => (
    <View style={styles.cardAnotacao}>
      <Text style={styles.textoAnotacao}>{item.texto}</Text>
      
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
      
      {/* Formulário de Criação/Edição */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que você aprendeu hoje?"
          placeholderTextColor="#B3B3B3"
          value={textoInput}
          onChangeText={setTextoInput}
          multiline
        />
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAnotacao}>
          <Text style={styles.textoBotaoSalvar}>
            {idEditando ? 'Atualizar' : 'Salvar'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Exibição da Lista */}
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
    textAlignVertical: 'top',
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