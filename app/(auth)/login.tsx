import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen() {
  const router = useRouter();

  // 1. ESTADOS (Memória do componente)
  // Guardam o que o usuário digita e as mensagens de erro
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  // 2. FUNÇÃO DE VALIDAÇÃO (Requisito da avaliação)
  const validarFormulario = () => {
    let valido = true;
    
    // Limpa os erros antes de testar novamente
    setErroEmail('');
    setErroSenha('');

    // Regra 1: O e-mail não pode ser vazio e precisa ter '@'
    if (!email.trim()) {
      setErroEmail('O e-mail é obrigatório.');
      valido = false;
    } else if (!email.includes('@')) {
      setErroEmail('Digite um e-mail válido com @.');
      valido = false;
    }

    // Regra 2: A senha não pode ser vazia e precisa ter min 6 caracteres
    if (!senha.trim()) {
      setErroSenha('A senha é obrigatória.');
      valido = false;
    } else if (senha.length < 6) {
      setErroSenha('A senha deve ter pelo menos 6 caracteres.');
      valido = false;
    }

    return valido; // Retorna true se tudo estiver certo, false se tiver erro
  };

  // 3. AÇÃO DO BOTÃO
  const lidarComLogin = async () => {
    if (validarFormulario()) {
      try {
        // Vai no cofre do celular e busca os dados salvos
        const emailSalvo = await SecureStore.getItemAsync('userEmail');
        const senhaSalva = await SecureStore.getItemAsync('userPassword');

        // Compara o que o usuário digitou com o que está no banco criptografado
        if (email.trim().toLowerCase() === emailSalvo && senha === senhaSalva) {
          Alert.alert('Sucesso', 'Acesso Autorizado!');
          router.replace('/(tabs)' as any); 
        } else {
          Alert.alert('Acesso Negado', 'E-mail ou senha incorretos. Tente novamente.');
        }
      } catch {
        Alert.alert('Erro', 'Falha ao acessar o cofre de senhas do sistema.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        
        {/* Cabeçalho */}
        <Text style={styles.h1} accessibilityRole="header">Entrar no TechCast</Text>
        <Text style={styles.textoSecundario}>Acesse seus episódios e continue aprendendo.</Text>

        {/* Input de E-mail */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, erroEmail ? styles.inputErro : null]} // Se tiver erro, muda a borda
            placeholder="Digite seu e-mail"
            placeholderTextColor="#B3B3B3"
            keyboardType="email-address"
            autoCapitalize="none" // Não coloca a primeira letra maiúscula
            value={email}
            onChangeText={setEmail} // Atualiza o estado quando o usuário digita
            accessibilityLabel="Campo para digitar o e-mail"
          />
          {/* Mostra a mensagem de erro se existir */}
          {erroEmail ? <Text style={styles.textoErro}>{erroEmail}</Text> : null}
        </View>

        {/* Input de Senha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, erroSenha ? styles.inputErro : null]}
            placeholder="Digite sua senha"
            placeholderTextColor="#B3B3B3"
            secureTextEntry // Transforma o texto em bolinhas
            value={senha}
            onChangeText={setSenha}
            accessibilityLabel="Campo para digitar a senha"
          />
          {erroSenha ? <Text style={styles.textoErro}>{erroSenha}</Text> : null}
        </View>

        {/* Botão Primário com Degradê (Biblioteca Externa) */}
        <TouchableOpacity onPress={lidarComLogin} accessibilityRole="button">
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']} // Do azul claro para o escuro
            style={styles.botaoPrimario}
          >
            <Text style={styles.textoBotaoPrimario}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Navegação para Cadastro */}
        <View style={styles.footer}>
          <Text style={styles.textoSecundario}>Ainda não tem conta? </Text>
          <Link href={"/cadastro" as any}asChild>
            <TouchableOpacity accessibilityRole="button">
              <Text style={styles.linkTexto}>Cadastre-se</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </View>
    </SafeAreaView>
  );
}

// 4. DESIGN SYSTEM (Aplicando sua documentação)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D', // Fundo principal
    justifyContent: 'center',
  },
  formContainer: {
    paddingHorizontal: 24,
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
    marginBottom: 20,
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
    borderColor: '#1C1C1C', // Borda invisível por padrão
  },
  inputErro: {
    borderColor: '#FF4C4C', // Borda vermelha se der erro
  },
  textoErro: {
    color: '#FF4C4C',
    fontSize: 14,
    marginTop: 4,
  },
  botaoPrimario: {
    backgroundColor: '#3B82F6', // Cor de destaque / Botão primário
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
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
    color: '#3B82F6', // Botão secundário (texto azul)
    fontSize: 16,
    fontWeight: 'bold',
  }
});