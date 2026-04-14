import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);

  // Carrega a foto salva quando a tela abre
  useEffect(() => {
    const carregarFoto = async () => {
      const fotoSalva = await AsyncStorage.getItem('@techcast_avatar');
      if (fotoSalva) setFotoPerfil(fotoSalva);
    };
    carregarFoto();
  }, []);

  // Recurso Nativo: Abrir a Galeria do celular
  const escolherFoto = async () => {
    // Pede permissão ao usuário (obrigatório no iOS e Android)
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissao.granted === false) {
      Alert.alert('Permissão negada', 'Precisamos de acesso à sua galeria para mudar a foto.');
      return;
    }

    // Abre a galeria
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Só imagens
      allowsEditing: true, // Permite cortar a foto
      aspect: [1, 1], // Quadrado
      quality: 0.5, // Reduz o tamanho do arquivo
    });

    if (!resultado.canceled) {
      const uriDaFoto = resultado.assets[0].uri;
      setFotoPerfil(uriDaFoto);
      await AsyncStorage.setItem('@techcast_avatar', uriDaFoto); // Salva no banco local
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>Meu Perfil</Text>
      
      <View style={styles.avatarContainer}>
        {fotoPerfil ? (
          <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#B3B3B3" />
          </View>
        )}
        
        <TouchableOpacity style={styles.botaoAlterarFoto} onPress={escolherFoto}>
          <Ionicons name="camera" size={20} color="#FFFFFF" />
          <Text style={styles.textoBotaoFoto}>Alterar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.valor}>Estudante Tech</Text>

        <Text style={styles.label}>E-mail</Text>
        <Text style={styles.valor}>aluno@techcast.com</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  h1: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 30, marginTop: 10 },
  avatarContainer: { alignItems: 'center', marginBottom: 40 },
  avatar: { width: 150, height: 150, borderRadius: 75, borderWidth: 3, borderColor: '#3B82F6' },
  avatarPlaceholder: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#1C1C1C', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#3B82F6' },
  botaoAlterarFoto: { flexDirection: 'row', backgroundColor: '#3B82F6', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, marginTop: -20, alignItems: 'center', gap: 5 },
  textoBotaoFoto: { color: '#FFFFFF', fontWeight: 'bold' },
  infoContainer: { backgroundColor: '#1C1C1C', padding: 20, borderRadius: 12 },
  label: { color: '#B3B3B3', fontSize: 14, marginBottom: 5 },
  valor: { color: '#FFFFFF', fontSize: 18, marginBottom: 20, fontWeight: 'bold' }
});