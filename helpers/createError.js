const statusMessage = {
  404: 'Not found',
  401: 'Not autorithed',
  400: 'Ошибка от Joi или другой библиотеки  валидации',
  409: 'Email in use',
};
const createError = (status, message = statusMessage[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = createError;
