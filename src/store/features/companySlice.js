import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("company");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch companies");
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyList: [],
    selectedCompany: null,
    companyLoader: false,
    companyError: null,
  },
  reducers: {
    setSelectedCompany: (state, action) => {
      state.selectedCompany = action.payload;
    },
    clearCompanies: (state) => {
      state.companyList = [];
      state.selectedCompany = null;
      state.companyError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.companyLoader = true;
        state.companyError = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companyLoader = false;
        state.companyList = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.companyLoader = false;
        state.companyError = action.payload;
      });
  },
});

export const { setSelectedCompany, clearCompanies } = companySlice.actions;

export default companySlice.reducer;
