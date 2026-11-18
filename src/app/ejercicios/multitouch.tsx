
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function MultitouchScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);
  const startRotation = useSharedValue(0);

  // Mover el objeto con un dedo
  const pan = Gesture.Pan()
    .maxPointers(1)
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    });

  // Ampliar o reducir con dos dedos
  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = Math.max(
        0.5,
        Math.min(startScale.value * event.scale, 2.5)
      );
    });

  // Girar con dos dedos
  const rotate = Gesture.Rotation()
    .onStart(() => {
      startRotation.value = rotation.value;
    })
    .onUpdate((event) => {
      rotation.value = startRotation.value + event.rotation;
    });

  // Permitir los tres gestos simultáneamente
  const multitouch = Gesture.Simultaneous(
    pan,
    pinch,
    rotate
  );

  // Estilos animados
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  // Restablecer el objeto a su estado original
  const reiniciar = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotation.value = withSpring(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.etiqueta}>
          <View style={styles.punto} />
          <Text style={styles.etiquetaTexto}>
            ANIMACIONES INTERACTIVAS
          </Text>
        </View>

        <Text style={styles.numero}>EJERCICIO 03 / 08</Text>

        <Text style={styles.title}>Multitouch</Text>

        <Text style={styles.subtitle}>
          Experimenta con el movimiento, el zoom y la rotación usando tus dedos.
        </Text>
      </View>

      <View style={styles.area}>
        <View style={styles.areaEtiqueta}>
          <View style={styles.areaPunto} />
          <Text style={styles.areaTexto}>ZONA DE INTERACCIÓN</Text>
        </View>

        <GestureDetector gesture={multitouch}>
          <Animated.View style={[styles.objeto, animatedStyle]}>
            <Text style={styles.emoji}>🌟</Text>
            <Text style={styles.objetoTexto}>Tócame</Text>
          </Animated.View>
        </GestureDetector>

        <Text style={styles.areaAyuda}>
          INTERACTÚA CON UNO O DOS DEDOS
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
        <Text style={styles.botonTexto}>Restablecer objeto</Text>
      </Pressable>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>
          ¿Cómo funciona?
        </Text>

        <View style={styles.instructionRow}>
          <View style={styles.instructionIcon}>
            <Text style={styles.instructionEmoji}>☝️</Text>
          </View>
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Movimiento</Text>
            <Text style={styles.instruction}>
              Un dedo: desplaza el objeto.
            </Text>
          </View>
        </View>

        <View style={styles.instructionRow}>
          <View style={styles.instructionIcon}>
            <Text style={styles.instructionEmoji}>✌️</Text>
          </View>
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Zoom</Text>
            <Text style={styles.instruction}>
              Dos dedos: amplía o reduce el objeto.
            </Text>
          </View>
        </View>

        <View style={styles.instructionRow}>
          <View style={styles.instructionIcon}>
            <Text style={styles.instructionEmoji}>🔄</Text>
          </View>
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Rotación</Text>
            <Text style={styles.instruction}>
              Dos dedos: gira el objeto.
            </Text>
          </View>
        </View>
      </View>

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
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  header: {
    width: '100%',
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
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
    marginTop: 15,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#A9B9D4',
    lineHeight: 18,
    marginTop: 7,
  },
  area: {
    width: '100%',
    height: '36%',
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
    top: 15,
    left: 15,
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
    width: 120,
    height: 120,
    backgroundColor: '#4F46E5',
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#818CF8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  emoji: {
    fontSize: 38,
  },
  objetoTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  areaAyuda: {
    position: 'absolute',
    bottom: 15,
    color: '#60799E',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  boton: {
    width: '100%',
    backgroundColor: '#2563EB',
    borderWidth: 1,
    borderColor: '#60A5FA',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 15,
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
    fontSize: 22,
    marginRight: 9,
    fontWeight: 'bold',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructions: {
    width: '100%',
    backgroundColor: '#141F36',
    borderWidth: 1,
    borderColor: '#263F67',
    borderRadius: 17,
    padding: 15,
    marginTop: 16,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 10,
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  instructionIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: '#1E355B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionEmoji: {
    fontSize: 17,
  },
  instructionContent: {
    flex: 1,
    marginLeft: 11,
  },
  instructionName: {
    color: '#60A5FA',
    fontSize: 11,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 10,
    color: '#A5B4CC',
    marginTop: 2,
  },
  footer: {
    color: '#60718D',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 12,
    marginBottom: 8,
  },
});
