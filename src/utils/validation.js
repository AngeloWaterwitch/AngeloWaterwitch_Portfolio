export function validate(schema, data) {
  const errors = {};

  if (schema === 'contact') {
    if (!data.name || data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    if (!data.email || !data.email.includes('@') || !data.email.includes('.')) {
      errors.email = 'Please enter a valid email address';
    }
    if (!data.message || data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
  }

  if (schema === 'testimonial') {
    if (!data.author || data.author.trim().length < 2) {
      errors.author = 'Name must be at least 2 characters';
    }
    if (!data.quote || data.quote.trim().length < 10) {
      errors.quote = 'Testimonial must be at least 10 characters';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}