export interface NotificationModel {
  id?: number;
  userId: number | 'ALL'; // 'ALL' means it's a global broadcast from Admin
  title: string;
  message: string;
  type: 'ALERT' | 'REMINDER' | 'PROMO';
  isRead: boolean;
  timestamp: string;
}