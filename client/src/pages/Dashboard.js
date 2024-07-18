import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar';
import { Container, Grow, Grid, Card, CardContent, Button, Box } from "@mui/material";
import Posts from "../components/Posts/Posts";
import NestedModal from "../components/Modal/Modal";

import { useDispatch } from "react-redux"; 
import { getPosts } from '../actions/posts';


export const OpenModalButton = ({ handleOpen }) => {
    return <Button onClick={handleOpen}> Add a post </Button>;
};
  
const Dashboard = () => {
    const dispatch = useDispatch();
    
    useEffect(() => { dispatch(getPosts());}, [dispatch]);
   
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <>
            <Navbar />
            <Container>
                <Grow in>
                    <Container maxWidth='lg'>
                        <Grid container marginTop='50px' display='flex' justifyContent='space-between' spacing='10px'>
                            <Grid item xs={12} md={8}>
                                <Posts />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card>
                                <Box display="flex" justifyContent="center">
                                    <OpenModalButton handleOpen={handleOpen} />
                                    <NestedModal open={open} handleClose={handleClose} />
                                </Box>
                                <CardContent/>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    );
}

export default Dashboard;
