// Segir stjórnborðinu hvort innskráður notandi sé kennari eða kerfisstjóri.
const { handler, requireUser, getTeacher } = require('./_shared/firebase');

exports.handler = handler(async (event) => {
  const token = await requireUser(event);
  const teacher = await getTeacher(token);
  if (!teacher) return { teacher: false, email: token.email || '' };
  return { teacher: true, ...teacher };
});
