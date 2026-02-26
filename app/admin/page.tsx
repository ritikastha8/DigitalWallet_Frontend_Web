import Link from "next/link";

export default function AdminDashboardPage() {
  const sections = [
    { href: "/admin/users", label: "Users", createHref: "/admin/users/create", createLabel: "Add User" },
    { href: "/admin/notifications", label: "Notifications", createHref: "/admin/notifications/create", createLabel: "Add Notification" },
    { href: "/admin/termsconditions", label: "Terms & Conditions", createHref: "/admin/termsconditions/create", createLabel: "Add Terms Condition" },
    { href: "/admin/landingpages", label: "Landing Pages", createHref: "/admin/landingpages/create", createLabel: "Add Landing Page" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#D07522] mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage users, notifications, terms and landing pages.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(({ href, label, createHref, createLabel }) => (
          <div
            key={href}
            className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{label}</h2>
            <div className="flex gap-3">
              <Link
                href={href}
                className="text-sm font-medium text-[#D07522] hover:underline"
              >
                View all
              </Link>
              <Link
                href={createHref}
                className="text-sm font-medium text-[#D07522] hover:underline"
              >
                {createLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
