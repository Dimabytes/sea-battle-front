import { api } from './api';

const connect = () => api.get('connect');
const isAllConnected = () => api.get('isAllConnected');
const setField = (id, field) => api.post('setField', field, { params: { id } });
const isFieldsReady = () => api.get('isFieldsReady');
const getGameState = (id) => api.get('getGameState', { params: { id } });
const makeHit = ({
  id,
  x,
  y,
}) => api.get('makeHit', { params: { id, x, y } });

export const battleService = {
  connect,
  isAllConnected,
  setField,
  isFieldsReady,
  getGameState,
  makeHit,
};
