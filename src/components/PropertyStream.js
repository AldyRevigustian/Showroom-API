import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { API_URL_PROFILE, API_URL_SR } from '../utils/constant';
import { Link, useParams } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { ArrowBack, People, Visibility, } from '@mui/icons-material';

function PropertyStream() {
    const [names, setNames] = useState("");
    let params = useParams();

    const getNames = () => {
        axios
            .get(API_URL_PROFILE + params.streamingId)
            .then((response) => {
                const names = response.data;
                setNames(names);
            })
            .catch((error) => {
                console.log(error);
            });   
    }

    useEffect(() => {
        getNames();
    });

    // console.log(names);

    return (
        <div style={{color:'black',display:'flex', justifyContent:'center', alignItems:'center', marginTop:13}}>
            <Link style={{ fontSize:12,display: "inline", backgroundColor: '#FFCA2C', padding: '5px 10px 4px 10px', borderRadius: 5, color: 'white', textDecoration: 'none' , fontWeight:'bold'}} to={`/`}><ArrowBack style={{fontSize:14, marginBottom:2, }}/> Back</Link> 
            {/* <Button variant="danger"  style={{margin:'0 0 0 10px',  padding: '5px 10px 4px 10px', fontSize:12, }}>Showroom</Button> */}
            <a href={`${API_URL_SR + names.room_url_key}`} target="_blank" style={{margin:'0 20px 0 20px', fontWeight:'bold', fontSize:'18px', color:'#222831'}}>{names.room_url_key}</a>
            <Badge bg="success" style={{display:'inline', margin:'0 0 0 0',padding: '5px 10px 4px 10px'}} ><Visibility style={{fontSize:14,marginBottom:2}} /> {names.view_num}</Badge> 
            <Badge bg="primary" style={{display:'inline', margin:'0 0 0 10px',padding: '5px 10px 4px 10px'}} ><People style={{fontSize:14,marginBottom:2}} /> {names.follower_num}</Badge> 
        </div>
    )
}

export default PropertyStream