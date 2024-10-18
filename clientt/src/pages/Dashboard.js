import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar/Navbar';
import { Container, Grow, Grid, Button } from "@mui/material";
import Posts from "../components/Posts/Posts";
import NestedModal from "../components/Modal/Modal";
import { getPosts } from '../actions/posts';


export const OpenModalButton = ({ handleOpen }) => {
    return <Button onClick={handleOpen}> Add a post </Button>;
};
  
const Dashboard = () => {
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
                            <Grid item s={12} md={8}>
                                <Posts />
                            </Grid>
                            <Grid item s={12} md={4}>
                                <OpenModalButton handleOpen={handleOpen} />
                                <NestedModal open={open} handleClose={handleClose} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </>
    );
}

export default Dashboard;
