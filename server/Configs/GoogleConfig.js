import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID_WEB;
const GOOGLE_SECRET_ID = process.env.GOOGLE_SECRET_ID_WEB;

const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_ID,
  "postmessage"
);

export  {oauth2client};
