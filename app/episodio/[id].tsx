import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';
// 1. Importamos o componente de Vídeo e o modo de redimensionamento
import { Video, ResizeMode } from 'expo-av';
import { useRef, useState } from 'react';

export default function EpisodioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // 2. Criamos uma referência para controlar o vídeo (play, pause, etc via código se precisar)
  const video = useRef(null);
  
  // 3. Estado para saber se está tocando ou não (opcional, mas útil)
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      
      {/* Título do Episódio */}
      <Text style={styles.titulo}>Episódio #{id}: Big Buck Bunny</Text>

      {/* 4. O COMPONENTE DE VÍDEO */}
      <Video
        ref={video}
        style={styles.video}
        // Fonte do vídeo: Usamos um link de teste famoso (Big Buck Bunny)
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls // Mostra os controles nativos (play, barra de tempo, volume)
        resizeMode={ResizeMode.CONTAIN} // Ajusta o vídeo para caber na tela sem cortar
        isLooping // Se acabar, começa de novo
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.controls}>
        <Text style={styles.descricao}>
          Neste episódio clássico, um coelho gigante lida com esquilos travessos.
          (Este é um vídeo de exemplo rodando direto da internet!)
        </Text>

        <Button 
          title="Voltar para a Lista" 
          onPress={() => router.back()} 
          color="#BB86FC"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fundo preto para destacar o vídeo
    justifyContent: 'center',
  },
  video: {
    alignSelf: 'center',
    width: '100%',
    height: 300, // Altura do player
    backgroundColor: '#121212',
  },
  titulo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  controls: {
    padding: 20,
  },
  descricao: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  }
});