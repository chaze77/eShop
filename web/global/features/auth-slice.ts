import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import { registerAccount, signIn, fetchUser, logout } from '@/lib/auth';

export type AuthUser = {
  $id: string;
  email: string;
  name?: string;
};

interface AuthState {
  user: AuthUser | null;
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  isAuthenticated: false,
};

export const getCurrentUserThunk = createAsyncThunk<
  AuthUser | null,
  void,
  { rejectValue: string }
>('auth/fetchUser', async () => {
  const user = await fetchUser();
  return user
    ? ({ $id: user.$id, email: user.email, name: user.name } as AuthUser)
    : null;
});

export const signInThunk = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    await signIn(email, password);
    const user = await fetchUser();
    if (!user) return rejectWithValue('Sign-in succeeded, but user missing');
    return { $id: user.$id, email: user.email, name: user.name } as AuthUser;
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Sign-in failed');
  }
});

export const registerThunk = createAsyncThunk<
  AuthUser,
  { email: string; password: string; accountName: string },
  { rejectValue: string }
>(
  'auth/register',
  async ({ email, password, accountName }, { rejectWithValue }) => {
    try {
      await registerAccount(email, password, accountName);
      await signIn(email, password);
      const user = await fetchUser();
      if (!user)
        return rejectWithValue('Registration succeeded, but user missing');
      return { $id: user.$id, email: user.email, name: user.name } as AuthUser;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Registration failed');
    }
  }
);

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await logout();
  } catch (e: any) {
    return rejectWithValue(e?.message ?? 'Logout failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = Boolean(action.payload);
      state.status = 'succeeded';
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
    setStatus: (state, action: PayloadAction<AuthState['status']>) => {
      state.status = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      if (action.payload) state.status = 'failed';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(getCurrentUserThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
        state.isAuthenticated = Boolean(payload);
        state.error = null;
      })
      .addCase(getCurrentUserThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Failed to fetch user';
      })
      .addCase(signInThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
        state.isAuthenticated = Boolean(payload);
        state.error = null;
      })
      .addCase(signInThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Sign-in failed';
      })
      .addCase(registerThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
        state.isAuthenticated = Boolean(payload);
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Registration failed';
      })
      .addCase(logoutThunk.pending, (state) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload ?? 'Logout failed';
      });
  },
});

export const { setUser, clearUser, setStatus, setError } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
