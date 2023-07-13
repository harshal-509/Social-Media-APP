import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeandUnlikePost } from "./postSlice";
export const getFeedData = createAsyncThunk(
    "user/getUserProfile",
    async (body, thunkAPI) => {
        try {
            const result = await axiosClient.post("/user/getFeedData", body);
            return result.result;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

export const followAndUnfollowUser = createAsyncThunk(
    "user/follow",
    async (body, thunkAPI) => {
        try {
            const result = await axiosClient.post("/user/follow", body);
            return result.result;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
        feedData: {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedData.fulfilled, (state, action) => {
                state.feedData = action.payload;
            })
            .addCase(likeandUnlikePost.fulfilled, (state, action) => {
                const post = action.payload.post;
                const index = state.feedData.posts.findIndex(
                    (item) => item._id === post._id
                );
                if (index != undefined && index != -1) {
                    state.feedData.posts[index] = post;
                }
            })
            .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
                const user = action.payload.user;
                const index = state.feedData.followings.findIndex(
                    (item) => item._id === user._id
                );
                if (index != undefined && index != -1) {
                    state.feedData.followings.splice(index, 1);
                }
                else{
                    state.feedData.followings.push(user)
                }
            });
    },
});

export default feedSlice.reducer;
