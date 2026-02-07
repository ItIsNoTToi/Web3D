import { Request, Response } from 'express';

class registerController {
  // registration logic here
  static async handle(req: Request, res: Response) {
    const { fullName, phone, service, note } = req.body;
    console.log('Register:', { fullName, phone, service, note });
    res.status(200).json({ ok: true });
  }
}

export default registerController;