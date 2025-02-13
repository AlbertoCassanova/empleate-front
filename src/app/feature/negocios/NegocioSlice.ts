import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../store';

type NegocioType = {
    id: number,
    nombre: string,
    verificado: boolean
}

interface NegocioState {
    cantidad: number | null,
    negocio: Array<NegocioType> 
}

const initialState : NegocioState = {
    cantidad: null,
    negocio: []
}

export const negocioSlice = createSlice({
    name: "negocios",
    initialState,
    reducers: {
        setNegocios: (state, action : PayloadAction<NegocioState>) => {
            state.cantidad = action.payload.cantidad;
            state.negocio = action.payload.negocio;
        }
    }
})

export const { setNegocios } = negocioSlice.actions;
export const selectNegocios = (state: RootState) => state.negocios;
export default negocioSlice.reducer;