export interface BankModuleOptions {
  /**
   * The base URL of the bank API. -->
   */
  baseUrl: string;
  auth: {
    /**
     * The username login to the bank account.
     */
    username: string;
    /**
     * The password login to the bank account.
     */
    access_code: string;
    /**
     * Account number of the bank account.
     */
    id_number: string;
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
