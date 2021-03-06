import * as React from 'react';
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditAvance from './EditAvance';
import { useQuery, gql } from "@apollo/client";
import styles from "./Styles.modules.css";

const AVANCES = gql`
  query AllAdvances{
    allAdvances {
      _id
      project {
        _id
        name
      }
      user {
        _id
        fullName
      }
      advance
      date
      comments
    }
  }
`;

const AvancesScreen = () => {

  const { data, error, loading } = useQuery(AVANCES);
  console.log(data);


  return(
    <>
      <Box sx={{ textAlign: 'center'}}>
        <h1>Avances</h1>
      </Box>
      <Grid container spacing={2}>
        { data.allAdvances.map((avance) => (
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h2>Proyecto: <Link to={`/proyectos/${avance.project._id}`} className={styles.notline}>{avance.project.name}</Link></h2>
                <h3>Autor: <Link to={`/users/${avance.user._id}`}>{avance.user.fullName}</Link></h3>
                <h3>Fecha: {avance.date}</h3>
                <EditAvance avance={avance} />
                <h3>Avance:</h3>
                <p>{avance.advance}</p>
                <h3>Comentarios:</h3>
                <p>{avance.comments}</p>
              </CardContent>
            </Card>
          </Grid>
        ))};
      </Grid>        
    </>
  )
};

export default AvancesScreen;