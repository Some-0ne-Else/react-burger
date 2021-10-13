import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import store from '../store/store';
import { TAppActions } from '../services/actions/appActions';
import { TFormActions } from '../services/actions/formActions';
import { TModalActions } from '../services/actions/modalActions';
import { TUserActions } from '../services/actions/userActions';
import { TWsActions } from '../services/actions/wsActions';

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = typeof store.dispatch & AppThunk;
export type TApplicationActions =
| TAppActions
| TFormActions
| TModalActions
| TUserActions
| TWsActions;
