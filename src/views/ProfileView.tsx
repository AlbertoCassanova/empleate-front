// Redux
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";

// Utils
import { capitalize } from "../utils/strings";

// Components
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import ModalUI from "../components/ui/ModalUI";

// Apollo
import { UPDATE_USER } from "../graphql/User.queries";
import { useMutation } from "@apollo/client";

const ProfileView = (): JSX.Element => {
  // UI
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editarPerfil, setEditarPerfil] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("Por favor complete su perfil");

  // Apollo
  const [updateUser] = useMutation(UPDATE_USER);

  // Redux
  const user = useAppSelector((state) => state.user);

  // Form
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");

  useEffect(()=> {
    if (user.editado == false) {
      setOpenModal(true);
      setEditarPerfil(true);
    }
  },[user.editado])

  const update = async() : Promise<void> => {
    if (fechaNacimiento == "" || documento == "" || sexo == "" || telefono == "") {
      setMensaje("Debe rellenar todos los campos");
      setOpenModal(true);
    }
    else {
      const rs = await updateUser({variables: { 
        token: localStorage.getItem('token'),
        newData: {
          fechaNacimiento: fechaNacimiento,
          documento: documento,
          sexo: sexo,
          telefono: "+51" + telefono
        }
      }});
      if (rs.data.updateUser[0].code == 200) {
        window.location.reload();
      }
      else {
        setMensaje("Ha ocurrido un error");
        setOpenModal(true)
      }
    }
  }
  return (
    <>
      <div className="py-2 px-4 w-available">
        <div className="md:justify-items-start justify-items-center md:flex block">
          <img
            src={`/img/empty_avatar.png`}
            alt="avatar"
            className="w-32"
          />
          <MdOutlineFileUpload 
            title="Cambiar imagen"
            className="cursor-pointer absolute -top-[-17vh] text-2xl rounded-full border-[1px] bg-white w-8 h-8 border-dark-purple"
          />
          <div className="self-center pl-2 text-3xl flex">
            {capitalize(user.firstName)} {capitalize(user.lastName)}{" "}
            <FaPencilAlt className="text-md ml-2 text-white hover:text-dark-purple cursor-pointer" title="Eitar" />
          </div>
          <div className="visible md:hidden py-2">
            <button 
              className={`text-2xl bg-blue-400 rounded-md p-2 shadow-md text-white ${editarPerfil ? "hidden" : "visible"}`}
            >
              Editar
            </button>
          </div>
        </div>
        <div>
          {editarPerfil && (
            <div>
              <div>
                <span>Fecha de nacimiento</span>
                <input
                  type="date"
                  className="p-1 m-1 bg-gray-100 rounded-md border-[1px] border-gray-400 focus:outline-none"
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <div>
                <span>Número de documento</span>
                <input
                  onChange={(e) => setDocumento(e.target.value)}
                  type="number"
                  min={1}
                  className="p-1 m-1 bg-gray-100 rounded-md border-[1px] border-gray-400"
                />
              </div>
              <div>
                <span>Sexo</span>
                <select 
                  className="p-1 m-1 bg-gray-100 rounded-md border-[1px] border-gray-400"
                  onChange={(e) => setSexo(e.target.value)}
                >
                  <option value="">--</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>
              <div className="flex">
                <span>Teléfono</span>
                <div className="ml-1">
                  <span className="p-[1px] rounded-l-md bg-gray-100 border-l-[1px] border-y-[1px] border-gray-400 border-r-0">+51</span>
                  <input
                    onChange={(e) => setTelefono(e.target.value)}
                    type="number"
                    min={0}
                    className="bg-gray-100 focus:outline-none rounded-r-md border-[1px] border-gray-400 w-[16vh]"
                  />
                </div>
              </div>
              <div>
                <button
                  className="bg-green-400 p-2 my-2 rounded-md text-white shadow-md cursor-pointer hover:bg-green-300 duration-200"
                  onClick={update}
                >
                  Guardar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalUI open={openModal} setOpen={setOpenModal}>
        <div>
          <h2>{mensaje}</h2>
        </div>
      </ModalUI>
    </>
  )
}

export default ProfileView;