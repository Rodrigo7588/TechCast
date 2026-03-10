import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';

export default function CadastroScreen() {
  const router = useRouter();

  // 1. ESTADOS DO FORMULÁRIO
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  // Estados de erro
  const [erro, setErro] = useState('');

  // 2. VALIDAÇÃO MAIS COMPLEXA (Garante os 2 Pontos de Validação)
  const validarCadastro = () => {
    setErro(''); // Limpa erros anteriores

    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      setErro('Todos os campos são obrigatórios.');
      return false;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErro('Digite um e-mail válido.');
      return false;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return false;
    }

    return true;
  };

  // 3. AÇÃO DO BOTÃO
  const lidarComCadastro = () => {
    if (validarCadastro()) {
      Alert.alert('Sucesso', 'Conta criada com sucesso! Faça seu login.');
      // Volta para a tela de login após cadastrar
      router.replace('/login' as any); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView é importante aqui pois formulários de cadastro podem ficar grandes e precisar rolar a tela */}
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        
        <Text style={styles.h1} accessibilityRole="header">Criar Conta</Text>
        <Text style={styles.textoSecundario}>Junte-se ao TechCast e acelere sua carreira.</Text>

        {/* Mostra mensagem de erro geral se houver */}
        {erro ? <Text style={styles.textoErroGeral}>{erro}</Text> : null}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#B3B3B3"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor="#B3B3B3"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Crie uma senha forte"
            placeholderTextColor="#B3B3B3"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita sua senha"
            placeholderTextColor="#B3B3B3"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={styles.botaoPrimario} onPress={lidarComCadastro}>
          <Text style={styles.textoBotaoPrimario}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.textoSecundario}>Já tem uma conta? </Text>
          <Link href={"/login" as any } asChild>
            <TouchableOpacity>
              <Text style={styles.linkTexto}>Faça Login</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// 4. ESTILOS (Design System TechCast)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  textoSecundario: {
    fontSize: 16,
    color: '#E5E5E5',
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1C1C1C',
  },
  textoErroGeral: {
    color: '#FF4C4C',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  botaoPrimario: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  textoBotaoPrimario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  linkTexto: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: 'bold',
  }
});