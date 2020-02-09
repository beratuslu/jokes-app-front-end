import _ from "lodash";
export function complexPassword(password) {
  // probably already handled by the required flag
  if (_.isNull(password) || !_.isString(password) || _.isEmpty(password))
    return false;

  // Passwords must include one increasing straight of at least three letters, like ‘abc’, ‘cde’, ‘fgh’, and so on, up to ‘xyz’.
  if (password.length < 3) {
    return false;
  }

  let increasingFound = false;
  for (let i = 0; i < password.length; i += 1) {
    if (i === password.length - 2) {
      break;
    }
    const currentChar = password[i];
    const secondChar = password[i + 1];
    const thirdChar = password[i + 2];
    if (!isNaN(currentChar)) {
      continue;
    }
    if (
      currentChar.charCodeAt() + 1 === secondChar.charCodeAt() &&
      currentChar.charCodeAt() + 2 === thirdChar.charCodeAt()
    ) {
      increasingFound = true;
      break;
    }
  }
  if (!increasingFound) {
    return false;
  }

  // Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters and are therefore confusing.
  if (true === /[i,O,l]/.test(password)) return false;

  // Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.
  let twoNonOverlappingFound = 0;
  let skipNext = false;
  for (let i = 0; i < password.length; i += 1) {
    if (skipNext) {
      skipNext = false;
      continue;
    }
    if (i === password.length - 1) {
      break;
    }
    const currentChar = password[i];
    const secondChar = password[i + 1];
    if (!isNaN(currentChar)) {
      continue;
    }
    if (currentChar.charCodeAt() === secondChar.charCodeAt()) {
      twoNonOverlappingFound++;
      skipNext = true;
    }
  }
  if (twoNonOverlappingFound < 2) {
    return false;
  }

  // separately targeting input length to provide specific error message

  return true;
}
