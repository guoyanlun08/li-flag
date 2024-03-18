// 网络请求相关常量

/** http状态码 */
export enum HttpCode {
  SUCCESS = 200,
  BAD_REQUEST = 400, // 请求参数格式不正确、缺少参数、参数超出范围等原因
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500
}

/** http提示语 */
export const showMessage = (status: number | string): string => {
  let message: string = '';
  switch (status) {
    case HttpCode.SUCCESS:
      message = '请求成功';
      break;
    case HttpCode.BAD_REQUEST:
      message = '请求错误';
      break;
    case HttpCode.UNAUTHORIZED:
      message = '未授权，请重新登录';
      break;
    case HttpCode.FORBIDDEN:
      message = '拒绝访问';
      break;
    case HttpCode.NOT_FOUND:
      message = '请求出错';
      break;
    case HttpCode.SERVER_ERROR:
      message = '服务器错误';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};
