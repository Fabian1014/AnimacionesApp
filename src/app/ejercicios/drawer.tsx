
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const opciones = [
  { nombre: 'Inicio', icono: '🏠' },
  { nombre: 'Perfil', icono: '👤' },
  { nombre: 'Favoritos', icono: '⭐' },
  { nombre: 'Configuración', icono: '⚙️' },
];

export default function DrawerScreen() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccion, setSeccion] = useState('Inicio');

  const desplazamiento = useSharedValue(-270);
  const opacidad = useSharedValue(0);

  const abrirMenu = () => {
    setMenuAbierto(true);
    desplazamiento.value = withTiming(0, { duration: 300 });
    opacidad.value = withTiming(0.45, { duration: 300 });
  };

  const cerrarMenu = () => {
    desplazamiento.value = withTiming(-270, { duration: 300 });
    opacidad.value = withTiming(0, { duration: 300 });
    setMenuAbierto(false);
  };

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: desplazamiento.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacidad.value,
  }));

  const seleccionarSeccion = (nombre: string) => {
    setSeccion(nombre);
    cerrarMenu();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.menuButton} onPress={abrirMenu}>
          <Text style={styles.menuIcon}>☰</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Mi aplicación</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>📱</Text>

        <Text style={styles.title}>{seccion}</Text>

        <Text style={styles.description}>
          Seleccionaste la sección {seccion}.
        </Text>

        <Pressable style={styles.openButton} onPress={abrirMenu}>
          <Text style={styles.openButtonText}>
            Abrir menú lateral
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace('/')}
        >
          <Text style={styles.backButtonText}>
            ← Volver al menú de ejercicios
          </Text>
        </Pressable>
      </View>

      {menuAbierto && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={cerrarMenu}
          />
        </Animated.View>
      )}

      <Animated.View style={[styles.drawer, drawerStyle]}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerEmoji}>👋</Text>
          <Text style={styles.drawerTitle}>Mi menú</Text>
          <Text style={styles.drawerSubtitle}>
            Navegación lateral
          </Text>
        </View>

        {opciones.map((opcion) => (
          <Pressable
            key={opcion.nombre}
            style={[
              styles.option,
              seccion === opcion.nombre && styles.activeOption,
            ]}
            onPress={() => seleccionarSeccion(opcion.nombre)}
          >
            <Text style={styles.optionIcon}>{opcion.icono}</Text>

            <Text
              style={[
                styles.optionText,
                seccion === opcion.nombre && styles.activeOptionText,
              ]}
            >
              {opcion.nombre}
            </Text>
          </Pressable>
        ))}

        <Pressable style={styles.closeButton} onPress={cerrarMenu}>
          <Text style={styles.closeButtonText}>Cerrar menú ✕</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    height: 100,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 28,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  emoji: {
    fontSize: 65,
    marginBottom: 20,
  },
  title: {
    color: '#1E293B',
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    color: '#64748B',
    fontSize: 15,
    marginTop: 12,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 30,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 15,
  },
  backButtonText: {
    color: '#1E293B',
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 270,
    backgroundColor: '#FFFFFF',
    paddingTop: 65,
    paddingHorizontal: 18,
    zIndex: 2,
    elevation: 15,
  },
  drawerHeader: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
  },
  drawerEmoji: {
    fontSize: 35,
  },
  drawerTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drawerSubtitle: {
    color: '#CBD5E1',
    fontSize: 13,
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
  },
  activeOption: {
    backgroundColor: '#DBEAFE',
  },
  optionIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  optionText: {
    color: '#475569',
    fontSize: 16,
  },
  activeOptionText: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 25,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
  },
  closeButtonText: {
    color: '#475569',
    fontWeight: 'bold',
  },
});
