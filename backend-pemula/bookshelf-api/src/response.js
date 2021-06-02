const myResponse = ({
  h,
  code = 200,
  message,
  data,
}) => {
  let status = 'success';
  if (code >= 400) status = 'fail';
  const response = h.response({
    status,
    message,
    data,
  });
  response.code(code);
  return response;
};

module.exports = myResponse;
