import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuthUser } from '@/lib/apis/auth';
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '@/lib/apis/auth';

export const fetchCurrentUser = createAsyncThunk<AuthUser | null>(
  'auth/fetchCurrentUser',
  async () => {
    const user = await getCurrentUser();
    return user;
  }
);

export const loginThunk = createAsyncThunk<
  AuthUser,
  { email: string; password: string }
>('auth/login', async ({ email, password }) => {
  const user = await loginUser(email, password);
  return user;
});

export const registerThunk = createAsyncThunk<
  AuthUser,
  { email: string; password: string; name?: string }
>('auth/register', async ({ email, password, name }) => {
  const user = await registerUser({ email, password, name });
  return user;
});

export const logoutThunk = createAsyncThunk<void>('auth/logout', async () => {
  await logoutUser();
});

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCurrentUser
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<AuthUser | null>) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isAuthenticated = Boolean(action.payload);
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.error.message ?? 'Не удалось получить пользователя';
        state.user = null;
        state.isAuthenticated = false;
      })
      // login
      .addCase(loginThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка входа';
        state.user = null;
        state.isAuthenticated = false;
      })
      // register
      .addCase(registerThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка регистрации';
      })
      // logout
      .addCase(logoutThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Ошибка выхода';
      });
  },
});

export default authSlice.reducer;
