import { SUBMIT_FORM } from './form.types';

/* -------------------------------------------------------------------------- */

export const submitForm = values => ({
  type: SUBMIT_FORM,
  payload: values,
});
