import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

const Directions = () => {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
    const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes[routeIndex];
    const leg = selected?.legs[0];

    // Initialize directions service and renderer
    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(
            new routesLibrary.DirectionsRenderer({
                draggable: true, // Only necessary for draggable markers
                map
            })
        );
    }, [routesLibrary, map]);

    // Add the following useEffect to make markers draggable
    useEffect(() => {
        if (!directionsRenderer) return;

        // Add the listener to update routes when directions change
        const listener = directionsRenderer.addListener(
            'directions_changed',
            () => {
                const result = directionsRenderer.getDirections();
                if (result) {
                    setRoutes(result.routes);
                }
            }
        );

        return () => google.maps.event.removeListener(listener);
    }, [directionsRenderer]);

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService
            .route({
                origin: 'Surco, Camino Real, Perú',
                destination: 'Surco, Av. Jorge Chávez, Perú',
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            })
            .then(response => {
                directionsRenderer.setDirections(response);
                setRoutes(response.routes);
            });

        return () => directionsRenderer.setMap(null);
    }, [directionsService, directionsRenderer]);

    // Update direction route
    useEffect(() => {
        if (!directionsRenderer) return;
        directionsRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionsRenderer]);

    if (!leg) return null;

    return (
        <div className="directions">
            <h2>{selected.summary}</h2>
            <p>
                {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
            </p>
            <p>Distance: {leg.distance?.text}</p>
            <p>Duration: {leg.duration?.text}</p>

            <h2>Other Routes</h2>
            <ul>
                {routes.map((route, index) => (
                    <li key={route.summary}>
                        <button onClick={() => setRouteIndex(index)}>
                            {route.summary}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Directions;