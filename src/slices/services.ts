import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import type { Service } from '../types';
import mockService from '../mockService.json';

export interface ServicesState {
  activeService: any | undefined;
  services: any[];
}

const initialState: ServicesState = {
  activeService: undefined,
  services: [mockService],
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setActiveService: (state, action: PayloadAction<Service>) => {
      state.activeService = action.payload;
    },
  }
});

export const { setActiveService } = servicesSlice.actions;

export const selectActiveService = (state: RootState) => state.services.activeService;
export const selectServices = (state: RootState) => state.services.services;

export default servicesSlice.reducer;