import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const lua = require("../../assets/lua.png");
const sol = require("../../assets/sol.png");

export default function Home({ navigation }) {
  const [isDay, setIsDay] = useState(true);
  const [hora, setHora] = useState(new Date().getHours());

  
  useEffect(()=>{
    const novaHora = new Date().getHours()
    
    setHora(novaHora)
    console.log(novaHora +" Hora:"+ hora)

     if(hora > 6 && hora < 18){
      setIsDay(true)
    } else{
      setIsDay(false)
    }
  },[])

  return (
    <ImageBackground
      source={isDay ? sol : lua}
      resizeMode="cover"
      resizeMethod="resize"
      style={styles.fundo}
    >
      <Text style={styles.texto}>Bem vindo</Text>
      <TouchableOpacity
        style={styles.btnCentro}
        title="Proxima"
        onPress={() => {
          navigation.navigate("Clima");
        }}
      >
        <Text style={styles.btnText}>Vamos lá</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    width: "100%",
    height: "100%",
  },
  texto: {
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "100%",
    marginBottom: "20%",
    fontSize: 28,
    fontWeight: "bold",
  },
  btnCentro: {
    width: "80%",
    height: "50px",
    backgroundColor: "#214cce",
    alignSelf: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  btnText: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
});
