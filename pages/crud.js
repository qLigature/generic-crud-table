import { Container, Table, Button } from "react-bootstrap";

export default function Home() {
    return (
        <Container>
            <div className="text-center my-3">
                <h2 className="fw-bold">Generic CRUD Table</h2>
            </div>

            <div className="d-flex justify-content-center my-3">
                <Button variant="primary">Create Item</Button>
            </div>

            <Table striped bordered hover responsive>
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Column 1</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Data 1</th>
                        <th>Buttons</th>
                    </tr>
                    <tr>
                        <th>Data 2</th>
                        <th>Buttons</th>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}
