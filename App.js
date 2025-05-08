import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; // Importamos íconos

// --- Datos de ejemplo para las prendas ---
const prendasDeEjemplo = [
  { id: '1', name: 'Vestido Floral', category: 'Vestidos', image: 'https://via.placeholder.com/150/FFC0CB?text=Vestido' },
  { id: '2', name: 'Jeans Azules', category: 'Pantalones', image: 'https://via.placeholder.com/150/ADD8E6?text=Jeans' },
  { id: '3', name: 'Blusa Blanca', category: 'Tops', image: 'https://via.placeholder.com/150/F0FFF0?text=Blusa' },
  { id: '4', name: 'Chaqueta Denim', category: 'Chaquetas', image: 'https://via.placeholder.com/150/B0C4DE?text=Chaqueta' },
  { id: '5', name: 'Zapatillas Blancas', category: 'Calzado', image: 'https://via.placeholder.com/150/F8F8FF?text=Zapas' },
];

// --- Componente principal de la app ---
export default function App() {
  const [prendas, setPrendas] = React.useState(prendasDeEjemplo);
  const [nuevaPrendaNombre, setNuevaPrendaNombre] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('Guardarropa'); // Para la navegación inferior

  // Función para renderizar cada prenda en la lista
  const renderPrenda = ({ item }) => (
    <TouchableOpacity style={styles.prendaCard}>
      <Image source={{ uri: item.image }} style={styles.prendaImage} />
      <Text style={styles.prendaName}>{item.name}</Text>
    </TouchableOpacity>
  );

  // Función para añadir una nueva prenda (simplificada)
  const handleAddPrenda = () => {
    if (nuevaPrendaNombre.trim()) {
      const nuevaId = String(prendas.length + 1);
      setPrendas([...prendas, { id: nuevaId, name: nuevaPrendaNombre, category: 'Sin Categoría', image: 'https://via.placeholder.com/150/D3D3D3?text=Nueva' }]);
      setNuevaPrendaNombre('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Encabezado --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Guardarropa Virtual</Text>
      </View>

      {/* --- Contenido Principal (solo Guardarropa por simplicidad) --- */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tus Prendas</Text>
        <FlatList
          data={prendas}
          renderItem={renderPrenda}
          keyExtractor={item => item.id}
          numColumns={2} // Mostrar 2 columnas de prendas
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.prendasList}
        />
      </View>

      {/* --- Sección para Añadir Nueva Prenda --- */}
      <View style={styles.addPrendaContainer}>
        <TextInput
          style={styles.addPrendaInput}
          placeholder="Nombre de la nueva prenda"
          placeholderTextColor="#888"
          value={nuevaPrendaNombre}
          onChangeText={setNuevaPrendaNombre}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPrenda}>
          <AntDesign name="pluscircle" size={30} color="#FF6B6B" /> {/* Color acento */}
        </TouchableOpacity>
      </View>


      {/* --- Barra de Navegación Inferior --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Guardarropa')}
        >
          <MaterialCommunityIcons 
            name="hanger" 
            size={24} 
            color={activeTab === 'Guardarropa' ? '#FF6B6B' : '#888'} // Color acento
          />
          <Text style={[styles.navText, activeTab === 'Guardarropa' && styles.navTextActive]}>Guardarropa</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Atuendos')}
        >
          <Ionicons 
            name="shirt-outline" 
            size={24} 
            color={activeTab === 'Atuendos' ? '#FF6B6B' : '#888'} // Color acento
          />
          <Text style={[styles.navText, activeTab === 'Atuendos' && styles.navTextActive]}>Atuendos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem} 
          onPress={() => setActiveTab('Calendario')}
        >
          <AntDesign 
            name="calendar" 
            size={24} 
            color={activeTab === 'Calendario' ? '#FF6B6B' : '#888'} // Color acento
          />
          <Text style={[styles.navText, activeTab === 'Calendario' && styles.navTextActive]}>Calendario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDF5', // Fondo principal: Crema muy sutil
  },
  header: {
    padding: 20,
    paddingTop: 50, // Espacio para la barra de estado
    backgroundColor: '#FFFDF5',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26, // Más grande
    fontWeight: 'bold',
    color: '#333333', // Gris oscuro
  },
  content: {
    flex: 1,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    marginLeft: 5,
  },
  prendasList: {
    justifyContent: 'space-between',
  },
  row: {
    justifyContent: 'space-around', // Espacio entre las columnas
    marginBottom: 15, // Espacio entre filas
  },
  prendaCard: {
    backgroundColor: '#FFFFFF', // Blanco puro para las tarjetas
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '46%', // Ancho para 2 columnas con espacio
    shadowColor: '#000', // Sombra sutil
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  prendaImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#EEE', // Color de fondo si la imagen no carga
  },
  prendaName: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    textAlign: 'center',
  },
  addPrendaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFFDF5',
  },
  addPrendaInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#FFFFFF', // Blanco puro para la barra inferior
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888', // Gris para íconos inactivos
    marginTop: 4,
  },
  navTextActive: {
    color: '#FF6B6B', // Color acento para ícono activo
    fontWeight: 'bold',
  },
});