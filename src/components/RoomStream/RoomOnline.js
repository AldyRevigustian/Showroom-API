import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Spinner, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URL_PROFILE } from "../../utils/constant";
import { Link } from "react-router-dom";
import './style.css';
import { useMediaQuery } from 'react-responsive'
import Moment from 'react-moment';
import { CgEnter } from "react-icons/cg";

export default function RoomOnline(props) {
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' })
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const [profiles, setProfiles] = useState('');
    const { profile_id } = props;
    const [loading, setLoading] = useState(false);


    const getRoom = async () => {
        try {
            await axios
                .get(API_URL_PROFILE + profile_id)
                .then((response) => {
                    const profiles = response.data;
                    setProfiles(profiles);
                });
            setLoading(true);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getRoom();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(()=> {
    //     setTimeout( async () => {
    //         getRoom();
    //     },100)
    // },[])

    // console.log(profiles);
    // console.log(profiles.current_live_started_at);
        
    return (
        <div>
            {isDesktopOrLaptop &&
                <div>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive ? (
                                    <Card className="animasi-card" style={{ width: "12rem", margin: 10,zIndex:2,}}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 10, }}>{profiles.room_url_key} 
                                            <Badge style={{marginLeft:10}} bg="success">
                                                <Moment unix format="hh:mm">{profiles.current_live_started_at}</Moment>
                                            </Badge>
                                            </Card.Title>
                                            <Link
                                                style={{ display: "inline", backgroundColor: 'red', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none', fontSize: 15 }}
                                                to={`/streaming/${profiles.room_id}`}>
                                                Live <CgEnter/></Link>
                                        </Card.Body>
                                    </Card>
                                ) : ""}
                            </div>

                        )
                        :
                        (
                            <div style={{ marginRight: "-20px", marginTop: '30px', marginLeft: '-15px', position:'relative',zIndex:1  }}>
                                <Spinner animation="border" variant="secondary" />
                            </div>
                        )}
                </div>
            }

            {isTabletOrMobile &&
                <div>
                    {loading ?
                        (
                            <div>
                                {profiles.is_onlive ? (
                                    <Card className="animasi-card" style={{ width: "10rem", margin: 10 , position:'relative', zIndex:2}}>
                                        <Card.Img variant="top" src={profiles.image} />
                                        <Card.Body>
                                            <Card.Title style={{ fontSize: 13, marginBottom: 10, }}><p style={{marginBottom:5}}>{profiles.room_url_key}</p>
                                            <Badge style={{display:'block'}} bg="success">
                                                <Moment unix format="hh:mm">{profiles.current_live_started_at}</Moment>
                                            </Badge>
                                            </Card.Title>
                                            <Link
                                                style={{ display: "inline", backgroundColor: 'red', padding: 5, borderRadius: 5, color: 'white', textDecoration: 'none', fontSize: 15 }}
                                                to={`/streaming/${profiles.room_id}`}>
                                                Live <CgEnter/></Link>

                                        </Card.Body>
                                    </Card>
                                ) : ""}
                            </div>

                        )
                        :
                        (
                            <div style={{ marginRight: "-20px", marginTop: '30px', marginLeft: '-15px',position:'relative', zIndex:1 }}>
                                <Spinner animation="grow" variant="secondary" />
                            </div>
                        )}
                </div>
            }
        </div>
    );

}





