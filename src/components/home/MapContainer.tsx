import { Map, MapMouseEvent, Marker } from "@vis.gl/react-google-maps"
import { useEffect, useState } from "react";
import Directions from "../ui/Directions";
import { Location, useLocation, useParams, useSearchParams } from "react-router-dom";
import ModalUI from "../ui/ModalUI";
import { useMutation } from "@apollo/client";
import { UPDATE_NEGOCIO_LOCATION } from "../../graphql/Negocios.queries";

const mapStyle: google.maps.MapTypeStyle[] = [
    {
        featureType: "poi",
        elementType: "all",
        stylers: [
            {
                visibility: "off",
            },
        ],
    },
];

type PlaceType = {
    latitude: number | undefined,
    longitude: number | undefined
}

const MapContainer = (): JSX.Element => {
    const location : Location = useLocation();
    let params = useParams();
  
    const [setNegocioLocation] = useMutation(UPDATE_NEGOCIO_LOCATION);
    const [place, setPlace] = useState<PlaceType>();
    const searchParams = useSearchParams();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [lat, setLat] = useState<number>();
    const [long, setLong] = useState<number>();
    useEffect(() => {
        console.log(navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLong(longitude);
        },
            (error) => {
                console.error('Error getting geolocation:', error);
            }));
    }, [])

    const handleMapClick = (e: MapMouseEvent) : void =>   {
        if (location.pathname.split('/').length > 2){
            switch(params.option) {
                case "setbusinesspos":
                    let coordenadas : PlaceType = {
                        latitude: e.detail.latLng?.lat,
                        longitude: e.detail.latLng?.lng
                    };
                    setPlace(coordenadas);
                    setOpenModal(true);
                    break;
                default: break;
            }
        }
    }
    const handleSetBusinessPos = async() => {
        if (params.id) {
            const rs = await setNegocioLocation({ variables: { token: localStorage.getItem('token'), businessId: Number.parseFloat(params.id), latitude: place?.latitude, longitude: place?.longitude}})
            if (rs.data.updateNegocioLocation[0].code) {
                window.location.href = '/map';
            }
        }
    }
    return (
        <div>
            <Map
                styles={mapStyle}
                className="h-screen w-screen md:w-[80vw]"
                defaultZoom={13}
                defaultCenter={{ lat: -12.152010575607147, lng: -77.01300775041199 }}
                onClick={(e) => handleMapClick(e)}
            >
                {lat && long && (
                    <Marker
                        position={{ lat: lat, lng: long }}
                    />
                )}
                {/*<Directions />*/}
            </Map>
            <ModalUI
                open={openModal}
                setOpen={setOpenModal}
            >
                <div>
                    <h2>¿Desea colocar su negocio en esta ubicacion?</h2>
                    <div className="flex">
                        <button className="px-2 bg-green-400 mr-1 my-1 rounded-sm" onClick={handleSetBusinessPos}>Si</button>
                        <button className="px-2 bg-red-400 m-1 rounded-sm cursor-pointer" onClick={()=>setOpenModal(false)}>No</button>
                    </div>
                </div>
            </ModalUI>
        </div>
    )
}

export default MapContainer;