const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const proxyquire = require("proxyquire");

const tokenRolDecoderStub = sinon.stub();
const getCarrerasStub = sinon.stub();
const getCarrerasByIDStub = sinon.stub();
const createCarreraStub = sinon.stub();
const deleteCarreraStub = sinon.stub();
const dummyToken = "Token";


const { getCarreras, getCarrerasByID, createCarrera, deleteCarrera, jwt } =
    proxyquire("./../../../controller/carreraController", {
        './../services/carreraService': {
            getCarreras: getCarrerasStub,
            getCarrera : getCarrerasByIDStub,
            createCarrera: createCarreraStub,
            deleteCarrera: deleteCarreraStub,
        },
        "../jwt": { getRolFromToken: tokenRolDecoderStub },
    });

describe("Test carreras controller", () => {
    beforeEach = () => {
        getCarrerasStub.resetHistory()
        getCarrerasStub.resetBehavior()
        getCarrerasByIDStub.resetHistory()
        getCarrerasByIDStub.resetBehavior()
        createCarreraStub.resetHistory()
        createCarreraStub.resetBehavior()
        deleteCarreraStub.resetHistory()
        deleteCarreraStub.resetBehavior()
        tokenRolDecoderStub.resetHistory()
        tokenRolDecoderStub.resetBehavior()
    };

    it("carrerasController - should return no results for getCarreras", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
        };

        const carrerasArray = [];
        getCarrerasStub.resolves(carrerasArray);

        const jsonMock = sinon.stub();
        jsonMock.returns(carrerasArray);

        const res = {
            json: jsonMock,
        };
        await getCarreras(req, res);
        chai.expect(res.json.firstCall.args[0]).to.be.eql([])

    });

    it("carrerasController - should return results for getCarreras", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
        };
        const carrera = { id: "1", name: "Taller de Persistencia",createAt: "30/06/2023", updatedAt: "30/06/2023", deletedAt: null}
        const carrerasArray = [carrera];
        getCarrerasStub.resolves(carrerasArray);

        const jsonMock = sinon.stub();
        jsonMock.returns(carrerasArray);

        const res = {
            json: jsonMock,
        };
        await getCarreras(req, res);
        chai.expect(res.json.firstCall.args[0]).to.be.eql(carrerasArray)

    });

    it("carrerasController - should return error for getCarreras", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
        };

        const errorMock = new Error('Error');
        getCarrerasStub.rejects(errorMock);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await getCarreras(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(500);
        }
    });

    it("carrerasController - should return error for getCarrerasByID", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            params:{
                id: 1,
            }
        };

        const errorMock = new Error('Error');
        getCarrerasByIDStub.rejects(errorMock);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await getCarrerasByID(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(500);
        }
    });

    it("carrerasController - should return no result for getCarrerasByID", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            params:{
                id: 1,
            }
        };

        getCarrerasByIDStub.resolves(false);

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await getCarrerasByID(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(404);
        }
    });

    it("carrerasController - should return result for getCarrerasByID", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            params:{
                id: 1,
            }
        };
        const carrera = { id: "1", name: "Taller de Persistencia",createAt: "30/06/2023", updatedAt: "30/06/2023", deletedAt: null}

        getCarrerasByIDStub.resolves(carrera);

        const jsonMock = sinon.stub();
        jsonMock.returns(carrera);

        const res = {
            json: jsonMock,
        };

        try {
            await getCarrerasByID(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(200);
        }
    });

    it("carrerasController - should return result for createCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            body: {
                name: "Taller de Persistencia"
           }
        };
        const carrera = { id: "1", name: "Taller de Persistencia",createAt: "30/06/2023", updatedAt: "30/06/2023", deletedAt: null}

        createCarreraStub.resolves(carrera);
        tokenRolDecoderStub.resolves("ADMIN");
        const jsonMock = sinon.stub();
        jsonMock.returns(carrera);

        const res = {
            json: jsonMock,
        };

        try {
            await createCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(200);
        }
    });


    it("carrerasController - should return unauthorized for createCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            body: {
                name: "Taller de Persistencia"
            }
        };

        tokenRolDecoderStub.resolves("USER_COMUN");

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await createCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(401);
        }
    });

    it("carrerasController - should return error for createCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            body: {
                name: "Taller de Persistencia"
            }
        };

        const errorMock = new Error('Error');
        createCarreraStub.rejects(errorMock);

        tokenRolDecoderStub.resolves("ADMIN");

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await createCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(500);
        }
    });


    it("carrerasController - should delete successfully for deleteCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            params: {
                id: "1"
            },
            body: {
                name: "Taller de Persistencia"
            }
        };
        const carrera = { id: "1", name: "Taller de Persistencia",createAt: "30/06/2023", updatedAt: "30/06/2023", deletedAt: null}

        getCarrerasByIDStub.resolves(carrera);
        deleteCarreraStub.resolves(carrera)
        tokenRolDecoderStub.resolves("ADMIN");

        const jsonMock = sinon.stub();
        jsonMock.returns(carrera);

        const res = {
            status: sinon.stub().returnsThis(),
            json: jsonMock,
        };

        try {
            await deleteCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(200);
        }
    });


    it("carrerasController - should return unauthorized for deleteCarrera", async () => {

        const req = {
            headers: {
                authorization: dummyToken,
            },
            params: {
                id: "1"
            },
            body: {
                name: "Taller de Persistencia"
            }
        };

        tokenRolDecoderStub.resolves("USER_COMUN");

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await deleteCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(401);
        }
    });

    it("carrerasController - should return error for deleteCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            body: {
                name: "Taller de Persistencia"
            },
            params: {
                id: "1"
            }
        };

        const errorMock = new Error('Error');
        deleteCarreraStub.rejects(errorMock);
        tokenRolDecoderStub.resolves("ADMIN");

        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        try {
            await deleteCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(500);
        }
    });

    it("carrerasController - should return not found for deleteCarrera", async () => {
        const req = {
            headers: {
                authorization: dummyToken,
            },
            body: {
                name: "Taller de Persistencia"
            },
            params: {
                id: "1"
            }
        };

        getCarrerasByIDStub.resolves(false);
        tokenRolDecoderStub.resolves("ADMIN");
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };
        try {
            await deleteCarrera(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(404);
        }
    });

});
