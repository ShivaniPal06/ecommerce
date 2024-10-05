import bcrypt from 'bcrypt';
// import { hashPassword } from './authHelpers';

// Export a constant function called hashPassword that takes in a password as an argument
export const hashPassword = async (password) => {
    // Try to hash the password using bcrypt with 10 salt rounds
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Return the hashed password
        return hashedPassword;
    }
    // Catch any errors and log them to the console
    catch(error) {
        console.log(error);
    }
};

// Export a constant function called comparePassword that takes in two parameters, password and hashedPassword
export const comparePassword = async (password, hashedPassword) => {
    // Use bcrypt to compare the password and hashedPassword
    return bcrypt.compare(password, hashedPassword);
}