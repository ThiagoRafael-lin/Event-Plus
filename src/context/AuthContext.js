import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

export const UserDecodeToken = (theToken) => {
    const decoded = jwtDecode(theToken)

    return { 
        role: decoded.role,
        name:decoded.name,
        useRouteId: decoded.jti,
        token: theToken
        }
}