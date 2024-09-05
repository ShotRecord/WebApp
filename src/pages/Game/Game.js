
import {Button, Divider, IconButton, Stack, Typography} from "@mui/material";
import {ArrowCircleLeftRounded, ArrowCircleRightRounded, HomeRounded, UndoRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

export default function Game() {
    const {state} = useLocation();
    const [shooterList, setShooterList] = useState(state);
    const [shooterIndex, setShooterIndex] = useState(0);

    const shooterName = shooterList[shooterIndex].name;
    const shooterScore = shooterList[shooterIndex].scores;
    const [firstShoot, setFirstShoot] = useState(null);
    const [secondShoot, setSecondShoot] = useState(null);
    const [thirdShoot, setThirdShoot] = useState(null);

    const changeShooter = (direction) => {
        if (direction === 'last' && shooterIndex > 0) {
            setShooterIndex(shooterIndex - 1);
        }
        else if (direction === 'next' && shooterIndex < shooterList.length - 1) {
            setShooterIndex(shooterIndex + 1);
        }

        setFirstShoot(null);
        setSecondShoot(null);
        setThirdShoot(null);
    };

    const saveShoot = (shootValue) => {
        if (shooterScore.length >= 12) return;
        if (firstShoot === null) {setFirstShoot(shootValue);}
        else if (secondShoot === null) {setSecondShoot(shootValue);}
        else {setThirdShoot(shootValue);}
    };

    useEffect(() => {
        if (thirdShoot !== null) {
            const newShooterScore = [...shooterScore, {shoot1: firstShoot, shoot2: secondShoot, shoot3: thirdShoot}];
            let newShooterList = [...shooterList];
            newShooterList[shooterIndex] = {name: shooterName, scores: newShooterScore};
            setShooterList(newShooterList);

            // Reset les tirs
            setFirstShoot(null);
            setSecondShoot(null);
            setThirdShoot(null);
        }
    }, [thirdShoot]);

    // Fonction pour calculer le score d'une volée
    const calculateVolleyScore = (volley) => {
        const shoot1 = volley.shoot1 === '10+' ? 10 : volley.shoot1;
        const shoot2 = volley.shoot2 === '10+' ? 10 : volley.shoot2;
        const shoot3 = volley.shoot3 === '10+' ? 10 : volley.shoot3;

        return (shoot1 !== null ? parseInt(shoot1) : 0) + (shoot2 !== null ? parseInt(shoot2) : 0) + (shoot3 !== null ? parseInt(shoot3) : 0);
    };

    // Fonction pour calculer le score cumulé jusqu'à une volée donnée
    const calculateCumulativeScore = (index) => {
        return shooterScore.slice(0, index + 1).reduce((acc, volley) => acc + calculateVolleyScore(volley), 0);
    };

    const undoLastShoot = () => {
        let newShooterScore = [...shooterScore];

        if(secondShoot !== null) {
            setSecondShoot(null);
        }
        else if(firstShoot !== null) {
            setFirstShoot(null);
        }
        else if (newShooterScore.length > 0) {
            const lastVolley = newShooterScore.pop();

            setFirstShoot(lastVolley.shoot1);
            setSecondShoot(lastVolley.shoot2);

            const newShooterList = [...shooterList];
            newShooterList[shooterIndex] = { name: shooterName, scores: newShooterScore };
            setShooterList(newShooterList);
        }
    };

    return (
        <>
            {/* Navigation des tireurs et bouton d'accueil */}
            <Stack width={'100%'} height={'60px'} flexDirection='row' justifyContent={'center'} alignItems={'center'} backgroundColor={'#2B2B2B'}>
                <Stack width={'80%'} flexDirection='row' justifyContent={'space-between'} alignItems={'center'}>
                    <Stack width={'25%'}>
                        {shooterIndex !== 0 &&
                            <IconButton onClick={() => changeShooter('last')}>
                                <ArrowCircleLeftRounded sx={{color: 'white'}}/>
                            </IconButton>
                        }
                    </Stack>
                    <Typography width={'100%'} color={'white'} align={'center'} fontWeight={'bold'}>{shooterName}</Typography>
                    <Stack width={'25%'}>
                        {shooterIndex !== (shooterList.length - 1)  &&
                            <IconButton onClick={() => changeShooter('next')}>
                                <ArrowCircleRightRounded sx={{color: 'white'}}/>
                            </IconButton>
                        }
                    </Stack>

                </Stack>
                <Divider orientation="vertical" flexItem sx={{bgcolor: 'white', borderRightWidth: 5}} />
                <Stack width={'20%'} alignItems={'center'}>
                    <Link to={'/'} style={{textDecoration: 'none'}}>
                        <HomeRounded sx={{color: 'white'}}/>
                    </Link>
                </Stack>
            </Stack>

            {/* Tableau des scores */}
            <Stack width={'100%'} height={'calc(100dvh - 260px)'} alignItems={'center'} justifyContent={'center'}>
                <Stack width={'90%'} height={'95%'} gap={1}>
                    {shooterScore.map((volley, index) =>
                        <Stack key={'volley-' + index} height={'33px'} flexDirection='row' width={'100%'} backgroundColor={'#2B2B2B'} borderRadius={3} alignItems={'center'}>
                            <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>{volley.shoot1 !== null ? volley.shoot1 : '--'}</Typography>
                            <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>{volley.shoot2 !== null ? volley.shoot2 : '--'}</Typography>
                            <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>{volley.shoot3 !== null ? volley.shoot3 : '--'}</Typography>
                            <Divider orientation="vertical" flexItem sx={{bgcolor: 'white', borderRightWidth: 5}} />
                            <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'white'}>
                                {calculateVolleyScore(volley)}
                            </Typography>
                            <Divider orientation="vertical" flexItem sx={{bgcolor: 'white', borderRightWidth: 5}} />
                            <Typography textAlign='center' fontWeight={'bold'} width={'100%'} color={'#B8860B'}>
                                {calculateCumulativeScore(index)}
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </Stack>

            {/* Boutons pour entrer les scores */}
            <Stack width={'100%'} height={'200px'} backgroundColor={'#2B2B2B'} alignItems={'center'} justifyContent={'space-around'}>
                <Stack width={'90%'} flexDirection='row' height={'40px'}>
                    <Button variant='contained' minWidth={'none'} sx={{padding: '5px 8px', minWidth: 'auto', borderRadius: '10px'}} color='error' onClick={undoLastShoot}>
                        <UndoRounded sx={{color: 'white'}}/>
                    </Button>
                    <Stack width={'100%'} height={'40px'} flexDirection='row' justifyContent={'center'} gap={4}>
                        <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                            <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{firstShoot !== null && firstShoot}</Typography>
                        </Stack>
                        <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                            <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{secondShoot !== null && secondShoot}</Typography>
                        </Stack>
                        <Stack width={'40px'} height={'100%'} justifyContent={'center'} borderRadius={'10px'} backgroundColor={'white'} boxShadow={'inset 4px 4px 4px 0 rgba(43, 43, 43, .25)'}>
                            <Typography align='center' fontWeight={'bold'} fontSize={'20px'}>{thirdShoot !== null && thirdShoot}</Typography>
                        </Stack>
                    </Stack>
                </Stack>

                {/* Boutons pour les valeurs des tirs */}
                <Stack gap={2} width={'90%'} justifyContent={'center'}>
                    <Stack flexDirection='row' width={'100%'} height={'40px'} justifyContent={'space-between'}>
                        {[0, 1, 2, 3, 4, 5].map(value => (
                            <Button key={value} variant='contained' sx={{padding: '0', fontSize: '1rem', minWidth: '40px', borderRadius: '10px', fontWeight: 'bold'}} onClick={() => saveShoot(value)}>
                                {value}
                            </Button>
                        ))}
                    </Stack>
                    <Stack flexDirection='row' width={'100%'} height={'40px'} justifyContent={'space-between'}>
                        {[6, 7, 8, 9, 10, '10+'].map(value => (
                            <Button key={value} variant='contained' sx={{padding: '0', fontSize: '1rem', minWidth: '40px', borderRadius: '10px', fontWeight: 'bold'}} onClick={() => saveShoot(value)}>
                                {value}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}