import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import PantallaCalculadoraBasica from './Calculadora';


export default function PantallaInicial( { navigation: { navigate } } ) {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.texto} >Bienvenido{'\n'}</Text>
            <Button
                title="Abrir Calculadora"
                color="orange"
                onPress={ () => navigate('Calculadora Basica') }
            />           
        </View>
    );
  };


const styles = StyleSheet.create({

    contenedor: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edf3f8'
    },

    texto: {
        fontSize: 24
    }

});  


