export default function age(birthday) {
  const age = new Date(new Date() - new Date(birthday)).getFullYear() - 1970;
  return age;
}
