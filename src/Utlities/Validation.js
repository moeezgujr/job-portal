export function Validator(form) {
  let errors = {};
  if (!form.image) {
    errors = { ...errors, image: "Image is Required" };
  }
  if (!form.experience) {
    errors = { ...errors, experience: "Experience is Required" };
  }
  if (!form.jobTitle) {
    errors = { ...errors, jobTitle: "Job Title is Required" };
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    return false;
  }
}
