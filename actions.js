const createAsyncActions = name => {
  return {
    success: createAction(name + "success"),
    error: createAction(name + "error"),
    busy: createAction(name + "busy")
  };
};

const createAction = fn => {};
