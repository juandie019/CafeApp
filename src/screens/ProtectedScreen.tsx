import React, { useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { gstyles } from '../theme/globalStyles';
import { AuthContext } from '../context/AuthContext';

export const ProtectedScreen = () => {

  const { user, token, logOut} = useContext( AuthContext );

  return (
    <View style={ styles.container }>
        <Text style={{ ...gstyles.title, color: 'black' }}>Procted Screen</Text>

        <Button
          title="Cerrar Sesión"
          color="#5856D6"
          onPress={ logOut }
        />

        <Text>
          { JSON.stringify(user, null, 5) }
        </Text>
        <Text>
          { token }
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});