import bcrypt from "bcryptjs";

/**
 * Hash password dengan bcryptjs
 * @param password - Plain text password
 * @param saltRounds - Jumlah salt rounds (default: 10)
 * @returns Hashed password
 */
export async function hashPassword(password: string, saltRounds: number = 10): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Failed to hash password");
  }
}

/**
 * Bandingkan plain text password dengan hashed password
 * @param plainPassword - Plain text password
 * @param hashedPassword - Hashed password dari database
 * @returns true jika cocok, false jika tidak
 */
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Failed to compare password");
  }
}
