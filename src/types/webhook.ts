export interface WebhookResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: unknown;
  status?: number;
  code?: string;
}