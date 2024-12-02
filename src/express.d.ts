import { Request } from '@nestjs/common';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
