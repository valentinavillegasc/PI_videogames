const validation = (form) => {
  const errors = {};
  if (!form.name.length) errors.name = "Game without name?";
  if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.image))
    errors.image = "You should use an image URL";
  if (!form.description.length)
    errors.description = "What is the videogame about?";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.released))
    errors.released = " Just numbers yyyy-mm-dd";
  if (!form.platforms.length) errors.platforms = "Choose the platforms";
  if (!form.genres.length) errors.genres = "Choose the genres";
  return errors;
};

export default validation;
