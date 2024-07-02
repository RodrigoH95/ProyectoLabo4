export const mappedErrors = (schema, data) => {
  let errors = {};

  const { success, error } = schema.safeParse(data);

  if (success) return { success, errors };

  const errorsArr = Object.values(error)[0];
  errors = errorsArr
    .map((error) => ({
      [error.path[0]]: error.message,
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }));

  return { success, errors };
};

export const checkIfIsEmailOrUsername = (usernameOrEmail) => {
  const isEmail = usernameOrEmail.includes("@");
  return isEmail ? "email" : "username";
};
