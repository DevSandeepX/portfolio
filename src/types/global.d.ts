export { }

// Create a type for the Roles
export type Roles = 'admin' | 'client'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}