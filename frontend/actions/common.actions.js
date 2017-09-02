import {
    OPEN_MODAL,
    EXPAND_MODAL,
    SHRINK_MODAL,
    CLOSE_MODAL,
} from './types/modal.types';

import { createAction } from '../utils/actions.helper';

export const openModal = (key, value) => createAction(OPEN_MODAL, { key, value });

export const expandModal = () => createAction(EXPAND_MODAL);

export const shrinkModal = () => createAction(SHRINK_MODAL);

export const closeModal = () => createAction(CLOSE_MODAL);
