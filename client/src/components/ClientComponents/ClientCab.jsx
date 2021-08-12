import React from "react";
import {Container, Paper, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {selectCandidate} from "../../redux/features/login";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    paper: {
        height: 342,
        width: 600,
    },
    paper1: {
        height: 700,
        width: 500,
    },
    root: {
        flexGrow: 1,
        display: "flex",
        "& > *": {
            margin: theme.spacing(1),
        },
    },
}));
const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2.5px #424242 `,
        borderRadius: 20,
        width: 20,
        height: 20,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            marginLeft: "-2px",
            marginTop: "-2px",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "2px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

function ClientCab() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);

    const candidate = useSelector(selectCandidate)
    return (
        <>
            <Container style={{ display: "flex",}}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            <Grid item>
                                <Paper className={classes.paper}>
                                    <div className={classes.root}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "right",
                                            }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
                                                style={{ width: 150, height: 150 }}
                                            />
                                        </StyledBadge>
                                        <Box>
                                            <Typography variant="h6">
                                                Имя: {candidate.firstName}
                                            </Typography>
                                            <Typography variant="h6">
                                                Фамилия: {candidate.lastName}
                                            </Typography>
                                        </Box>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid container className={classes.root} spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" spacing={spacing}>
                                        <Grid item>
                                            <Paper className={classes.paper}>
                                                <Typography variant="h6">Отзывы</Typography>
                                                <Box>
                                                    <Typography variant="h6">Name</Typography>
                                                    <Typography>description.description.description.description</Typography>
                                                    <Typography>12.07.2021 10:10</Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={spacing}>
                            <Grid item>
                                <Paper className={classes.paper1}>
                                    <Typography variant="h6">
                                        Личные данные
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default ClientCab;
