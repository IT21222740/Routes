import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30, backgroundColor:'#F2E9E4',
       
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 26,
        marginBottom:50
    },
    inputContainer: {
        marginTop: 30,
        width:350,
        backgroundColor:"#fff",
        borderRadius:14,
        alignItems:'center',
        
    },
   
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center',
        
    },
    button: {
        marginTop: 100,
        height: 70,
        width: 250,
        backgroundColor: '#22223B',
        alignItems: 'center',
        borderRadius: 50,
        paddingTop: 20,
        color:"#FFFFFF"
    },
    buttonProfile: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#22223B',
        alignItems: 'center',
        borderRadius: 50,
        paddingTop: 20,
        color:"#FFFFFF"
    },
    buttonText: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'#FFFFFF'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
    },
    picker: {
        height: 80,
        width: 200,
    },
    pickerItem: {
        backgroundColor: "grey",
        color: "blue",
        fontFamily: "Ebrima",
        fontSize: 17,
    },
});

export default Styles;