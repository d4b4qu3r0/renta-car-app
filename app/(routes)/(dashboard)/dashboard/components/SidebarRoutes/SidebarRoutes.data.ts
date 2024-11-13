import { Calendar, Car, Heart, ClipboardList } from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: Car,
        label: "Cars",
        href: "/dashboard"
    },
    {
        icon: Calendar,
        label: "Cars Reserves",
        href: "/reserves"
    },
    {
        icon: Heart,
        label: "Loved Cars",
        href: "/loved-cars"
    },
]

export const dataAdminlSidebar = [
    {
        icon: ClipboardList,
        label: "Manage Cars",
        href: "/dashboard/admin/cars-manager"
    },
    {
        icon: Calendar,
        label: "All Reserves",
        href: "/dashboard/admin/reserves-admin"
    }
]