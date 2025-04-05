import React, { useEffect } from "react";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View,StyleSheet, ScrollView } from "react-native";


//Componente principal da aplicação
export default function Index() {

  const[contador,setContador] = useState(0);
  const[verifica,setVerifica] = useState('Par');
  const[number, setNumber] = useState(1);
  const[historico,setHistorico] = useState<Number[]>([])
  const[autoContar,setautoContar]= useState<boolean>(false);

  function getcolor(){
    if(contador > 0) return 'green';
    if(contador < 0) return 'red';
    return 'gray'
  }

  //adiciona um valor ao contador
  function adicionarContador(){
    setContador(number + contador )
    adicionaHistorico()
  }
  //diminui um valor ao contador
  function diminuirContador(){
    setContador(contador - number )
    adicionaHistorico()

  }
  //limpa todo os estados e o array do historico
  function zerarContador(){
    setContador(0)
    setHistorico([])
    setNumber(1)
    setautoContar(false)//altera o botao de autocontagem
  }
  function ehVazio(item: number){
    if(item > 0){
      setNumber(item)
    }
    else{
      item = 0;
      setNumber(item)
    }
    
  }

  //altera o valor do booleano do auto contado
  function adicionaHistorico(){
    if(contador !== null){
      setHistorico( oldState => [...oldState, contador])
    }
  }

  function toggleAutoContar(){
    setautoContar((prev) => (!prev))
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>

    if(autoContar){
        intervalId = setInterval(() => {
          adicionarContador()
        }, 1000)
    }
    return () => {
      if(intervalId){
        clearInterval(intervalId)
      }
    }
  }, [autoContar, contador, number])

  return (
    <View
    style ={styles.container}
    >
      <Text
        style ={styles.title}
      >
        Contador Inteligente
      </Text>
      
      <Text style ={[styles.numero, {color: getcolor()}]}>
        {contador}
      </Text>
      <Text>
        O número é {contador%2===0 ?'par':'impar'}
      </Text>
      
      <View
      style = {styles.deLadinho}>
        <TouchableOpacity
          activeOpacity={0.783}
          style  = {styles.button}
          onPress={diminuirContador}
        >
          <Text >
            Diminuir
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.783}
          style  = {styles.button}
          onPress={adicionarContador}
          >
          <Text >
            Aumentar
          </Text>
        </TouchableOpacity>

      </View>

      <TextInput 
        placeholder="1"
        placeholderTextColor = '#000'
        value={String(number)}
        keyboardType="numeric"
        onChangeText={(item) => ehVazio(parseInt(item))}
      />
      <View
      style = {styles.deLadinho}>
        <TouchableOpacity
          activeOpacity={0.783}
          style  = {styles.button}  
          onPress={zerarContador}
        >
          <Text >
            Zerar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.783}
          style  = {styles.button}
          onPress={toggleAutoContar}
        >
          <Text>{autoContar ? 'Parar auto': 'Iniciar auto'}</Text>

        </TouchableOpacity>
      </View>
      <Text>
        Historico:
      </Text>
      <ScrollView>
        {
          historico.slice(-10).reverse().map((item,index) => (
            <Text key={index} /*style={styles.historicoItem}*/ >
              {String(item)}
            </Text>
          ))
        }
      </ScrollView>
    </View>
  );

}

const styles = StyleSheet.create({
  button:{
    backgroundColor: '#008B8B',
    padding: 10,
    borderRadius:50,
    marginTop: 17,
    alignItems:'center',
    width:150,
  },
  title: {
    color :'#34495e',
    fontWeight:'bold',
    fontSize:25,
  },
  input: {
    backgroundColor:'#00C5CD',
    color: '#fff',
    fontSize: 18.777,
    padding: 13,
    borderRadius:22,
    marginTop: 17
  },
  deLadinho:{
    flexDirection:"row",
    gap: 10,
    
  },
  container: {
    flex:1,
    padding:30,
    alignItems:'center',
   
  },
  numero:{
    fontSize:48,
    marginBottom:20,

  }

})


