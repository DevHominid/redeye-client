import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { Service } from '../common/types';
// import mockService from '../mockService.json';

export type ActiveService = Service | undefined;

export interface ServicesState {
  activeService: ActiveService;
  services: any[];
}

const initialState: ServicesState = {
  activeService: undefined,
  services: [],
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setActiveService: (state, action: PayloadAction<ActiveService>) => {
      state.activeService = action.payload;
    },
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;
    }
  }
});

export const { setActiveService, setServices } = servicesSlice.actions;

export const selectActiveService = (state: RootState) => state.services.activeService;
export const selectServices = (state: RootState) => state.services.services;

export default servicesSlice.reducer;
