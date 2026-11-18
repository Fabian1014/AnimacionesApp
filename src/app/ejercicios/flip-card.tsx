
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export default function FlipCardScreen() {
  const rotacion = useSharedValue(0);

  const girarTarjeta = () => {
    rotacion.value = withTiming(
      rotacion.value === 0 ? 180 : 0,
      { duration: 600 }
    );
  };

  const frenteStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(
          rotacion.value,
          [0, 180],
          [0, 180]
        )}deg`,
      },
    ],
  }));

  const reversoStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      {
        rotateY: `${interpolate(
          rotacion.value,
          [0, 180],
          [180, 360]
        )}deg`,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flip Card</Text>

      <Text style={styles.subtitle}>
        Pulsa la tarjeta para descubrir su reverso.
      </Text>

      <View style={styles.cardContainer}>
        <Pressable
          style={styles.cardTouchable}
          onPress={girarTarjeta}
        >
          <Animated.View
            style={[styles.card, styles.front, frenteStyle]}
          >
            <Text style={styles.emoji}>🎨</Text>
            <Text style={styles.cardTitle}>¡Hola!</Text>
            <Text style={styles.cardText}>
              Esta es la parte frontal.
            </Text>
            <Text style={styles.hint}>Toca para girar ↻</Text>
          </Animated.View>

          <Animated.View
            style={[styles.card, styles.back, reversoStyle]}
          >
            <Text style={styles.emoji}>🚀</Text>
            <Text style={styles.cardTitle}>¡Lo lograste!</Text>
            <Text style={styles.cardText}>
              Acabas de descubrir la otra cara de la tarjeta.
            </Text>
            <Text style={styles.hint}>Toca para regresar ↻</Text>
          </Animated.View>
        </Pressable>
      </View>

      <Pressable
        style={styles.backButton}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.backButtonText}>
          ← Volver al menú de ejercicios
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    paddingTop: 75,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
  },
  cardContainer: {
    width: '100%',
    height: 300,
    marginTop: 65,
  },
  cardTouchable: {
    width: '100%',
    height: 280,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 280,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    backfaceVisibility: 'hidden',
    elevation: 8,
  },
  front: {
    backgroundColor: '#2563EB',
  },
  back: {
    backgroundColor: '#7C3AED',
  },
  emoji: {
    fontSize: 65,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  hint: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 25,
    opacity: 0.8,
  },
  backButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 30,
  },
  backButtonText: {
    color: '#1E293B',
    fontWeight: 'bold',
  },
});
