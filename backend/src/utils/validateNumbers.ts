export const validateNumbers = (
  num1: any,
  num2: any
): { valid: boolean; error?: string; status: number } => {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return {
      valid: false,
      error: "Os valores devem ser numéricos",
      status: 400,
    };
  }

  if (num1 < 0 || num2 < 0) {
    return {
      valid: false,
      error: "Números não podem ser negativos",
      status: 400,
    };
  }

  if (num1.toString().length > 12 || num2.toString().length > 12) {
    return {
      valid: false,
      error: "Limite de 12 dígitos excedido",
      status: 422,
    };
  }

  return { valid: true, status: 200 };
};
