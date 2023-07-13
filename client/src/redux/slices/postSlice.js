import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body, thunkAPI) => {
        try {
            const result = await axiosClient.post("/user/getUserProfile", body);
            return result.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

export const likeandUnlikePost = createAsyncThunk(
    "post/like",
    async (body, thunkAPI) => {
        try {
            const result = await axiosClient.post("/posts/like", body);
            return result.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const postSlice = createSlice({
    name: "postSlice",
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            .addCase(likeandUnlikePost.fulfilled, (state, action) => {
                const post = action.payload.post;
                const index = state?.userProfile?.posts?.findIndex(
                    (item) => item._id === post._id
                );
                if (index!=undefined && index != -1) {
                    state.userProfile.posts[index] = post;
                }
            });
    },
});

export default postSlice.reducer;
