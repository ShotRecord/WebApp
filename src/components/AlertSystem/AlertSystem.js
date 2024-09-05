
import {Alert} from "@mui/material";

export default function AlertSystem({type, message}) {


    return (
        <>
            {type === 'success' && <Alert severity="success">{message}</Alert>}
            {type === 'info' && <Alert severity="info">{message}</Alert>}
            {type === 'warning' && <Alert severity="warning">{message}</Alert>}
            {type === 'error' && <Alert severity="error">{message}</Alert>}
        </>
    );
}
