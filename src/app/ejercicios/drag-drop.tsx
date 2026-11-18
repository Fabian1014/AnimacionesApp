
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export default function DragDropScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startRotation = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
      startRotation.value = rotation.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
      rotation.value = startRotation.value + event.translationX * 0.8;
    })
    .onEnd(() => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const reiniciar = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotation.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.etiqueta}>
          <View style={styles.punto} />
          <Text style={styles.etiquetaTexto}>ANIMACIONES INTERACTIVAS</Text>
        </View>

        <Text style={styles.numero}>EJERCICIO 01 / 08</Text>

        <Text style={styles.title}>Drag and Drop</Text>

        <Text style={styles.subtitle}>
          Arrastra el objeto con tu dedo y descubre cómo responde al movimiento.
        </Text>
      </View>

      <View style={styles.instruccion}>
        <Text style={styles.instruccionIcono}>👆</Text>
        <View style={styles.instruccionContenido}>
          <Text style={styles.instruccionTitulo}>¡Es tu turno!</Text>
          <Text style={styles.instruccionTexto}>
            Mantén presionada la estrella y muévela por el área.
          </Text>
        </View>
      </View>

      <View style={styles.area}>
        <View style={styles.areaEtiqueta}>
          <View style={styles.areaPunto} />
          <Text style={styles.areaTexto}>ÁREA DE MOVIMIENTO</Text>
        </View>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.objeto, animatedStyle]}>
            <Text style={styles.emoji}>⭐</Text>
            <Text style={styles.objetoTexto}>Muéveme</Text>
          </Animated.View>
        </GestureDetector>

        <Text style={styles.areaAyuda}>
          DESLIZA PARA MOVER
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPresionado,
        ]}
        onPress={reiniciar}
      >
        <Text style={styles.botonIcono}>↻</Text>
        <Text style={styles.botonTexto}>Reiniciar movimiento</Text>
      </Pressable>

      <Text style={styles.footer}>
        ANIMACIONESAPP · APRENDE CREANDO
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1224',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172B50',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  punto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
    marginRight: 8,
  },
  etiquetaTexto: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  numero: {
    color: '#7FA6DE',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#A9B9D4',
    lineHeight: 20,
    marginTop: 8,
  },
  instruccion: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#142440',
    borderWidth: 1,
    borderColor: '#263F67',
    borderRadius: 15,
    padding: 13,
    marginTop: 22,
  },
  instruccionIcono: {
    fontSize: 27,
    marginRight: 12,
  },
  instruccionContenido: {
    flex: 1,
  },
  instruccionTitulo: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  instruccionTexto: {
    color: '#B8C8E0',
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  area: {
    width: '100%',
    height: height * 0.43,
    marginTop: 20,
    backgroundColor: '#111E35',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#31558A',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  areaEtiqueta: {
    position: 'absolute',
    top: 17,
    left: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaPunto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    marginRight: 7,
  },
  areaTexto: {
    color: '#7897C4',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  objeto: {
    width: 115,
    height: 115,
    backgroundColor: '#2563EB',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#60A5FA',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  emoji: {
    fontSize: 35,
  },
  objetoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  areaAyuda: {
    position: 'absolute',
    bottom: 17,
    color: '#60799E',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  boton: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderWidth: 1,
    borderColor: '#60A5FA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonPresionado: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  botonIcono: {
    color: '#FFFFFF',
    fontSize: 23,
    marginRight: 9,
    fontWeight: 'bold',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    color: '#60718D',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 12,
  },
});
