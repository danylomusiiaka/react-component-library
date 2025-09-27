import { Home, Mail, Phone, Settings, User } from "lucide-react";

export const menuItems = [
  {
    id: '1',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
    href: '/',
  },
  {
    id: '2',
    label: 'Profile',
    icon: <User className="w-5 h-5" />,
    href: '/profile',
  },
  {
    id: '3',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    children: [
      {
        id: '3-1',
        label: 'Account',
        href: '/settings/account',
      },
      {
        id: '3-2',
        label: 'Privacy',
        href: '/settings/privacy',
      },
    ],
  },
  {
    id: '4',
    label: 'Contact',
    icon: <Mail className="w-5 h-5" />,
    children: [
      {
        id: '4-1',
        label: 'Email',
        icon: <Mail className="w-4 h-4" />,
        href: '/contact/email',
      },
      {
        id: '4-2',
        label: 'Phone',
        icon: <Phone className="w-4 h-4" />,
        href: '/contact/phone',
      },
    ],
  },
];