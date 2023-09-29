import { Response } from "express";

export type ResponseBody = {success: boolean, response: any}

const responses = {
  success: (res: Response, response: any) => {
    return res.status(200).json({ success: true, response });
  },

  created: (res: Response, response: any) => {
    return res.status(201).json({ success: true, response });
  },

  badRequest: (res: Response, response: any) => {
    return res.status(400).json({ success: false, response });
  },

  unauthorized: (res: Response, response: any) => {
    return res.status(401).json({ success: false, response });
  },

  forbidden: (res: Response, response: any) => {
    return res.status(403).json({ success: false, response });
  },

  notFound: (res: Response, response: any) => {
    return res.status(404).json({ success: false, response });
  },

  internalError: (res: Response, response: any) => {
    return res.status(500).json({ success: false, response });
  },
};

export default responses;
