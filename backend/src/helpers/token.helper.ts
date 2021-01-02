import { Request } from "express";

const extractAccessTokenFromRequest = (req: Request): string => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    throw new Error('Token is not provided.');
  }

  let fragments = authorizationHeader.split(' ');

  if (fragments[0] !== 'Bearer') {
    throw new Error('Token is not provided.');
  }

  let token = fragments[1];

  return token;
}

export { extractAccessTokenFromRequest }