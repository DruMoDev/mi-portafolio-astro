// Muro de email de las guías: el id anónimo del lead en el navegador y la validación del email.
// Todas las funciones del storage tragan sus excepciones (Safari privado, almacenamiento
// bloqueado o lleno): el muro se desbloquea igual en esa visita.
import { EMAIL_RE } from "../contact-validation";

export const LEAD_KEY = "dru-lead-id";

export function readLeadId(storage: Pick<Storage, "getItem"> | null): string | null {
  try {
    return storage?.getItem(LEAD_KEY) || null;
  } catch {
    return null;
  }
}

export function saveLeadId(storage: Pick<Storage, "setItem"> | null, id: string): void {
  try {
    storage?.setItem(LEAD_KEY, id);
  } catch {
    // Sin almacenamiento: esta visita queda desbloqueada y la próxima se vuelve a pedir.
  }
}

export function clearLeadId(storage: Pick<Storage, "removeItem"> | null): void {
  try {
    storage?.removeItem(LEAD_KEY);
  } catch {
    // Nada que borrar si no hay almacenamiento.
  }
}

/** La misma regla que el formulario de contacto. */
export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
