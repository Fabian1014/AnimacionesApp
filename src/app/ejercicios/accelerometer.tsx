
import { Accelerometer } from 'expo-sensors';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export default function AccelerometerScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    Accelerometer.setUpdateInterval(50);

    const subscription = Accelerometer.addListener(({ x, y }) => {
      translateX.value = withSpring(-x * 100);
      translateY.value = withSpring(y * 100);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const ballStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acelerómetro</Text>

      <Text style={styles.subtitle}>
        Inclina tu celular para mover la pelota.
      </Text>

      <View style={styles.area}>
        <Animated.View style={[styles.ball, ballStyle]}>
          <Text style={styles.ballText}>●</Text>
        </Animated.View>
      </View>

      <Text style={styles.instruction}>
        Mueve tu dispositivo suavemente hacia los lados y arriba o abajo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    paddingTop: 65,
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
  area: {
    width: 280,
    height: 280,
    marginTop: 50,
    borderRadius: 25,
    backgroundColor: '#DBEAFE',
    borderWidth: 2,
    borderColor: '#93C5FD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  ballText: {
    color: '#FFFFFF',
    fontSize: 25,
  },
  instruction: {
    color: '#475569',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 22,
  },
});
