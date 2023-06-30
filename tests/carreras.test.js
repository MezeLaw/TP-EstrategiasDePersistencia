const request = require("supertest");
const app = require("../index.js");
const requestApi = request(app);
const { before } = require("mocha");
const ksuid = require('ksuid');

describe("- Tests Carrera endpoints -", () => {
  let authToken;
  // Realiza la autenticación y obtén el token antes de ejecutar los tests
  before(async () => {
    // Datos de usuario de prueba para obtener el token
    const loginData = {
      email: "test@test.com",
      password: "password",
    };

    const response = await requestApi
      .post("/auth/")
      .send(loginData)
      .set("Accept", "application/json")
      .expect(200);

    authToken = response.body.access_token; // Almacena el token de autenticación para usarlo en los tests

    console.log = () => {};
  });  
  
  it("GET /carreras - response OK", async () => {
    await requestApi
      .get("/carreras/")
      .set("Accept", "application/json")
      .expect(200);
  });

  it("GET /carreras/:id - response OK", async () => {

    const ksuidValor = ksuid.randomSync().toString();
    const ksuidConPrefijo = 'Carrera-' + ksuidValor;

    const carreraData = {
      name: ksuidConPrefijo
    };
    const response = await requestApi
        .post("/carreras")
        .send(carreraData)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(200);

    await requestApi
      .get(`/carreras/${response.body.id}`)
      .set("Accept", "application/json")
      .expect(200);
  });

  it("GET /carreras/:id - response 404 cuando la carrera no existe", async () => {
    await requestApi
      .get("/carreras/999")
      .set("Accept", "application/json")
      .expect(404);
  });


  it("POST /carreras - crea una nueva carrera", async () => {
    const ksuidValor = ksuid.randomSync().toString();
    const ksuidConPrefijo = 'Carrera-' + ksuidValor;

    const carreraData = {
      name: ksuidConPrefijo
    };

    await requestApi
      .post("/carreras")
      .send(carreraData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
  });


  it("DELETE /carreras/:id - elimina una carrera existente", async () => {

    const ksuidValor = ksuid.randomSync().toString();
    const ksuidConPrefijo = 'Carrera-' + ksuidValor;

    const carreraData = {
      name: ksuidConPrefijo
    };

    const response = await requestApi
      .post("/carreras")
      .send(carreraData)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);

    await requestApi
      .delete(`/carreras/${response.body.id}`)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200);
  });


  it("DELETE /carreras/:id - response 404 cuando la carrera no existe", async () => {
    await requestApi
      .delete("/carreras/999")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(404);
  });
});

