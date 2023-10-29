import React from "react";
import Navbar from "../../../components/main/navbar";
import Footer from "../../../components/main/footer";
import SuccessImage from '../../../images/success.svg';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    section1 : 
        {
        width: 'auto',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'left',
        padding: '100px',
        flexWrap:"wrap",
        backgroundColor : "white",
        },

    section1_div_h1 : 
        {
            fontSize: '20px',
            background: "#922B21",
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor : "transparent",
            fontWeight :"bolder",
            marginBottom:"30px",
            marginTop:"30px",
            whiteSpace:"nowrap",
            overflow:"hidden",
            animation : "$typing 3s, $cursor .4s step-end infinite alternate"},
            '@keyframes typing': {
            '0%': {
                width: 0,
                },
                '100%': {
                width: '100%',
                },
            },
            '@keyframes cursor': {
                '0%': {
                borderBottomWidth: 2,
                },
                '100%': {
                borderBottomWidth: 0,
                },
        },

    section1_div_h3 : 
        {
        fontSize: '17px',
        background: "#922B21",
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor : "transparent",
        whiteSpace:"nowrap",
        overflow:"hidden",
        animation : "$typing1 3s, $cursor1 .4s step-end infinite alternate"},
        '@keyframes typing1': {
        '0%': {
            width: 0,
            },
            '100%': {
            width: '100%',
            },
        },
        '@keyframes cursor1': {
            '0%': {
            borderBottomWidth: 2,
            },
            '100%': {
            borderBottomWidth: 0,
            },
        },

    Button : 
    {
        color:'white',
        background: "linear-gradient(#0066FF, #4FACF7)",
        width:"80%",
        marginTop : "20px",
        padding:"20px",
        fontSize: '12px',
    },
 
  }));

const ValidationBusiness = () =>
{

    const classes = useStyles();

    return(

        <div>
            <div sx={{minHeight:"100vh"}}> 
            <Navbar/>
            <div className={classes.section1}>

            <img src={`${SuccessImage}`} height="300px" width="350px" alt="svg medecin"/>

                <div>
                    
                    <h1 className={classes.section1_div_h1}>Bienvenue sur RayonAfrique ! </h1>

                    <h3 className={classes.section1_div_h3} >Afin de finaliser la création de votre compte,</h3>

                    <h3 className={classes.section1_div_h3}>notre équipe vous contactera afin</h3>

                    <h3 className={classes.section1_div_h3}>de mieux vous connaître et</h3>

                    <h3 className={classes.section1_div_h3}>de vous présenter notre plateforme.</h3>
                    
                </div>
                

                 </div>
            </div>

            <Footer/>
        </div>
    );
};

export default ValidationBusiness;