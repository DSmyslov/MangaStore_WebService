import ListGroup from 'react-bootstrap/ListGroup';

function HorizontalList(props) {
    return (
        <ListGroup horizontal={"xl"}>
            {Object.entries(props).map(([index, val]) => {
                return <ListGroup.Item key={index}>{val.id_genre.genre_name}</ListGroup.Item>;
            })}
        </ListGroup>
    );
}

export default HorizontalList;