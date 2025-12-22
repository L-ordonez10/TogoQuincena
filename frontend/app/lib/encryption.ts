// Utilidades para encriptar y desencriptar IDs de solicitudes

// Función simple de encriptación usando base64 y una clave secreta
const SECRET_KEY = "togoQuincenaSecretKey2025";

export function encryptId(id: number | string): string {
    try {
        const idString = id.toString();
        const combined = `${SECRET_KEY}_${idString}_${SECRET_KEY}`;
        return btoa(combined).replace(/[+/=]/g, (match) => {
            switch (match) {
                case '+': return '-';
                case '/': return '_';
                case '=': return '';
                default: return match;
            }
        });
    } catch (error) {
        console.error('Error encrypting ID:', error);
        return '';
    }
}

export function decryptId(encryptedId: string): number | null {
    try {
        // Revertir las sustituciones de caracteres
        const base64 = encryptedId.replace(/[-_]/g, (match) => {
            switch (match) {
                case '-': return '+';
                case '_': return '/';
                default: return match;
            }
        });
        
        // Agregar padding si es necesario
        const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
        
        const decoded = atob(padded);
        const parts = decoded.split('_');
        
        if (parts.length === 3 && parts[0] === SECRET_KEY && parts[2] === SECRET_KEY) {
            const id = parseInt(parts[1]);
            return isNaN(id) ? null : id;
        }
        
        return null;
    } catch (error) {
        console.error('Error decrypting ID:', error);
        return null;
    }
}

// Función para validar si un slug encriptado es válido
export function isValidEncryptedId(encryptedId: string): boolean {
    return decryptId(encryptedId) !== null;
}