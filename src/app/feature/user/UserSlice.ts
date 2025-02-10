import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface UserState {
    firstName: string,
    lastName: string,
    sexo: string,
    editado: boolean | null,
    fotoPerfil: String | null
    id: number
};

const initialState: UserState = {
    firstName: "",
    lastName: "",
    sexo: "",
    editado: null,
    fotoPerfil: null,
    id: 0
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.firstName = action.payload.nombre;
            state.lastName = action.payload.apellido;
            state.sexo = action.payload.sexo || "";
            state.editado = action.payload.editado;
            state.fotoPerfil = action.payload.fotoPerfil || null,
            state.id = action.payload.id
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;