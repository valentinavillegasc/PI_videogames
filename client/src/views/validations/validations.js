const validation = (form) => {
  const errors = {};
  if (!form.name.length) errors.name = "The game needs a name";
  if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.image))
    errors.image = "You should use an image URL";
  if (!form.description.length)
    errors.description = "What is the videogame about?";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.released))
    errors.released = "Don't forget the creation date";

  return errors;
};

export default validation;
