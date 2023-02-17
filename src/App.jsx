import React from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";



const data = [
  { id: 1, pelicula: "Test 1", year: "Test 1", director: "Test 1", genre: "Test 1", language: "Test 1"},
  { id: 2, pelicula: "Test 2", year: "Test 2", director: "Test 2", genre: "Test 2", language: "Test 2"},
  { id: 3, pelicula: "Test 3", year: "Test 3", director: "Test 3", genre: "Test 3", language: "Test 3"},
  { id: 4, pelicula: "Test 4", year: "Test 4", director: "Test 4", genre: "Test 4", language: "Test 4" },
  { id: 5, pelicula: "Test 5", year: "Test 5", director: "Test 5", genre: "Test 5", language: "Test 5"},
  { id: 6, pelicula: "Test 6", year: "Test 6", director: "Test 6", genre: "Test 6", language: "Test 6"},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      pelicula: "",
      year: "",
      director: "",
      genre: "",
      language: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].pelicula = dato.pelicula;
        arreglo[contador].year = dato.year;
        arreglo[contador].director = dato.director;
        arreglo[contador].genre = dato.genre;
        arreglo[contador].language = dato.language;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Are you sure do you want to delete? "+ dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>New Movie</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Movie</th>
                <th>Year</th>
                <th>Director</th>
                <th>Genres</th>
                <th>Language</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.pelicula}</td>
                  <td>{dato.year}</td>
                  <td>{dato.director}</td>
                  <td>{dato.genre}</td>
                  <td>{dato.language}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Edit
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Year: 
              </label>
              <input
                className="form-control"
                name="year"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.year}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Director: 
              </label>
              <input
                className="form-control"
                name="director"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.director}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Genre: 
              </label>
              <input
                className="form-control"
                name="genre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.genre}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Language: 
              </label>
              <input
                className="form-control"
                name="language"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.language}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insert Movie</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Year: 
              </label>
              <input
                className="form-control"
                name="year"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Director: 
              </label>
              <input
                className="form-control"
                name="director"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Genre: 
              </label>
              <input
                className="form-control"
                name="genre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Language: 
              </label>
              <input
                className="form-control"
                name="language"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

        
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insert
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;


