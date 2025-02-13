import { useEffect, useState } from "react";

// Graphql
import { OperationVariables, useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_NEGOCIO, GET_NEGOCIOS } from "../graphql/Negocios.queries";

// Redux
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import { setNegocios } from "../app/feature/negocios/NegocioSlice";

// Icons
import { FaTools, FaMapMarked, FaPlus } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import ModalUI from "../components/ui/ModalUI";
import { Link } from "react-router-dom";

const BusinessView = () => {
    document.title = "Negocios";
    // UI
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Redux
    const dispatch = useDispatch();
    const negocios = useAppSelector((state) => state.negocios);

    // Apollo
    const [getNegocio] = useLazyQuery<any, OperationVariables>(GET_NEGOCIOS);
    const [createNegocio] = useMutation(CREATE_NEGOCIO);

    // Form
    const [nombreNegocio, setNombreNegocio] = useState<string>("");

    const queryNegocios = async () => {
        const rs = await getNegocio({ variables: { token: localStorage.getItem("token") } });
        dispatch(setNegocios(rs.data.getNegocios[0]))
    }
    const crearNegocio = async () => {
        if (nombreNegocio == "") {
            alert("El nombre del negocio no debe estar en blanco")
        }
        else {
            const rs = await createNegocio({variables: { token: localStorage.getItem("token"), negocio: { nombre: nombreNegocio}}})
            if (rs.data.createNegocio[0].code == 200){
                window.location.reload();
            }
            else {
                alert("Ha ocurrido un error")
            }
        }
    }
    useEffect(() => {
        queryNegocios();
        console.log(negocios.negocio);

    }, [negocios.cantidad])
    return (
        <>
            <div className="p-2 pl-4">{
                negocios.cantidad == 0 ? (
                    <div>
                        <div>
                            No tiene ningún negocio creado
                        </div>
                        <div>
                            <button 
                                className="flex p-1 m1 bg-green-400 rounded-md cursor-pointer"
                                onClick={() => setOpenModal(!openModal)}
                                type="button"
                            >
                                <FaPlus />
                                <span>Crear negócio</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <h2 className="text-xl">Mis negocios</h2>
                        <div>
                            {negocios.negocio.map((e, key: number) =>(
                                <div 
                                    className="shadow-lg rounded-md bg-gray-100 p-2 w-sm"
                                    key={key}
                                >
                                    <div>
                                        {e.nombre}
                                        <span>{e.verificado && <RiVerifiedBadgeFill/>}</span>
                                    </div>
                                    <div>
                                        <button className="flex hover:bg-green-300 bg-green-400 rounded-md items-center p-1 my-1">
                                            <FaTools />
                                            <span>Administrar negocio</span>
                                        </button>
                                        <Link to={`/map/setbusinesspos/${e.id}`}>
                                            <button
                                                className="flex cursor-pointer hover:bg-blue-300 bg-blue-500 rounded-md p-1 items-center"
                                            >
                                                <FaMapMarked />
                                                <span>Posiciona tu negocio en el mapa</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            </div>
            <ModalUI open={openModal} setOpen={setOpenModal}>
                <div>
                    <h2>Crear negocio</h2>
                    <form>
                        <input 
                            type="text"
                            placeholder="Nombre"
                            className="focus:outline-none p-2 rounded-md border-[1px] border-gray-300"
                            onChange={(e) => setNombreNegocio(e.target.value)} 
                        />
                        <button
                            onClick={crearNegocio}
                            type="button"
                            className="text-white flex p-1 my-1 bg-green-400 rounded-md cursor-pointer"
                        >
                            Crear
                        </button>
                    </form>
                </div>
            </ModalUI>
        </>
    )
}

export default BusinessView