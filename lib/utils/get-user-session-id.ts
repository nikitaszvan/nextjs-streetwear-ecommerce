import { v4 as uuidv4 } from "uuid";


export const getUserSessionId = (): string | null => {

  let sessionId = localStorage.getItem("userSessionId");

  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("userSessionId", sessionId);
  }

  return sessionId;
};
