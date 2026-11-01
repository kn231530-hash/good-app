import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Bike, 
  Tag, 
  Award, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'order' | 'offer' | 'reward' | 'system';
  isRead: boolean;
  linkAction?: string;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateAction?: (action: string) => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Rider on the Way! 🛵',
    message: 'Rider Tariq has picked up your order and is heading towards Jutial Colony. Estimated delivery: 14 mins.',
    timestamp: '5 mins ago',
    type: 'order',
    isRead: false,
    linkAction: 'orders'
  },
  {
    id: 'n2',
    title: 'Code CHASKA50 Active! 🔥',
    message: 'Get flat Rs. 150 OFF on any crispy zinger burger or family pizza deal. Valid today across Gilgit & Gahkuch.',
    timestamp: '2 hours ago',
    type: 'offer',
    isRead: false,
    linkAction: 'offers'
  },
  {
    id: 'n3',
    title: '+85 Loyalty Points Earned 🎉',
    message: 'Your recent order of Supreme Tikka Feast credited 85 fresh points to your Gold Gourmet tier account.',
    timestamp: 'Yesterday',
    type: 'reward',
    isRead: true,
    linkAction: 'profile'
  },
  {
    id: 'n4',
    title: 'New Partner: Hunza Bakers 🍰',
    message: 'Authentic apricot pies, walnut cakes, and fresh breakfast patties are now available for fast express delivery.',
    timestamp: '2 days ago',
    type: 'system',
    isRead: true,
    linkAction: 'categories'
  }
];

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateAction
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <Bike className="w-4 h-4 text-emerald-600" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-600" />;
      case 'reward':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'system':
      default:
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full z-10 animate-slide-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-[#0F172A] text-base">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Live order & promotional updates</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark read</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Notifications */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                handleToggleRead(item.id);
                if (item.linkAction && onNavigateAction) {
                  onNavigateAction(item.linkAction);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer flex gap-3 ${
                item.isRead ? 'bg-white hover:bg-slate-50' : 'bg-emerald-50/40 hover:bg-emerald-50/70 border border-emerald-100/80 shadow-xs'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                item.isRead ? 'bg-slate-100' : 'bg-white shadow-xs'
              }`}>
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`text-xs font-bold truncate ${item.isRead ? 'text-slate-700' : 'text-[#0F172A]'}`}>
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.message}
                </p>
                {item.linkAction && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline">
                    <span>View details</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>

              {!item.isRead && (
                <div className="w-2 h-2 rounded-full bg-emerald-500 self-center shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 text-center">
          <p className="text-[11px] text-slate-400">
            Push alerts are simulated live in Oderela Chaska preview.
          </p>
        </div>
      </div>
    </div>
  );
};
