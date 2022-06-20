import { useState } from "react";
import { useRouter } from "next/router";
import { Container, Table, Button, Form } from "react-bootstrap";

export default function Home({ something, initialFieldState }) {

  // TODO: figure out if it's possible to use SWR here somehow
  const [newName, setNewName] = useState("");
  const [updatedName, setUpdatedName] = useState(initialFieldState);
  
  // Read: https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const router = useRouter();
  const refreshData = () => {
    // somehow refreshes server side props (but how)
    router.replace(router.asPath);
    
    // resets update fields
    setUpdatedName(initialFieldState);
  };

  // useful tip: inject variables inside property names by wrapping it in brackets!
  // note: if you see parenthesis right after an arrow, instead of braces
  // it's because the arrow function is returning an object
  const handleUpdate = (value, id) => {
    setUpdatedName(prevNames => ({...prevNames, [id]: value}));
  }

  // TODO: clean up and store these functions somewhere else
  async function createRow(e) {

    // prevents page refresh when submitting form
    e.preventDefault();

    const res = await fetch(`https://genericapi.herokuapp.com/something/`, {
      method: "POST",
      // if you don't include Content-Type headers, body might end up empty kekw
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    // anything less than 300 is probably a success code xd
    if (res.status < 300) {
      const data = await res.json();
      alert("Row created.");

      setNewName("");
      refreshData();
      setUpdatedName(prevName => ({...prevName, [data._id]: ''}));
    }
  }

  async function updateRow(e, id) {
    e.preventDefault();
    const res = await fetch(`https://genericapi.herokuapp.com/something/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName[id] }),
    });

    if (res.status < 300) {
      alert("Row updated.");

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

      // clever way to remove property from an object without mutation (needed for setState)
      const { id, ...noID } = updatedName;
      setUpdatedName(noID);
    }
  }

  // TODO: check if you can turn this into a component :thonk:
  function renderRows(data) {
    return data.map((something) => {
      return (
        <tr key={something._id}>
          <td>{something.name}</td>
          <td>
            <Form onSubmit={(e) => updateRow(e, something._id)} className="d-flex justify-content-center align-items-center">
              <Form.Control
                type="text"
                value={updatedName[something._id]}
                onChange={(e) => handleUpdate(e.target.value, something._id)}
                required
              />
              <Button className="ms-1" variant="primary" size="sm" type="submit">
                Update
              </Button>
            </Form>

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
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="ms-5 mt-3" variant="primary" type="submit">
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

// There are two main types of props in next.js, static and server-side
// Use server-side for updates every request!
export async function getServerSideProps() {
  const req = await fetch("https://genericapi.herokuapp.com/something/");
  const data = await req.json();

  // First turns an array of objects into an array of ids
  // then converts that array into a single object with properties
  const idObject = data.map(s => s._id).reduce((a, v) => ({ ...a, [v]: ''}), {});

  return {
    props: { 
      something: data,
      initialFieldState: idObject
    }
  };
}
