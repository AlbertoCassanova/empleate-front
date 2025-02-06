import { MapCameraChangedEvent, Map } from "@vis.gl/react-google-maps"

const MapContainer = () => {
    return (
        <div>
            <Map
                className="w-screen h-screen"
                defaultZoom={13}
                defaultCenter={{ lat: -12.152010575607147, lng: -77.01300775041199 }}
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                }>
            </Map>
        </div>
    )
}

export default MapContainer