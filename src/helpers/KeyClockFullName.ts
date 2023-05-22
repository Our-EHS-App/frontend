const getKeyClockFullName = (
  firstName: string,
  lastName: string,
  firstNameEn: string,
  lastNameEn: string,
  language: string
) => {
  return `${language === 'en' ? firstNameEn ?? firstName : firstName} ${
    language === 'en' ? lastNameEn ?? lastName : lastName
  }`;
};
export { getKeyClockFullName };
