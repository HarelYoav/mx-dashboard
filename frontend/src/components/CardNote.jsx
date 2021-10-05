import { Card, Col } from "react-bootstrap";
import SmartText from './smartText';

const CardNote = (props) => {

    return (

        <Col lg={12}>
            <Card style={{
                borderRadius: '25px',
                maxWidth: '690px',
                minWidth: '400px',
                margin: '20px auto'

                }}>
                <Card.Header style={{borderRadius: '25px'}}>
                    <div className='d-flex'>
                    <img style={{width:'35px', height: '35px', borderRadius: '100%'}} alt='user' src={props.img}/>
                    <h5 style={{marginLeft: '10px', marginTop: '4px'}}>{props.name}</h5>
                    <p className='ml-auto' style={{fontSize: '0.8rem'}}>Created on - {props.date.substring(0,10)}</p>
                    </div>
                </Card.Header>
                <Card.Body>

                    <Card.Title>{props.title}</Card.Title>
                    <SmartText text={props.content} long={100}/>

                </Card.Body>
            </Card>
        </Col>
    )
}

export default CardNote;