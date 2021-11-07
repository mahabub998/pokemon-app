import React,{useState} from 'react';
import { Container, Col, Form, Button } from 'react-bootstrap';


const Search = (props) => {
const [search,setSearch] = useState('');

    return (
        <Container>
        <h1>{search}</h1>
            <Form className="mt-2">
             <Form className="align-item-center">
               <Col sm={10} className="my-1">
                 <Form.Control 
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search for pokemon"/>
                 
               </Col>
               <Col sm={2} className="my-2">
               <Button block onClick={(e) => props.getPokemon(search)}>Search</Button>
               </Col>
             </Form>
            </Form>
        </Container>
    );
};

export default Search;