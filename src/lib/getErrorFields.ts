/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict ";
  export const getFieldError = (fieldName: string, state: any) => {
    if (state && state.errors) {
      const fieldError = state.errors.find(
        (error: any) => error.field === fieldName
      );
      return fieldError ? fieldError.message : null;
    }
    return null;
  };