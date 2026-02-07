import { Request, Response } from 'express';

class loginController {
  // registration logic here
  static async handle(req: Request, res: Response) {
    const { fullName, phone, service, note } = req.body;
    console.log('Login:', { fullName, phone, service, note });
    res.status(200).json({ ok: true });
  }
}

export default loginController;