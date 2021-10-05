import { Alert } from 'react-bootstrap';

function ErrorMessage({variant = "Info", children}) {

    return (
        <Alert variant={variant} style={{fontSize: 20}}>
            <p>{children}</p>
        </Alert>
    )

}

export default ErrorMessage;