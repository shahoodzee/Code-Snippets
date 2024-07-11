import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "./components/Posts/Posts";
import NestedModal from "./components/Modal/Modal";

import { useDispatch } from "react-redux"; 
import { getPosts } from './actions/posts';


const App = (props) => {
    const dispatch  = useDispatch();
    useEffect(() => {
        dispatch(getPosts());

    },[dispatch])

  return (
        <>
            <Navbar />
            <Container maxWidth='lg'>
                <Grow in>
                    <Container>
                        <Grid container justifyContent='space-between' alignItems='stretch' spacing={4} marginTop={10}>
                            <Grid item xs={12} sm={8} >
                                <Posts />
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <NestedModal />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>

        </>
    )
}
export default App;
