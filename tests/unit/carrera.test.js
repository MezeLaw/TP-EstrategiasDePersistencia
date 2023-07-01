const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const sinon = require("sinon");
const proxyquire = require("proxyquire");


const tokenRolDecoderStub = sinon.fake.resolves({ rol: "ADMIN" });
const getCarrerasStub = sinon.stub();
const getCarrerasStubResult = sinon.stub();
const carreraStub = sinon.stub();
const dummyToken = "Token";


const { getCarreras, jwt } =
    proxyquire("./../../controller/carreraController", {
        './../services/carreraService': {
            getCarreras: getCarrerasStub
        },
        "../jwt": { jwtMiddleware: tokenRolDecoderStub },
    });

describe("Test carreras controller", () => {
    beforeEach = () => {
        getCarrerasStub.resetHistory()
        getCarrerasStub.resetBehavior()
        carreraStub.resetHistory()
        getCarrerasStubResult.resetHistory()
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
            status: 500,
        };
        try {
            await getCarreras(req, res);
        } catch (error) {
            chai.expect(res.status).to.be.eql(500);
        }
    });
});
