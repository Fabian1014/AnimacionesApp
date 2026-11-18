
import { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const cardWidth = Dimensions.get('window').width - 40;

const tarjetas = [
  {
    numero: '01',
    titulo: 'El Samurai',
    descripcion: 'Honor, disciplina y dominio de la espada.',
    imagen: require('../../../assets/img aplicacion/1.jpg'),
  },
  {
    numero: '02',
    titulo: 'El Ninja',
    descripcion: 'Sigilo, agilidad y precisión en cada movimiento.',
    imagen: require('../../../assets/img aplicacion/2.jpg'),
  },
  {
    numero: '03',
    titulo: 'El Ronin',
    descripcion: 'Un guerrero sin maestro que sigue su propio camino.',
    imagen: require('../../../assets/img aplicacion/3.jpg'),
  },
  {
    numero: '04',
    titulo: 'La Asesina',
    descripcion: 'Velocidad, estrategia y elegancia en combate.',
    imagen: require('../../../assets/img aplicacion/4.jpg'),
  },
  {
    numero: '05',
    titulo: 'El Guerrero',
    descripcion: 'Fuerza y valentía frente a cualquier desafío.',
    imagen: require('../../../assets/img aplicacion/5.jpg'),
  },
];

export default function CarouselScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const cambiarTarjeta = (indice: number) => {
    if (indice < 0 || indice >= tarjetas.length) return;

    scrollRef.current?.scrollTo({
      x: indice * cardWidth,
      animated: true,
    });

    setIndiceActual(indice);
  };

  const detectarTarjeta = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const posicion = event.nativeEvent.contentOffset.x;
    const nuevoIndice = Math.round(posicion / cardWidth);
    setIndiceActual(nuevoIndice);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>EXPERIENCIA INTERACTIVA</Text>

      <Text style={styles.title}>Guerreros de Japón</Text>

      <Text style={styles.subtitle}>
        Desliza y descubre personajes de un mundo de honor y combate.
      </Text>

      <View style={styles.carouselContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={detectarTarjeta}
        >
          {tarjetas.map((tarjeta) => (
            <View
              key={tarjeta.numero}
              style={[styles.card, { width: cardWidth }]}
            >
              <Image
                source={tarjeta.imagen}
                style={styles.image}
                resizeMode="cover"
              />

              <View style={styles.overlay}>

                <Text style={styles.cardTitle}>
                  {tarjeta.titulo}
                </Text>

                <Text style={styles.description}>
                  {tarjeta.descripcion}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.indicators}>
        {tarjetas.map((tarjeta, index) => (
          <Pressable
            key={tarjeta.numero}
            onPress={() => cambiarTarjeta(index)}
            style={[
              styles.dot,
              indiceActual === index && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <View style={styles.navigation}>
        <Pressable
          style={[
            styles.button,
            indiceActual === 0 && styles.disabledButton,
          ]}
          disabled={indiceActual === 0}
          onPress={() => cambiarTarjeta(indiceActual - 1)}
        >
          <Text style={styles.buttonText}>Anterior</Text>
        </Pressable>

        <Text style={styles.counter}>
          {indiceActual + 1} / {tarjetas.length}
        </Text>

        <Pressable
          style={[
            styles.button,
            indiceActual === tarjetas.length - 1 &&
              styles.disabledButton,
          ]}
          disabled={indiceActual === tarjetas.length - 1}
          onPress={() => cambiarTarjeta(indiceActual + 1)}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </Pressable>
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
    backgroundColor: '#263B5B',
    alignItems: 'center',
    paddingTop: 65,
    paddingHorizontal: 20,
  },
  label: {
    color: '#B9DCFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#D0DCEC',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },
  carouselContainer: {
    width: '100%',
    height: 390,
    marginTop: 30,
  },
  card: {
    height: 370,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#172B4D',
    borderWidth: 1,
    borderColor: '#54749B',
    elevation: 7,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 24,
    backgroundColor: 'rgba(5, 15, 35, 0.48)',
  },
  numero: {
    color: '#B9DCFF',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 29,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    color: '#F1F5F9',
    fontSize: 14,
    textAlign: 'left',
    marginTop: 9,
    lineHeight: 21,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: '#8298B5',
  },
  activeDot: {
    width: 25,
    backgroundColor: '#60A5FA',
  },
  navigation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: '#3B82F6',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#526984',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  counter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    color: '#D0DCEC',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 28,
  },
});
