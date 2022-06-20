import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";

export default function Home({ something }) {
  const router = useRouter();
  const [name, setName] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function createRow(e) {
    e.preventDefault();
    const res = await fetch(`https://genericapi.herokuapp.com/something/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });

    if (res.status < 300) {
      setName("");
      alert("Row created.");
      refreshData();
    }
  }

  async function deleteRow(id) {
    const res = await fetch(
      `https://genericapi.herokuapp.com/something/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status < 300) {
      alert("Row deleted.");
      refreshData();
    }
  }

  function renderRows(data) {
    return data.map((something) => {
      return (
        <tr key={something._id}>
          <td>{something.name}</td>
          <td>
            <Button variant="primary" size="sm">
              Update
            </Button>
          </td>
          <td>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteRow(something._id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <Container>
      <div className="text-center my-3">
        <h2 className="fw-bold">Generic CRUD Table</h2>
      </div>

      <div className="d-flex justify-content-center align-items-center my-3">
        <Form onSubmit={(e) => createRow(e)}>
          <Form.Group controlId="courseName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="ms-5" variant="primary" type="submit">
            Create Item
          </Button>
        </Form>
      </div>

      <Table striped bordered hover responsive>
        <thead className="bg-dark text-white">
          <tr>
            <th>Name</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderRows(something)}</tbody>
      </Table>
    </Container>
  );
}

export async function getServerSideProps() {
  const req = await fetch("https://genericapi.herokuapp.com/something/");
  const data = await req.json();

  return {
    props: { something: data },
  };
}
