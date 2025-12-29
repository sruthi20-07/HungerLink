import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { SurplusReport, SurplusFilters, SurplusForm } from '@/types';
import { surplusAPI } from '@/services/api';

interface SurplusState {
  reports: SurplusReport[];
  currentReport: SurplusReport | null;
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  } | null;
  filters: SurplusFilters;
}

const initialState: SurplusState = {
  reports: [],
  currentReport: null,
  loading: false,
  error: null,
  pagination: null,
  filters: {
    page: 1,
    limit: 20,
    sort: 'availableUntil',
    order: 'asc',
  },
};

// Async thunks
export const fetchSurplusReports = createAsyncThunk(
  'surplus/fetchReports',
  async (filters: SurplusFilters, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.getSurplusReports(filters);
      return {
        reports: response.data,
        pagination: response.pagination,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch surplus reports');
    }
  }
);

export const fetchSurplusById = createAsyncThunk(
  'surplus/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.getSurplusById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch surplus report');
    }
  }
);

export const createSurplusReport = createAsyncThunk(
  'surplus/create',
  async (surplusData: SurplusForm, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.createSurplusReport(surplusData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create surplus report');
    }
  }
);

export const updateSurplusReport = createAsyncThunk(
  'surplus/update',
  async ({ id, data }: { id: string; data: Partial<SurplusForm> }, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.updateSurplusReport(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update surplus report');
    }
  }
);

export const claimSurplus = createAsyncThunk(
  'surplus/claim',
  async ({ id, notes }: { id: string; notes?: string }, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.claimSurplus(id, { notes });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to claim surplus');
    }
  }
);

export const completeSurplus = createAsyncThunk(
  'surplus/complete',
  async ({ 
    id, 
    actualQuantityCollected, 
    notes 
  }: { 
    id: string; 
    actualQuantityCollected?: string; 
    notes?: string; 
  }, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.completeSurplus(id, {
        actualQuantityCollected,
        notes,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to complete surplus pickup');
    }
  }
);

export const cancelSurplus = createAsyncThunk(
  'surplus/cancel',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await surplusAPI.cancelSurplus(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel surplus report');
    }
  }
);

const surplusSlice = createSlice({
  name: 'surplus',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<SurplusFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateReportInList: (state, action: PayloadAction<SurplusReport>) => {
      const index = state.reports.findIndex(report => report._id === action.payload._id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
    addNewReport: (state, action: PayloadAction<SurplusReport>) => {
      state.reports.unshift(action.payload);
    },
    removeReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(report => report._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Fetch surplus reports
    builder
      .addCase(fetchSurplusReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurplusReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchSurplusReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch surplus by ID
    builder
      .addCase(fetchSurplusById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSurplusById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReport = action.payload;
        state.error = null;
      })
      .addCase(fetchSurplusById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create surplus report
    builder
      .addCase(createSurplusReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSurplusReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports.unshift(action.payload);
        state.error = null;
      })
      .addCase(createSurplusReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update surplus report
    builder
      .addCase(updateSurplusReport.fulfilled, (state, action) => {
        const index = state.reports.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
        if (state.currentReport?._id === action.payload._id) {
          state.currentReport = action.payload;
        }
      });

    // Claim surplus
    builder
      .addCase(claimSurplus.fulfilled, (state, action) => {
        const index = state.reports.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
        if (state.currentReport?._id === action.payload._id) {
          state.currentReport = action.payload;
        }
      });

    // Complete surplus
    builder
      .addCase(completeSurplus.fulfilled, (state, action) => {
        const index = state.reports.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
        if (state.currentReport?._id === action.payload._id) {
          state.currentReport = action.payload;
        }
      });

    // Cancel surplus
    builder
      .addCase(cancelSurplus.fulfilled, (state, action) => {
        const index = state.reports.findIndex(report => report._id === action.payload._id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
        if (state.currentReport?._id === action.payload._id) {
          state.currentReport = action.payload;
        }
      });
  },
});

export const {
  setFilters,
  clearCurrentReport,
  clearError,
  updateReportInList,
  addNewReport,
  removeReport,
} = surplusSlice.actions;

export default surplusSlice.reducer;