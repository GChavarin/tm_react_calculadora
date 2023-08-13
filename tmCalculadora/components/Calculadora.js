import React, {useState} from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

var arrayOperadores = [];
var arrayCifras = [];
var arrayNumero = [];

export default function PantallaCalculadoraBasica() {
    
    const [txtCifra, setTxtCifra] = useState('0');

    const limpiarDatos = () => {
        setTxtCifra('0');
        resetEstructuraDatos();
    }

    const resetEstructuraDatos = () => {
        arrayOperadores = [];
        arrayCifras = [];
        arrayNumero = [];
    }

    const setNumero = (strNumber) => { 

        if ( txtCifra !== 'Error') {
            // agregar al arreglo que guarda los digitos presionados
            arrayNumero.push(strNumber);

            // concatenar cifra completa
            var txtCifraNueva = "";
            arrayNumero.forEach( n => txtCifraNueva = txtCifraNueva + n );

            // convertir a numero para dar formato
            const intNumber = Number(txtCifraNueva);

            // use state para actualizar pantalla
            setTxtCifra(intNumber.toString());
        }
    }

    const setOperacion = (strOperador) => {
        if ( txtCifra !== 'Error') {
            
            // resetear arreglo que guarda digitos presionados
            arrayNumero = [];

            // bajo esta logica, si se oprime algun operacion entonces se guarda la cifra entrada y la operacion seleccionada
            // para saber cual fue la primer cifra y que operacion se aplicara
            // Si se presiona algun operador por segunda vez entonces se resuelve la operacion antes de continuar
            if ( arrayOperadores.length == 0 ) {    
                arrayOperadores.push(strOperador);
                arrayCifras.push(txtCifra);
            }
            else {
                realizarOperacion();
            }
        }

    }

    const realizarOperacion = () => {

        //if (arrayOperadores.length > 0) {
            if (arrayCifras.length > 0) {    
            // Obtener cifra anterior
            const cifra1 = Number(arrayCifras.pop());
            // Obtener cifra actual
            const cifra2 = Number(txtCifra);           
            
            ////// Realizar operacion
            
            // Recuperar operador seleccionado
            const simboloOperacion = arrayOperadores.pop();

            var resultado = 0;
            var err = 0;

            // Multiplicacion
            if (simboloOperacion== '*' ) {
                resultado = cifra1 * cifra2;
            }

            // Division - validar division entre 0
            if (simboloOperacion == '/') {
                if ( cifra2 != 0 ) {
                    resultado = cifra1 / cifra2;
                } 
                else {
                    err = 1;
                } 
            }

            // Suma
            if (simboloOperacion== '+' ) {
                resultado = cifra1 + cifra2;
            }

            // Resta
            if (simboloOperacion== '-' ) {
                resultado = cifra1 - cifra2;
            }

            // Mostrar resultado o error y limpiar estructuras usadas segun el caso
            if ( err == 0 ) {
                // Mostrar resultado
                setTxtCifra(resultado.toString());

                // Estar seguro que estructuras estan limpias para siguientes operaciones
                resetEstructuraDatos();

                // poner resultado como nueva cifra por si se utiliza para otro calculo
                arrayCifras.push(resultado.toString());
            }
            else {
                // Mostrar mensaje de Error
                setTxtCifra('Error')
            }
        }
    }

    return (
        <View style={styles.contenedor}>

            <View style={styles.contenedor_resultados} >
                <View>
                    <Text style={styles.resultado_texto}>{txtCifra}</Text>
                </View>
                <View style={styles.general_botones_grupo}>
                    <View style={styles.numeros_cuadro}>
                        <Button title="C" color="#082245" onPress={ () => limpiarDatos()}/>
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="=" color="#082245" onPress={() => realizarOperacion()}/>
                    </View>
                </View>
            </View>

            <View style={styles.contenedor_numeros}>
                <View style={styles.numeros_grupo}>
                    <View style={styles.numeros_cuadro}>
                        <Button title="9" onPress={ () => setNumero('9') }/>
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="8" onPress={ () => setNumero('8')} />
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="7" onPress={ () => setNumero('7')} />
                    </View>
                </View>

                <View style={styles.numeros_grupo}>
                    <View style={styles.numeros_cuadro}>
                        <Button title="6" onPress={ () => setNumero('6')} />
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="5" onPress={ () => setNumero('5')} />
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="4" onPress={ () => setNumero('4')} />
                    </View>
                </View>

                <View style={styles.numeros_grupo}>
                    <View style={styles.numeros_cuadro}>
                        <Button title="3" onPress={ () => setNumero('3')} />
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="2" onPress={ () => setNumero('2')} />
                    </View>
                    <View style={styles.numeros_cuadro}>
                        <Button title="1" onPress={ () => setNumero('1')} />
                    </View>
                </View>

                <View style={styles.numeros_grupo}>
                    <View style={styles.numeros_cuadro}>
                        <Button title="0" onPress={ () => setNumero('0')} />
                    </View>
                </View>
            </View>

            <View style={styles.contenedor_operadores}>
                <View style={styles.numeros_cuadro}>
                    <Button title="X" color="#31817e" onPress={ () => setOperacion('*')}/>
                </View>

                <View style={styles.numeros_cuadro}>
                    <Button title="/" color="#31817e" onPress={ () => setOperacion('/')}/>
                </View>

                <View style={styles.numeros_cuadro}>
                    <Button title="+" color="#31817e" onPress={ () => setOperacion('+')}/>
                </View>

                <View style={styles.numeros_cuadro}>
                    <Button title="-" color="#31817e" onPress={ () => setOperacion('-')}/>
                </View>                                        
            </View> 

            <View style={styles.contenedor_extra}></View>    

        </View>
    );
  };


  const styles = StyleSheet.create({

    contenedor: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#edf3f8'
    },

    contenedor_extra: {
        flex: 1
    },

    contenedor_resultados: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#94b2d0',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 3
    },

    contenedor_operadores: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        alignContent: 'center',
        backgroundColor: '#94b2d0',
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 3
    },

    contenedor_numeros: {
      flex: 3,
      flexDirection: "column",
      backgroundColor: '#102336',
      marginHorizontal: 20,
      marginVertical: 10,
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
      //alignContent: 'space-around',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 3,
      //alignItems: 'center'
      //alignItems: 'center',
      //justifyContent: 'center',
    },

    general_botones_grupo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-evenly',
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10
    },

    numeros_grupo: {
        flex: 1,
        flexDirection: "row-reverse",
        justifyContent: 'space-evenly'
    },

    numeros_cuadro: {
        width: 65,
        height: 40
    },

    boton_operadores: {
        color: '#50818b'
    },

    resultado_texto: {
        fontSize: 30,
        textAlign: 'right',
        backgroundColor: 'oldlace'
        //backgroundColor: '#dee9f2'
    }

  });