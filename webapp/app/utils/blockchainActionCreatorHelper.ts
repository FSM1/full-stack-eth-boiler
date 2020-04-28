import { createAsyncAction } from "typesafe-actions";

const TX_Prefix = '@TX_';

export function createBlockchainAction<TRequestPayload, TSuccessPayload, TFailurePayload, TCancelPayload = never>(baseActionType: string) {
  const action = createAsyncAction(
    `${TX_Prefix}REQUEST/${baseActionType}`,
    `${TX_Prefix}SUCCESS/${baseActionType}`,
    `${TX_Prefix}FAILURE/${baseActionType}`,
    `${TX_Prefix}CANCEL/${baseActionType}`
  )<TRequestPayload, TSuccessPayload, TFailurePayload, TCancelPayload>();
  
  return action;
}