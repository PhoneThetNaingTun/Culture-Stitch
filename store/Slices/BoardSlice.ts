import {
  DeleteBoardPayload,
  NewBoardPayload,
  UpdateBoardPayload,
  boardSlice,
} from "@/types/board";
import { Board } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: boardSlice = {
  boards: [],
  boardLoading: false,
};

export const CreateBoard = createAsyncThunk(
  "BoardSlice/CrateBoard",
  async (payload: NewBoardPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/boards`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { newBoard, message, error } = dataFromServer;
    newBoard ? thunkApi.dispatch(addNewBoard(newBoard)) : null;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);
export const UpdateBoard = createAsyncThunk(
  "BoardSlice/UpdateBoard",
  async (payload: UpdateBoardPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { onError, onSuccess } = payload;
    const response = await fetch(`/api/dashboard/boards`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedBoard, message, error, boards } = dataFromServer;
    updatedBoard && thunkApi.dispatch(editBoard(updatedBoard));
    boards && thunkApi.dispatch(setBoard(boards));
    message && onSuccess && onSuccess(message);
    error && onError && onError(error);
    thunkApi.dispatch(setLoading(false));
  }
);

export const DeleteBoard = createAsyncThunk(
  "BoardSlice/DeleteBoard",
  async (payload: DeleteBoardPayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { id, onSuccess, onError } = payload;
    const response = await fetch(`/api/dashboard/boards`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    message && thunkApi.dispatch(removeBoard(id));
    thunkApi.dispatch(setLoading(false));
  }
);

const BoardSlice = createSlice({
  name: "BoardSlice",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
    },
    addNewBoard: (state, action: PayloadAction<Board>) => {
      state.boards = [...state.boards, action.payload];
    },
    editBoard: (state, action: PayloadAction<Board>) => {
      state.boards = state.boards.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.boardLoading = action.payload;
    },
  },
});

export const { setBoard, setLoading, addNewBoard, editBoard, removeBoard } =
  BoardSlice.actions;
export default BoardSlice.reducer;
