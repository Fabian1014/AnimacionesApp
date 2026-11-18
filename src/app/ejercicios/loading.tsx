
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function LoadingScreen() {
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);
  const progress = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    pulse.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1,
      false
    );

    progress.value = withRepeat(
      withTiming(100, { duration: 2000 }),
      -1,
      false
    );

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(pulse);
      cancelAnimation(progress);
    };
  }, []);

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.etiqueta}>
          <View style={styles.punto} />
          <Text style={styles.etiquetaTexto}>
            ANIMACIONES INTERACTIVAS
          </Text>
        </View>

        <Text style={styles.numero}>EJERCICIO 02 / 08</Text>

        <Text style={styles.title}>Loading</Text>

        <Text style={styles.subtitle}>
          Descubre diferentes formas de representar procesos de carga.
        </Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.introIcono}>⚡</Text>
        <View style={styles.introContenido}>
          <Text style={styles.introTitulo}>Animaciones en acción</Text>
          <Text style={styles.introTexto}>
            Observa cómo cada indicador representa una actividad en progreso.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBadge}>
            <Text style={styles.cardIcon}>⟳</Text>
          </View>
          <View style={styles.cardHeading}>
            <Text style={styles.label}>Carga giratoria</Text>
            <Text style={styles.cardCaption}>INDICADOR CIRCULAR</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>ACTIVO</Text>
          </View>
        </View>

        <View style={styles.animationArea}>
          <Animated.View style={[styles.spinner, spinnerStyle]} />
        </View>

        <Text style={styles.description}>Procesando...</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBadge}>
            <Text style={styles.cardIcon}>◉</Text>
          </View>
          <View style={styles.cardHeading}>
            <Text style={styles.label}>Animación de pulso</Text>
            <Text style={styles.cardCaption}>ESCALADO CONTINUO</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>ACTIVO</Text>
          </View>
        </View>

        <View style={styles.animationArea}>
          <Animated.View style={[styles.pulse, pulseStyle]} />
        </View>

        <Text style={styles.description}>Cargando información...</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconBadge}>
            <Text style={styles.cardIcon}>▰</Text>
          </View>
          <View style={styles.cardHeading}>
            <Text style={styles.label}>Barra de progreso</Text>
            <Text style={styles.cardCaption}>PROGRESO DINÁMICO</Text>
          </View>
          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>ACTIVO</Text>
          </View>
        </View>

        <View style={styles.progressArea}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[styles.progressFill, progressStyle]}
            />
          </View>
        </View>

        <Text style={styles.description}>Descargando datos...</Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
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
    marginTop: 18,
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
  intro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#142440',
    borderWidth: 1,
    borderColor: '#263F67',
    borderRadius: 15,
    padding: 13,
    marginTop: 20,
    marginBottom: 17,
  },
  introIcono: {
    fontSize: 27,
    marginRight: 12,
  },
  introContenido: {
    flex: 1,
  },
  introTitulo: {
    color: '#60A5FA',
    fontSize: 13,
    fontWeight: 'bold',
  },
  introTexto: {
    color: '#B8C8E0',
    fontSize: 11,
    marginTop: 3,
    lineHeight: 16,
  },
  card: {
    backgroundColor: '#141F36',
    borderWidth: 1,
    borderColor: '#263F67',
    borderRadius: 17,
    padding: 14,
    marginBottom: 13,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: '#1E355B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
    color: '#60A5FA',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardHeading: {
    flex: 1,
    marginLeft: 11,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F1F5F9',
  },
  cardCaption: {
    color: '#7FA6DE',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 4,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#123A3A',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#34D399',
    marginRight: 5,
  },
  activeText: {
    color: '#6EE7B7',
    fontSize: 8,
    fontWeight: 'bold',
  },
  animationArea: {
    height: 62,
    backgroundColor: '#101B30',
    borderRadius: 12,
    marginTop: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 39,
    height: 39,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#294B80',
    borderTopColor: '#38BDF8',
  },
  pulse: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    borderWidth: 3,
    borderColor: '#60A5FA',
  },
  progressArea: {
    height: 62,
    backgroundColor: '#101B30',
    borderRadius: 12,
    marginTop: 13,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 11,
    backgroundColor: '#263B5D',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#38BDF8',
    borderRadius: 10,
  },
  description: {
    color: '#91A8C9',
    fontSize: 11,
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    color: '#60718D',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 12,
  },
});
