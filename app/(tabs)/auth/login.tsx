import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FontAwesome } from '@expo/vector-icons';

export default function AuthScreen({ isRegister = false }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAuth = async () => {
    if (!email || !password || (isRegister && (!name || !confirmPassword))) {
      Alert.alert('Fehler', 'Bitte alle erforderlichen Felder ausfüllen.');
      return;
    }
    if (isRegister && password !== confirmPassword) {
      Alert.alert('Fehler', 'Passwörter stimmen nicht überein.');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Fehler', 'Ungültige E-Mail-Adresse.');
      return;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">AsiaEcon</ThemedText>
      {isRegister && (
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      )}
      <TextInput style={styles.input} placeholder="E-Mail" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Passwort" value={password} onChangeText={setPassword} secureTextEntry />
      {isRegister && (
        <TextInput style={styles.input} placeholder="Passwort wiederholen" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      )}
      <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
        <ThemedText style={styles.buttonText}>{isRegister ? 'Registrieren' : 'Anmelden'}</ThemedText>
      </TouchableOpacity>
      
      <ThemedText style={styles.oauthText}>Oder {isRegister ? 'registrieren' : 'anmelden'} mit:</ThemedText>
      <View style={styles.oauthContainer}>
        <TouchableOpacity style={styles.oauthButton}>
          <FontAwesome name="wechat" size={32} color="#07C160" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton}>
          <FontAwesome name="yandex" size={32} color="#FF0000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.oauthButton}>
          <FontAwesome name="line" size={32} color="#00C300" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => router.push(isRegister ? '/auth/login' : '/auth/register')}>
        <ThemedText style={styles.linkText}>{isRegister ? 'Bereits registriert? Hier anmelden' : 'Noch kein Konto? Hier registrieren'}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 50, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#fff', marginBottom: 10 },
  authButton: { height: 50, backgroundColor: '#E63946', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#BC1A2B', fontSize: 14, textDecorationLine: 'underline', marginTop: 10, textAlign: 'center' },
  oauthText: { textAlign: 'center', marginTop: 20, fontSize: 14, fontWeight: 'bold' },
  oauthContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  oauthButton: { marginHorizontal: 15 },
});
