// Redux
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../app/hooks";

// Utils
import { capitalize } from "../utils/strings";

// Components
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import ModalUI from "../components/ui/ModalUI";

// Apollo
import { UPDATE_PROFILE_PHOTO, UPDATE_USER } from "../graphql/User.queries";
import { useMutation } from "@apollo/client";
import { PHONE_CODE } from "../utils/constants";

const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT || "";

const ConfigView = (): JSX.Element => {
  document.title = "Configuración";
  // UI
  const fileInputRef : any = useRef();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editarPerfil, setEditarPerfil] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>("Por favor complete su perfil");

  // Apollo
  const [updateUser] = useMutation(UPDATE_USER);
  const [uploadFile] = useMutation(UPDATE_PROFILE_PHOTO);

  // Redux
  const user = useAppSelector((state) => state.user);

  // Form
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  // @ts-ignore
  const [file, setFile] = useState(null);

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
  const handleChange = async(e : any) =>{
    const file = e.target.files[0];
    setFile(file);
    if (!file) return alert("Selecciona un archivo primero");
    try {
      const { data } = await uploadFile({ variables: {token: localStorage.getItem('token'), file: file } });
      if (data.updaetProfilePhoto[0].code == 200) {
        window.location.reload();
      }
      else {
        alert("Ha ocurrido un error inesperado");
      }
    } catch (error) {
      console.error("Error subiendo el archivo", error);
    }
  }
  return (
    <>
      <div className="py-2 px-4 w-available">
        <div className="md:justify-items-start justify-items-center md:flex block">
          <img
            src={`${
              user.fotoPerfil != null && user.fotoPerfil ? API_ENDPOINT + "/media/" + user.id  + "/" + user.fotoPerfil  : "/img/empty_avatar.png"}`}
            alt="avatar"
            className="w-30 rounded-full"
          />
          <input
            onChange={handleChange}
            multiple={false}
            // @ts-ignore
            ref={fileInputRef}
            type='file'
            hidden
            accept=".jpg, .jpeg, .png"
          />
          <MdOutlineFileUpload 
            onClick={() => fileInputRef.current.click()}
            title="Cambiar imagen"
            className="cursor-pointer absolute -top-[-15vh] text-2xl rounded-full border-[1px] bg-white w-8 h-8 border-dark-purple sm:visible max-md:hidden"
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
          {editarPerfil == true ? (
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
                  <span className="p-[1px] rounded-l-md bg-gray-100 border-l-[1px] border-y-[1px] border-gray-400 border-r-0">{PHONE_CODE()}</span>
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
          ) : (
            <div className="pt-2">
              <div>
                <h2>Información de tu perfil</h2>
              </div>
              <div className="flex flex-col">
                <span>Fecha de nacimiento: {user.fechaNacimiento}</span>
                <span>Teléfono: {user.telefono}</span>
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

export default ConfigView;