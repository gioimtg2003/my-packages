export interface BankModuleOptions {
  auth: {
    username: string;
    access_code: string;
  };
  redis?: {
    redis_url: string;
  };
}
export interface IICBResponse {
  requestId: string;
  sessionId: string;
  error: boolean;
  systemDate: string;
  status: string;
  customerNumber: string;
  ipayId: string;
  unreadMessages: any[];
  addField2: string;
  addField3: string;
  tokenId: string;
  customerEkyc: string;
}
