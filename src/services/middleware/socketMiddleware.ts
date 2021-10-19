import { getCookie } from '../../utils/utils';
import { ACCESS_TOKEN, SYMBOLS_TO_CUT } from '../../utils/constants';
import { TWsActions } from '../../store/store';

const socketMiddleware = (wsUrl:string, wsActions:TWsActions) => (store:any) => {
  let socket:any = null;

  return (next:any) => (action:any) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit, wsSendMessage, onOpen, onClose, onError, onMessage,
    } = wsActions;
    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}?token=${getCookie(ACCESS_TOKEN)?.slice(SYMBOLS_TO_CUT)}`);
    }
    if (socket) {
      socket.onopen = (event: Event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event: Event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event: any) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch({ type: onMessage, payload: restParsedData });
      };

      socket.onclose = (event:any) => {
        dispatch({ type: onClose, payload: event });
      };
      if (type === wsSendMessage) {
        const message = { ...payload };
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};
export default socketMiddleware;
