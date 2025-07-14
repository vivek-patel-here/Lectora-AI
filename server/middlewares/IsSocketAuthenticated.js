import jwt from "jsonwebtoken";
import cookie from "cookie";
import signature from "cookie-signature";


export const isSocketAuthenticated = async (socket, next) => {
  try {
    const rawcookie = socket.handshake.headers.cookie;
    const parsedCookie = cookie.parse(rawcookie || "");
    let signedToken = parsedCookie.authToken;
    if(!signedToken || !signedToken.startsWith("s:")) {
      return next(new Error("Unauthorized!"));
    }
    signedToken=signedToken.slice(2);
    const unsignedToken = signature.unsign(signedToken, process.env.COOKIE_SECRET);
    if (!unsignedToken) {
      return next(new Error("Unauthorized!"));
    }

    const decode = jwt.verify(unsignedToken, process.env.JWT_SECRET);
    socket.user = decode;
    console.log("Socket authenticated successfully!");
    next();

  } catch (err) {
    console.log(err)
    next(new Error("Unauthorized!"));
  }
};
