import { createContext } from "react";

export const ContextoUsuario = createContext(localStorage.getItem('usuario') === "null" ? null 
                                            : JSON.parse(localStorage.getItem('usuario')));