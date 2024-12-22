import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    const rpcException = exception.getError();

    if (
      typeof rpcException === 'object' &&
      'status' in rpcException &&
      'message' in rpcException
    ) {
      const status = isNaN(+rpcException.status) ? 400 : +rpcException.status;
      return response.status(status).json(rpcException);
    }

    response.status(400).json({
      statusCode: 400,
      message: rpcException,
    });
  }
}
