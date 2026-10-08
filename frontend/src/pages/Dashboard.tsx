import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  {
    title: "Budget Goals",
    description: "Set savings targets and track your progress.",
    href: "/goals",
    icon: "🎯",
  },
  {
    title: "Financial Profile",
    description: "Keep your income and financial details organized.",
    href: "/financial-profile",
    icon: "📊",
  },
  {
    title: "Purchase Planner",
    description: "Plan upcoming purchases before you spend.",
    href: "/purchase-items",
    icon: "🛍️",
  },
];

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              B
            </span>
            <span className="text-lg font-bold tracking-tight">
              BudgetBuilder
            </span>
          </Link>

          <button
            onClick={logout}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="overflow-hidden rounded-2xl bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 p-8 shadow-xl sm:p-10">
          <p className="text-sm font-medium text-indigo-100">
            YOUR FINANCIAL WORKSPACE
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back{user?.username ? `, ${user.username}` : ""}.
          </h1>

          <p className="mt-3 max-w-2xl text-indigo-100">
            Make your money work toward your goals. Organize your finances, plan
            purchases, and build better spending habits one step at a time.
          </p>

          <Link
            to="/goals"
            className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Explore your goals →
          </Link>
        </section>

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">Your financial tools</h2>
            <p className="mt-1 text-sm text-slate-400">
              Everything you need to plan your next move.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.href}
                to={feature.href}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-500/70 hover:bg-slate-900/80"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-2xl">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-semibold text-white group-hover:text-indigo-300">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>

                <span className="mt-5 inline-block text-sm font-medium text-indigo-400">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-5 text-sm text-slate-500">
          BudgetBuilder · Plan intentionally. Spend confidently.
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
