
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function BounceScreen() {
  const ball1 = useSharedValue(0);
  const ball2 = useSharedValue(0);
  const ball3 = useSharedValue(0);

  useEffect(() => {
    const createBounce = (delay: number) => {
      return withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(-130, {
              duration: 500,
              easing: Easing.out(Easing.quad),
            }),
            withTiming(0, {
              duration: 500,
              easing: Easing.in(Easing.quad),
            })
          ),
          -1,
          false
        )
      );
    };

    ball1.value = createBounce(0);
    ball2.value = createBounce(200);
    ball3.value = createBounce(400);

    return () => {
      cancelAnimation(ball1);
      cancelAnimation(ball2);
      cancelAnimation(ball3);
    };
  }, []);

  const ball1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: ball1.value }],
  }));

  const ball2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: ball2.value }],
  }));

  const ball3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: ball3.value }],
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

        <Text style={styles.numero}>EJERCICIO 04 / 08</Text>

        <Text style={styles.title}>Bounce</Text>

        <Text style={styles.subtitle}>
          Observa el movimiento de tres pelotas con rebotes continuos y tiempos diferentes.
        </Text>
      </View>

      <View style={styles.area}>
        <View style={styles.areaHeader}>
          <View style={styles.estado}>
            <View style={styles.estadoPunto} />
            <Text style={styles.estadoTexto}>ANIMACIÓN EN CURSO</Text>
          </View>
          <Text style={styles.areaNumero}>01 — 03</Text>
        </View>

        <View style={styles.ballsContainer}>
          <View style={styles.ballColumn}>
            <Animated.View
              style={[styles.ball, styles.ballBlue, ball1Style]}
            />
            <Text style={styles.ballLabel}>01</Text>
          </View>

          <View style={styles.ballColumn}>
            <Animated.View
              style={[styles.ball, styles.ballPurple, ball2Style]}
            />
            <Text style={styles.ballLabel}>02</Text>
          </View>

          <View style={styles.ballColumn}>
            <Animated.View
              style={[styles.ball, styles.ballRed, ball3Style]}
            />
            <Text style={styles.ballLabel}>03</Text>
          </View>
        </View>

        <View style={styles.floor} />

        <Text style={styles.areaAyuda}>
          MOVIMIENTO VERTICAL · REPETICIÓN CONTINUA
        </Text>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>
          ¿Qué está sucediendo?
        </Text>

        <View style={styles.instructionRow}>
          <View style={[styles.colorIndicator, styles.indicatorBlue]} />
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Primera pelota</Text>
            <Text style={styles.instruction}>
              Inicia el rebote inmediatamente.
            </Text>
          </View>
        </View>

        <View style={styles.instructionRow}>
          <View style={[styles.colorIndicator, styles.indicatorPurple]} />
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Segunda pelota</Text>
            <Text style={styles.instruction}>
              Comienza con un retraso de 200 ms.
            </Text>
          </View>
        </View>

        <View style={styles.instructionRow}>
          <View style={[styles.colorIndicator, styles.indicatorRed]} />
          <View style={styles.instructionContent}>
            <Text style={styles.instructionName}>Tercera pelota</Text>
            <Text style={styles.instruction}>
              Comienza con un retraso de 400 ms.
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
    height: '38%',
    marginTop: 20,
    backgroundColor: '#111E35',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#31558A',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
    overflow: 'hidden',
  },
  areaHeader: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  estado: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estadoPunto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#34D399',
    marginRight: 7,
  },
  estadoTexto: {
    color: '#7FA6DE',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  areaNumero: {
    color: '#60799E',
    fontSize: 9,
    fontWeight: 'bold',
  },
  ballsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 180,
  },
  ballColumn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 175,
  },
  ball: {
    width: 48,
    height: 48,
    borderRadius: 24,
    elevation: 8,
  },
  ballBlue: {
    backgroundColor: '#3B82F6',
    borderWidth: 2,
    borderColor: '#93C5FD',
  },
  ballPurple: {
    backgroundColor: '#8B5CF6',
    borderWidth: 2,
    borderColor: '#C4B5FD',
  },
  ballRed: {
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FCA5A5',
  },
  ballLabel: {
    color: '#7897C4',
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 8,
  },
  floor: {
    width: '85%',
    height: 4,
    backgroundColor: '#31558A',
    borderRadius: 5,
  },
  areaAyuda: {
    color: '#60799E',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 12,
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
    marginVertical: 6,
  },
  colorIndicator: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  indicatorBlue: {
    backgroundColor: '#3B82F6',
  },
  indicatorPurple: {
    backgroundColor: '#8B5CF6',
  },
  indicatorRed: {
    backgroundColor: '#EF4444',
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
