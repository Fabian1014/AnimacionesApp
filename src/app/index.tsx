
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ejercicios = [
  {
    titulo: 'Drag and Drop',
    descripcion: 'Arrastra objetos y observa cómo giran.',
    icono: '⭐',
    color: '#2563EB',
    ruta: '/ejercicios/drag-drop',
  },
  {
    titulo: 'Loading',
    descripcion: 'Explora diferentes animaciones de carga.',
    icono: '⏳',
    color: '#7C3AED',
    ruta: '/ejercicios/loading',
  },
  {
    titulo: 'Multitouch',
    descripcion: 'Mueve, amplía y gira objetos con tus dedos.',
    icono: '👆',
    color: '#0891B2',
    ruta: '/ejercicios/multitouch',
  },
  {
    titulo: 'Bounce',
    descripcion: 'Observa cómo rebotan diferentes objetos.',
    icono: '⚽',
    color: '#059669',
    ruta: '/ejercicios/bounce',
  },
  {
    titulo: 'Carousel',
    descripcion: 'Desliza tarjetas y descubre contenidos.',
    icono: '🎨',
    color: '#D97706',
    ruta: '/ejercicios/carousel',
  },
  {
    titulo: 'Acelerómetro',
    descripcion: 'Mueve una pelota inclinando tu dispositivo.',
    icono: '📱',
    color: '#DB2777',
    ruta: '/ejercicios/accelerometer',
  },
  {
    titulo: 'Drawer Navigation',
    descripcion: 'Explora un menú lateral animado.',
    icono: '☰',
    color: '#4F46E5',
    ruta: '/ejercicios/drawer',
  },
  {
    titulo: 'Flip Card',
    descripcion: 'Gira tarjetas y descubre su contenido.',
    icono: '🃏',
    color: '#9333EA',
    ruta: '/ejercicios/flip-card',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.topLabel}>
          <View style={styles.statusDot} />
          <Text style={styles.headerLabel}>
            INTERACTIVE EXPERIENCE
          </Text>
        </View>

        <Text style={styles.title}>AnimacionesApp</Text>

        <Text style={styles.subtitle}>
          Aprende, experimenta y descubre el mundo de las animaciones.
        </Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressContent}>
            <Text style={styles.progressCaption}>
              TU ESPACIO DE APRENDIZAJE
            </Text>

            <Text style={styles.progressTitle}>
              Explora. Experimenta. Crea.
            </Text>

            <Text style={styles.progressLabel}>
              Ocho experiencias interactivas disponibles.
            </Text>
          </View>

          <View style={styles.progressIconContainer}>
            <Text style={styles.progressIcon}>🚀</Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Explora las experiencias
          </Text>

          <Text style={styles.sectionSubtitle}>
            Selecciona una actividad para comenzar.
          </Text>
        </View>

        <View style={styles.sectionIcon}>
          <Text style={styles.sectionIconText}>✦</Text>
        </View>
      </View>

      <View style={styles.exerciseList}>
        {ejercicios.map((ejercicio) => (
          <Pressable
            key={ejercicio.ruta}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push(ejercicio.ruta as any)}
          >
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: `${ejercicio.color}20`,
                  borderColor: `${ejercicio.color}70`,
                },
              ]}
            >
              <Text style={styles.cardIcon}>
                {ejercicio.icono}
              </Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {ejercicio.titulo}
              </Text>

              <Text style={styles.cardDescription}>
                {ejercicio.descripcion}
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>›</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerLine} />

        <Text style={styles.footerText}>
          ANIMACIONESAPP · APRENDE CREANDO
        </Text>

        <View style={styles.footerLine} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263B5B',
  },
  content: {
    paddingBottom: 35,
  },
  header: {
    backgroundColor: '#344F73',
    paddingTop: 75,
    paddingHorizontal: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 1,
    borderColor: '#54749B',
  },
  topLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#38BDF8',
    marginRight: 9,
  },
  headerLabel: {
    color: '#C5E2FF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 15,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  subtitle: {
    color: '#E0EAF6',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 10,
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#243E61',
    borderWidth: 1,
    borderColor: '#54749B',
    borderRadius: 18,
    padding: 17,
    marginTop: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContent: {
    flex: 1,
    paddingRight: 8,
  },
  progressCaption: {
    color: '#A9D0FF',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 9,
  },
  progressLabel: {
    color: '#D2E1F3',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },
  progressIconContainer: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: '#365C89',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressIcon: {
    fontSize: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 30,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: '#D0DDF0',
    fontSize: 11,
    marginTop: 5,
  },
  sectionIcon: {
    backgroundColor: '#365477',
    borderWidth: 1,
    borderColor: '#6B91BC',
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconText: {
    color: '#B9DCFF',
    fontSize: 22,
  },
  exerciseList: {
    paddingHorizontal: 20,
    gap: 13,
  },
  card: {
    backgroundColor: '#1D3453',
    borderWidth: 1,
    borderColor: '#45658C',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
    backgroundColor: '#2B4B70',
  },
  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIcon: {
  fontSize: 25,
  color: '#FFFFFF',
},
  cardContent: {
    flex: 1,
    marginLeft: 14,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardDescription: {
    color: '#D0DCEC',
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#365477',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  arrow: {
    color: '#B9DCFF',
    fontSize: 25,
    lineHeight: 28,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 25,
    gap: 10,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#54749B',
  },
  footerText: {
    color: '#D0DCEC',
    fontSize: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
