export const menuItems = [
  // {
  //   isHeadr: true,
  //   title: "menu",
  // },

  {
    title: "Dashboard",
    icon: "heroicons-outline:home",
    link: "dashboard",
  },

  {
    title: "Students",
    icon: "heroicons-outline:user-group",
    link: "",
    child: [
      {
        childtitle: "Register Student",
        childlink: "registerStudent",
        childicon: "heroicons-outline:user-add",
      },
      {
        childtitle: "View Students",
        childlink: "student/view",
        childicon: "heroicons-outline:eye",
      },
      {
        childtitle: "Assign Room",
        childlink: "student/assign-room",
        childicon: "heroicons-outline:home-modern",
      },
      {
        childtitle: "Check-in/Check-out",
        childlink: "student/checkin-checkout",
        childicon: "heroicons-outline:arrows-right-left",
      },
      {
        childtitle: "ID Card",
        childlink: "student/id-card",
        childicon: "heroicons-outline:identification",
      },
      {
        childtitle: "Student Reports",
        childlink: "student/reports",
        childicon: "heroicons-outline:document-report",
      },
    ],
  },

  {
    title: "Rooms",
    icon: "heroicons-outline:building-office",
    link: "",
    child: [
      {
        childtitle: "Add / Update Room",
        childlink: "room/add-update",
        childicon: "heroicons-outline:pencil-square",
      },
      {
        childtitle: "Room Availability",
        childlink: "room/availability",
        childicon: "heroicons-outline:check-badge",
      },
      {
        childtitle: "Allocation History",
        childlink: "room/history",
        childicon: "heroicons-outline:clock",
      },
      {
        childtitle: "Maintenance Requests",
        childlink: "room/maintenance",
        childicon: "heroicons-outline:wrench",
      },
    ],
  },

  {
    title: "Staff",
    icon: "heroicons-outline:users",
    link: "",
    child: [
      {
        childtitle: "Register Staff",
        childlink: "staff/register",
        childicon: "heroicons-outline:user-add",
      },
      {
        childtitle: "View Staff",
        childlink: "staff/view",
        childicon: "heroicons-outline:eye",
      },
      {
        childtitle: "Assign Duties",
        childlink: "staff/duties",
        childicon: "heroicons-outline:clipboard-check",
      },
      {
        childtitle: "Attendance",
        childlink: "staff/attendance",
        childicon: "heroicons-outline:calendar-days",
      },
      {
        childtitle: "Staff Reports",
        childlink: "staff/reports",
        childicon: "heroicons-outline:document-report",
      },
    ],
  },

  {
    title: "Fees",
    icon: "heroicons-outline:currency-rupee",
    link: "",
    child: [
      {
        childtitle: "Fee Structure",
        childlink: "fee/structure",
        childicon: "heroicons-outline:document-text",
      },
      {
        childtitle: "Collect Fees",
        childlink: "fee/collect",
        childicon: "heroicons-outline:cash",
      },
      {
        childtitle: "Payment History",
        childlink: "fee/history",
        childicon: "heroicons-outline:receipt-tax",
      },
      {
        childtitle: "Pending Dues",
        childlink: "fee/pending",
        childicon: "heroicons-outline:exclamation-circle",
      },
      {
        childtitle: "Fee Reports",
        childlink: "fee/reports",
        childicon: "heroicons-outline:chart-bar",
      },
    ],
  },

  {
    title: "Visitors",
    icon: "heroicons-outline:face-smile",
    link: "",
    child: [
      {
        childtitle: "Log Visitor",
        childlink: "visitor/log",
        childicon: "heroicons-outline:plus-circle",
      },
      {
        childtitle: "Visitor Logs",
        childlink: "visitor/view",
        childicon: "heroicons-outline:clipboard-document",
      },
      {
        childtitle: "Visitor Reports",
        childlink: "visitor/reports",
        childicon: "heroicons-outline:document-report",
      },
    ],
  },

  {
    title: "Inventory",
    icon: "heroicons-outline:archive-box",
    link: "",
    child: [
      {
        childtitle: "Add / Update Inventory",
        childlink: "inventory/add",
        childicon: "heroicons-outline:plus-circle",
      },
      {
        childtitle: "Issue Requests",
        childlink: "inventory/issue",
        childicon: "heroicons-outline:arrow-up-right",
      },
      {
        childtitle: "Inventory Reports",
        childlink: "inventory/reports",
        childicon: "heroicons-outline:document-report",
      },
    ],
  },

  {
    title: "Complaints",
    icon: "heroicons-outline:exclamation-circle",
    link: "",
    child: [
      {
        childtitle: "Submit Complaint",
        childlink: "complaint/submit",
        childicon: "heroicons-outline:pencil",
      },
      {
        childtitle: "Assign Complaints",
        childlink: "complaint/assign",
        childicon: "heroicons-outline:user-circle",
      },
      {
        childtitle: "Complaint Status",
        childlink: "complaint/status",
        childicon: "heroicons-outline:clipboard-document-check",
      },
    ],
  },

  {
    title: "Mess",
    icon: "heroicons-outline:cake",
    link: "",
    child: [
      {
        childtitle: "Meal Plan",
        childlink: "mess/meal-plan",
        childicon: "heroicons-outline:calendar",
      },
      {
        childtitle: "Daily Menu",
        childlink: "mess/menu",
        childicon: "heroicons-outline:clipboard",
      },
      {
        childtitle: "Meal Attendance",
        childlink: "mess/attendance",
        childicon: "heroicons-outline:users",
      },
      {
        childtitle: "Mess Reports",
        childlink: "mess/reports",
        childicon: "heroicons-outline:chart-pie",
      },
    ],
  },

  {
    title: "Reports",
    icon: "heroicons-outline:chart-bar",
    link: "",
    child: [
      {
        childtitle: "Occupancy Report",
        childlink: "reports/occupancy",
        childicon: "heroicons-outline:chart-line",
      },
      {
        childtitle: "Fee Report",
        childlink: "reports/fees",
        childicon: "heroicons-outline:receipt-percent",
      },
      {
        childtitle: "Complaint Report",
        childlink: "reports/complaints",
        childicon: "heroicons-outline:exclamation-triangle",
      },
      {
        childtitle: "Inventory Report",
        childlink: "reports/inventory",
        childicon: "heroicons-outline:archive-box-arrow-down",
      },
    ],
  },

  {
    title: "Settings",
    icon: "heroicons-outline:cog-6-tooth",
    link: "",
    child: [
      {
        childtitle: "Hostel Configuration",
        childlink: "settings/configuration",
        childicon: "heroicons-outline:building-library",
      },
      {
        childtitle: "User Roles",
        childlink: "settings/users",
        childicon: "heroicons-outline:users-cog",
      },
      {
        childtitle: "Backup / Restore",
        childlink: "settings/backup",
        childicon: "heroicons-outline:arrow-path",
      },
      {
        childtitle: "Notification Settings",
        childlink: "settings/notifications",
        childicon: "heroicons-outline:bell",
      },
    ],
  },

  {
    title: "Logout",
    icon: "heroicons-outline:logout",
    link: "/",
  },
];
