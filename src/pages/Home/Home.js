
import {Button, Divider, IconButton, Stack, TextField, Typography} from "@mui/material";
import {CloseRounded} from "@mui/icons-material";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function Home() {
    const [nameInput, setNameInput] = useState('');
    const [inputError, setInputError] = useState('');
    const [shooterList, setShooterList] = useState([]);

    const addShooter = () => {
        setInputError('');
        if(nameInput === '') {
            setInputError('Le champ ne peu pas être vide.');
        }
        else {
            const newShooterList = [...shooterList, {name: nameInput, scores: []}];
            setShooterList(newShooterList);
            setNameInput('');
        }
    }
    const deleteShooter = (index) => {
        const newShooterList = [...shooterList.filter((shooter, shooterIndex) => shooterIndex !== index)];
        setShooterList(newShooterList);
    }

    return (
        <>
            <Stack width={'100%'} height={'60px'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#2B2B2B'}>
                <Typography color={'white'} fontWeight={'bold'}>SHOTRECORD</Typography>
            </Stack>
            <Stack width={'100%'} height={'calc(100dvh - 60px)'} alignItems={'center'} justifyContent={'center'}>
                <Stack width={'90%'} gap={4} alignItems={'center'}>
                    <Stack flexDirection='row' height={'55px'} gap={2}>
                        <TextField
                            error={inputError !== ''}
                            label={'Nom'}
                            helperText={inputError !== '' ? inputError : null}
                            variant="outlined"
                            value={nameInput}
                            onChange={event => setNameInput(event.target.value)}
                        />
                        <Button variant="contained" onClick={addShooter}>Ajouter</Button>
                    </Stack>

                    <Stack width={'100%'} gap={1} height={'240px'} sx={{overflowY: 'scroll'}}>
                        {shooterList.map((shooter, index) =>
                            <Stack key={'Shooter ' + shooter.name} flexDirection='row' width={'100%'} backgroundColor={'#2B2B2B'} borderRadius={3} alignItems={'center'}>
                                <Typography textAlign='center' width={'100%'} color={'white'}>{shooter.name}</Typography>
                                <Divider orientation="vertical" flexItem sx={{bgcolor: 'white', borderRightWidth: 5}} />
                                <IconButton aria-label="delete" onClick={() => deleteShooter(index)}>
                                    <CloseRounded color='error'/>
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>

                    <Stack width={'100%'} alignItems={'center'}>
                        <Link to={"/Game"} state={shooterList} style={{textDecoration: 'none'}}>
                            <Button variant='contained'>Prêt</Button>
                        </Link>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}