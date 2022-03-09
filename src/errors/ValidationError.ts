class ValidationError extends Error {
  validationId: string;

  constructor(id: string, ...params: any) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
    
    this.name = 'ValidationError';
    this.validationId = id;
  }
}

export default ValidationError;

