const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const NO_SPACE_REGEX = /^[^\s]+$/;
const NO_SPECIAL_CHARACTERS_REGEX =
  /^[a-zA-Z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ&@ -]*$/;
const PASSWORD_CONDITIONS_REGEX =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&,])(?=.*\d)/;
const TEXT_AND_NUMBERS_ONLY_REGEX =
  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const TEXT_ONLY_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$/;

export const emailCharacters = (val) => {
  return (
    EMAIL_REGEX.test(val) ||
    "Désolé, seules les lettres (a-z), les chiffres (0-9), les points (.) et le symbole @ sont autorisés."
  );
};

export const emailLength = (min, max) => {
  return (
    val.length <= max ||
    val.length >= min ||
    "Désolé, votre email doit comporter entre 8 et 150 caractères."
  );
};

export const maxCharacters = (max) => {
  return (val) => {
    return val.length <= max || `${max} caractères maximum.`;
  };
};

export const minCharacters = (min) => {
  return (val) => {
    return val.length >= min || `${min} caractères minimum.`;
  };
};

export const noSpace = (val) => {
  return NO_SPACE_REGEX.test(val) || "Désolé, aucun espace autorisé.";
};

export const noSpecialCharacters = (val) => {
  return (
    NO_SPECIAL_CHARACTERS_REGEX.test(val) ||
    "Désolé, les caractères spéciaux ne sont pas autorisés."
  );
};

export const passwordCharacters = (val) => {
  return (
    PASSWORD_CONDITIONS_REGEX.test(val) ||
    "Veuillez choisir un mot de passe plus mélange de lettres, de chiffres et de symboles."
  );
};

export const passwordCheck = (password) => {
  return (val) => {
    return (
      val === password ||
      "Ces mots de passe ne correspondent pas. Veuillez réessayer."
    );
  };
};

export const passwordLength = (min, max) => {
  return (
    val.length < max ||
    val.length > min ||
    "Utilisez 8 caractères ou plus pour votre mot de passe."
  );
};

export const required = (val) => {
  return !!val || "Ce champ est nécessaire";
};

export const textAndNumbersOnly = (val) => {
  return (
    TEXT_AND_NUMBERS_ONLY_REGEX.test(val) ||
    "Désolé, seules les lettres (a-z A-Z) sont autorisés."
  );
};

export const textOnly = (val) => {
  return (
    TEXT_ONLY_REGEX.test(val) ||
    "Désolé, seules les lettres (a-z A-Z) et les chiffres (0-9) sont autorisés."
  );
};
