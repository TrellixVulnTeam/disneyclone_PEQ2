import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import Landing from './Landing';
import MovieInfo from './Landing';

function Detail() {
    const { id } = useParams();
    const [ movie, setMovie ] = useState();

    useEffect(()=>{
        // db.collection("movies")
        // .doc(id)
        // .get()
        // .then((doc)=>{
        //     if(doc.exists){
        //         setMovie(doc.data());
        //         console.log(doc);
        //     }else{
        //         // s
        //     }
        // });
        fetch(`http://disneyclone.xyz/api/movies/${id}`, {
            'method': 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(resp => setMovie(resp))
        .catch(error => console.log(error));
    }, [])
    return (
        <Container>
            { movie && (
                <>
            <Background>
            <img src={movie.thumbnail}/>
            </Background>
            <ImageTitle>
                <img src={movie.subtitle}/>
            </ImageTitle>
            <Controls>
                <PlayButton>
                    <img src="/images/play-icon-white.png"/>
                    <span>PLAY</span>
                </PlayButton>
                <TrailerButton>
                    <img src="/images/play-icon-white.png"/>
                    <span>TRAILER</span>
                </TrailerButton>
                <AddButton>
                    <span>+</span>
                </AddButton>
                <GroupWatchButton>
                    <img src="/images/group-icon.png"/>
                </GroupWatchButton>
            </Controls>
            <SubTitle>
                {movie.title}
            </SubTitle>
            <Description>
                {movie.description}
            </Description>
            </>
            )}
        </Container>
    )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
`;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    opacity: 0.8;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ImageTitle = styled.div`
    height: 50vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 26px;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    margin-top: 50px;
`;

const PlayButton = styled.button`
    padding: 10px 30px 10px 25px;
    background: #50B7F8;
    border-radius: 3px;
    border-width: 0px;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    color: #ffffff;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    img {
        margin-right: 10px;
    }

    &:hover {
        background: #43a3e0;
    }
`;

const TrailerButton = styled(PlayButton)`
    background: rgba(249, 249, 249, .1);

    &:hover {
        background: rgba(249, 249, 249, .3);
    }
`;

const AddButton = styled.button`
    margin-right: 16px;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span {
        font-size: 30px;
        color: white;
    }
`;

const GroupWatchButton = styled(AddButton)`
    background: #101010;
`;

const SubTitle = styled.div`
    color: gb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
    color: #fff;
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: #fff;
`;
