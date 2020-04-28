/*
 *
 * TransactionModal actions
 *
 */

import { createStandardAction } from 'typesafe-actions';

export const setModalOpen = createStandardAction('@TX_MODAL/SET_OPEN')<boolean>();
export const setTxContext = createStandardAction('@TX_MODAL/SET_CONTEXT')<string | undefined>();
export const setTxHash = createStandardAction('@TX_MODAL/SET_TX_HASH')<string | undefined>();
