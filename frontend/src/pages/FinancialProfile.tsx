import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  getFinancialProfile,
  saveFinancialProfile,
} from "../services/api";

function FinancialProfile() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    monthlyIncome: "",
    monthlyExpenses: "",
    savings: "",
    debt: "",
    emergencyFund: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;

      try {
        const data = await getFinancialProfile(token);

        const profile = data.profile || data;

        setForm({
          monthlyIncome: profile.monthlyIncome ?? "",
          monthlyExpenses: profile.monthlyExpenses ?? "",
          savings: profile.savings ?? "",
          debt: profile.debt ?? "",
          emergencyFund: profile.emergencyFund ?? "",
        });
      } catch {
        // No profile yet is okay.
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    try {
      setError("");
      setMessage("");

      await saveFinancialProfile(token, {
        monthlyIncome: Number(form.monthlyIncome),
        monthlyExpenses: Number(form.monthlyExpenses),
        savings: Number(form.savings),
        debt: Number(form.debt),
        emergencyFund: Number(form.emergencyFund),
      });

      setMessage("Financial profile saved successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save financial profile."
      );
    }
  };

  const remaining =
    Number(form.monthlyIncome || 0) -
    Number(form.monthlyExpenses || 0);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        Loading financial profile...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/dashboard"
            className="font-bold hover:text-indigo-400"
          >
            ← BudgetBuilder
          </Link>

          <Link
            to="/dashboard"
            className="text-sm text-slate-400 hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Financial Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Financial Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Keep your financial numbers up to date so BudgetBuilder can
            help you plan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Monthly Income
            </p>

            <p className="mt-2 text-2xl font-bold">
              ${Number(form.monthlyIncome || 0).toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Monthly Expenses
            </p>

            <p className="mt-2 text-2xl font-bold">
              ${Number(form.monthlyExpenses || 0).toLocaleString()}
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">
            <p className="text-sm text-indigo-300">
              Monthly Remaining
            </p>

            <p className="mt-2 text-2xl font-bold">
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            {[
              ["monthlyIncome", "Monthly Income"],
              ["monthlyExpenses", "Monthly Expenses"],
              ["savings", "Current Savings"],
              ["debt", "Total Debt"],
              ["emergencyFund", "Emergency Fund"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  {label}
                </label>

                <div className="flex">
                  <span className="flex items-center rounded-l-lg border border-r-0 border-slate-700 bg-slate-800 px-4 text-slate-400">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form[key as keyof typeof form]}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        [key]: e.target.value,
                      })
                    }
                    className="w-full rounded-r-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}

            {message && (
              <div className="md:col-span-2 rounded-lg bg-green-500/10 p-4 text-sm text-green-300">
                {message}
              </div>
            )}

            {error && (
              <div className="md:col-span-2 rounded-lg bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500"
              >
                Save Financial Profile
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default FinancialProfile;