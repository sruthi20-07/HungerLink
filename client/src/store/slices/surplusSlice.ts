import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { surplusAPI } from '../../services/api';
import { SurplusReport, SurplusFilters, SurplusForm } from '../../types';

interface SurplusState {
  reports: SurplusReport[];
  loading: boolean;
}

const initialState: SurplusState = {
  reports: [],
  loading: false,
};

export const fetchReports = createAsyncThunk(
  'surplus/fetchReports',
  async () => {
    const res = await surplusAPI.getAll();
    return res.data;
  }
);

export const createReport = createAsyncThunk(
  'surplus/createReport',
  async (data: SurplusForm) => {
    const res = await surplusAPI.create(data);
    return res.data;
  }
);

const surplusSlice = createSlice({
  name: 'surplus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.reports.unshift(action.payload);
      });
  }
});

export default surplusSlice.reducer;
