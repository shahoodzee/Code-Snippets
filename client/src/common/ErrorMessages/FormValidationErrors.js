import { validateEmail, validatePassword, validatePasswordStrength } from "../Validations/FormValidations";

export const getValidationErrors = (form, isSignUp) => {
    let newErrors = {};
  
    if (!validateEmail(form.email)) {
      newErrors.email = 'Invalid email address';
    }
  
    if (!validatePasswordStrength(form.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character';
    }
  
    if (isSignUp && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    return newErrors;
  };