import { Package, Bookmark, CheckSquare } from 'lucide-react';
import type { ReactElement } from 'react';

interface NavItem {
    to: string;
    label: string;
    icon: ReactElement;
    }

    export const navItems: NavItem[] = [
    { to: '/dashboard/products', label: 'Products', icon: <Package size={18} /> },
    { to: '/dashboard/favorites', label: 'Favorites', icon: <Bookmark size={18} /> },
    { to: '/dashboard/orders', label: 'order list', icon: <CheckSquare size={18} /> },
    ];