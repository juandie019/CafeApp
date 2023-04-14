import { StyleSheet } from 'react-native';

export const gstyles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },

    buttonText: {
        fontSize: 18,
        color: 'white',
    },

    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 50,
    },

    fab: {
        position: 'absolute',
        top: 20,
        left: 20,
    },
});