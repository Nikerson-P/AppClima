import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import Api from "./../Api";

export default function Clima({ navigation }) {
  const luaimg = require("./../../assets/lua.png");
  const solimg = require("./../../assets/sol.png");

  const imagens = {
    first_quarter: require("./../../assets/Lua/first_quarter.png"),
    full: require("./../../assets/Lua/first_quarter.png"),
    last_quarter: require("./../../assets/Lua/last_quarter.png"),
    new: require("./../../assets/Lua/new.png"),
    waning_crescent: require("./../../assets/Lua/waning_crescent.png"),
    waning_gibbous: require("./../../assets/Lua/waning_gibbous.png"),
    waxing_crecent: require("./../../assets/Lua/waxing_crescent.png"),
    waxing_gibbous: require("./../../assets/Lua/waxing_gibbous.png"),
  };

  const conditions = {
    clear_day: require("./../../assets/Tempo/clear_day.png"),
    clear_night: require("./../../assets/Tempo/clear_night.png"),
    cloud: require("./../../assets/Tempo/cloud.png"),
    cloudly_day: require("./../../assets/Tempo/cloudly_day.png"),
    cloudly_night: require("./../../assets/Tempo/cloudly_night.png"),
    fog: require("./../../assets/Tempo/fog.png"),
    hail: require("./../../assets/Tempo/hail.png"),
    none_day: require("./../../assets/Tempo/none_day.png"),
    none_night: require("./../../assets/Tempo/none_night.png"),
    rain: require("./../../assets/Tempo/rain.png"),
    snow: require("./../../assets/Tempo/snow.png"),
    storm: require("./../../assets/Tempo/storm.png"),
  };

  const [temp, setTemp] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [lua, setLua] = useState("");
  const [isDay, setIsDay] = useState(false);
  const [hora, setHora] = useState(new Date().getHours());

  async function pegar() {
    try {
      const response = await Api.get();
      setTemp(response.data.results.temp);
      setCondition(response.data.results.condition_slug);
      setCity(response.data.results.city_name);
      setLua(response.data.results.moon_phase);
    } catch (error) {
      console.log("erro:" + error);
    }

    
  }

  function verifyHora() {
    const novaHora = new Date().getHours();

    setHora(novaHora);

    if (hora > 6 && hora < 18) {
      setIsDay(true);
    } else {
      setIsDay(false);
    }
  }

  function sair(){
    
    BackHandler.exitApp()
  }
  useEffect(() => {
    pegar();
    verifyHora();
    console.log(condition);
    
  }, []);

  return (
    <ImageBackground source={isDay ? solimg : luaimg} style={styles.fundo}>
      <TouchableOpacity style={styles.sair} onPress={sair}>
        <Text style={styles.textoSair}>Sair</Text>
      </TouchableOpacity>
      <Image source={conditions[`${condition}`]} style={styles.sol} />
      <Text style={styles.textoCentral}>{temp + "°"}</Text>

      <View style={styles.viewLua}>
        <Image source={imagens[`${lua}`]} style={styles.lua}></Image>
        <Text style={styles.cidade}>{city}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    width: "100%",
    height: "100%",
  },
  textoCentral: {
    fontSize: 120,
    fontWeight: "900",
    alignSelf: "center",
    marginTop: "20",
    padding: "10",
  },
  cidade: {
    alignSelf: "flex-end",
    fontSize: 32,
    marginLeft: "30%",
    marginRight: "10%",
    textAlignVertical: "center",
    lineHeight: "100",
  },
  lua: {
    marginLeft: "10%",
    width: "100",
    height: "100",
  },
  viewLua: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sol: {
    width: "200",
    height: "200",
    alignSelf: "center",
    marginTop: "40%",
  },
  sair: {
    position: "absolute",
    marginLeft: "90%",
    marginTop:"10%",
    borderWidth:2,
    borderRadius:10,
    width:40,
  },
  textoSair:{
    fontSize:12,
    textAlign:"center"
  }
});
