function overrideParams(params, newValues) {
  return {
    ...params,
    ...newValues
  };
}

module.exports = {
  overrideParams: overrideParams
};