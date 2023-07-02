const validation = (form) => {
  const errors = {};
  if (!form.name.length) errors.name = "Game without name?";
  if (!/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|png|gif)/g.test(form.image))
    errors.image = "You should use an image URL";
  if (!form.description.length)
    errors.description = "What is the videogame about?";
  if (
    !/^(0?[1-9]|1\d|2\d|3[01])\/(0?[1-9]|1[0-2])\/(19|20)\d{2}$/.test(
      form.released
    )
  )
    errors.released = " Use numbers -> day/month/year";
  if (!form.platforms.length) errors.platforms = "Choose the platforms";
  if (!form.genres.length) errors.genres = "Choose the genres";
  return errors;
};

export default validation;
