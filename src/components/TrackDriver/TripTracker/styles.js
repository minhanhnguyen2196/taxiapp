import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    footerContainer:{
        backgroundColor:"#ffffff",
        height:100,
        padding:5
    },
    iconContainer:{
        width,
        alignItems: "center",
    },
    icon:{
        color:"#E7E7E7",
        fontSize:15
    },
    distanceText:{
        marginTop:5,
        color:"#FF5E3A",
        fontWeight:"bold",
        fontSize:16
    },
    onWayText:{
        marginTop:5,
        color:"#636363",
        fontSize:15
    },
    vehicleText:{
        marginTop: 10,
        color:"#636363",
        fontSize:14
    }
};

export default styles;