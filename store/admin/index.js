import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    productsList:[]
}

export const addNewProduct = createAsyncThunk('/products/addProduct',
    async(FormData)=>{
        const response = await axios.post('http:localhost:5000/api/admin/products/addProduct',FormData,
            {
                headers:{
                    "Content-Type":"application/json"
                },
            })
            return response?.data;
    });
export const fetchProductAdmin = createAsyncThunk('/products/list',
    async()=>{
        const response = await axios.get('http:localhost:5000/api/admin/products/list');
            return response?.data;
    });
export const editProduct = createAsyncThunk('/products/edit',
    async(id,FormData)=>{
        const response = await axios.put(`http:localhost:5000/api/admin/products/edit/${id }`,FormData,
            {
                headers:{
                    "Content-Type":"application/json"
                },
            })
            return response?.data;
    });
export const deleteProduct = createAsyncThunk('/products/delete',
    async(id,FormData)=>{
        const response = await axios.delete(`http:localhost:5000/api/admin/products/delete/${id}`,FormData,
            {
                headers:{ 
                    "Content-Type":"application/json"
                },
            })
            return response?.data;
    });   

const AdminProductsSlice = createSlice({
    name: "adminProductSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProductAdmin.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchProductAdmin.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.productsList = action.payload
        }).addCase(fetchProductAdmin.rejected,(state,action)=>{
            state.isLoading = false,
            state.productsList =[]
        })

    }
})
export default AdminProductsSlice.reducer