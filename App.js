import React, {useState} from 'react';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';


const authCall = async (payload) => {
  try {
    const endpoint = 'http://localhost:4242'
    const path = '/user/authenticate'
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(payload)

    const response = await fetch(endpoint + path, {
      method: 'POST',
      headers,
      body
    })
    const resBody = await response.json();
    console.log(resBody)

    return resBody
  } catch(err) {
    console.error(err)
  }
}



export default function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState()

  const [username, setUsername] = useState('jester')
  const [password, setPassword] = useState('jester')

  const login = async () => {
    const payload = {username, password}
    setUser(
      await authCall(payload)
      // Object.assign(payload, {id: 'dvjbo673gb4971v'})
    )
    setIsLogged(true)
  }


  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Auth Test</Text>
      </View>

      {
        isLogged ? <View style={styles.formContainer}>
          <Text style={styles.titleText}>Hello <strong>{user && user.username}</strong> !</Text>
          <Text style={styles.titleText}>Your id: {user && user.id}</Text>
        </View> : null
      }

      <View style={styles.formContainer}>
        <TextInput  placeholder="username" 
                    placeholderTextColor="rgba(255, 255, 255, 0.8)" 
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input} />

        <TextInput  placeholder="password" 
                    placeholderTextColor="rgba(255, 255, 255, 0.8)" 
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input} />

        <View style={styles.formButtonConfirm}>
          <Button title="Login" color="lightseagreen" onPress={login} />
        </View>

        <View style={styles.formButtonConfirm}>
          <Button title="Create New User" color="brown" disabled />
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    color: 'teal',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleContainer: {
    backgroundColor: 'teal', 
    width: '100%', 
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    webkitBoxShadow:  '0px 1px 15px 0px #000000',
    boxShadow:        '0px 1px 15px 0px #000000',
  },
  titleText: {
    fontSize: 32,
    textAlign: 'center',
    color: 'white'
  },

  formContainer: {
    backgroundColor: 'teal',
    padding: 10,
    margin: 'auto',

    borderRadius: 4,
    webkitBoxShadow:  '1px 1px 5px 0px #000000',
    boxShadow:        '1px 1px 5px 0px #000000',
  },
  input: {
    color: 'white',
    backgroundColor: 'none',
    margin: 2,

    borderRadius: 4,
    webkitBoxShadow:  '0px 0px 2px 0px #000000',
    boxShadow:        '0px 0px 2px 0px #000000',
  },
  formButtonConfirm: {
    margin: 2,
    marginTop: 4,
    overflow: 'hidden',

    borderRadius: 4,
    webkitBoxShadow:  '0px 1px 4px 1px #000000',
    boxShadow:        '0px 1px 4px 1px #000000',
  }
});
