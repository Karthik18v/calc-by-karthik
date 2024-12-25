import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInput = (inputValue) => {
    setInput(input + inputValue);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult.toString());
    } catch (e) {
      setResult("Error");
    }
  };

  const isOperand = (label) => {
    return ["+", "-", "*", "/", "="].includes(label);
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{input}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {["7", "8", "9", "/"].map((char) => (
            <Button
              key={char}
              label={char}
              onPress={() => handleInput(char)}
              isOperand={isOperand(char)}
            />
          ))}
        </View>
        <View style={styles.row}>
          {["4", "5", "6", "*"].map((char) => (
            <Button
              key={char}
              label={char}
              onPress={() => handleInput(char)}
              isOperand={isOperand(char)}
            />
          ))}
        </View>
        <View style={styles.row}>
          {["1", "2", "3", "-"].map((char) => (
            <Button
              key={char}
              label={char}
              onPress={() => handleInput(char)}
              isOperand={isOperand(char)}
            />
          ))}
        </View>
        <View style={styles.row}>
          {["0", ".", "=", "+"].map((char) => (
            <Button
              key={char}
              label={char}
              onPress={() =>
                char === "=" ? handleCalculate() : handleInput(char)
              }
              isOperand={isOperand(char)}
            />
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleBackspace}>
            <Icon name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Button = ({ label, onPress, isOperand }) => (
  <TouchableOpacity
    style={[styles.button, isOperand && styles.operandButton]}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, isOperand && styles.operandButtonText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    padding: 20,
  },
  resultText: {
    fontSize: 48,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "90%",
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    padding: 20,
  },
  inputText: {
    fontSize: 24,
  },
  buttonsContainer: {
    flex: 3,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 4,
  },
  button: {
    backgroundColor: "transparent", 
    borderRadius: 50,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
  },
  operandButton: {
    backgroundColor: "transparent", 
  },
  buttonText: {
    fontSize: 24,
    color: "black", 
  },
  operandButtonText: {
    color: "#ff9800", 
  },
});

export default Calculator;
