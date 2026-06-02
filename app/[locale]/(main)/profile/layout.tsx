import Link from "next/link";
import {
  BadgeDollarSign,
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Star,
  UserRound,
} from "lucide-react";

const dashboardLinks = [
  { label: "Profile setup", icon: UserRound, href: "" },
  { label: "Services", icon: BriefcaseBusiness, href: "#services" },
  { label: "Requests", icon: ClipboardList, href: "#requests" },
  { label: "Reviews", icon: Star, href: "#reviews" },
  { label: "Earnings", icon: BadgeDollarSign, href: "#earnings" },
  { label: "Messages", icon: MessageSquareText, href: "#messages" },
  { label: "Settings", icon: Settings, href: "#settings" },
];

export default async function ProviderDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profileHref = `/${locale}/profile`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col lg:min-h-screen lg:flex-row">
        <aside className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900 text-white">
                <LayoutDashboard size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Provider
                </p>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            >
              <Bell size={18} />
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-800">
            <p className="font-semibold">Profile status</p>
            <p className="mt-1 text-emerald-700">Complete your provider details to start receiving requests.</p>
          </div>

          <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {dashboardLinks.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === "Profile setup";
              const href = item.href ? `${profileHref}${item.href}` : profileHref;

              return (
                <Link
                  key={item.label}
                  href={href}
                  className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition lg:min-w-0 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Service Hub
                </p>
                <h2 className="text-xl font-bold sm:text-2xl">Provider workspace</h2>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="font-bold text-slate-900">0</p>
                  <p className="text-xs text-slate-500">Requests</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="font-bold text-slate-900">0</p>
                  <p className="text-xs text-slate-500">Reviews</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-2">
                  <p className="font-bold text-slate-900">New</p>
                  <p className="text-xs text-slate-500">Status</p>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
