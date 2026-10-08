import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createGoal, deleteGoal, getGoals, updateGoal } from "../services/api";

type Goal = {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
};

const emptyForm = {
  name: "",
  targetAmount: "",
  currentAmount: "",
  targetDate: "",
  category: "savings",
};

function Goals() {
  const { token } = useAuth();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadGoals = async () => {
    if (!token) return;

    try {
      setLoading(true);

      const data = await getGoals(token);

      setGoals(Array.isArray(data) ? data : data.goals || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load goals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadGoals = async () => {
      if (!token) return;

      try {
        setLoading(true);

        const data = await getGoals(token);

        setGoals(Array.isArray(data) ? data : data.goals || []);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Could not load goals.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    try {
      setError("");

      const goalData = {
        name: form.name,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount),
        targetDate: form.targetDate,
        category: form.category,
      };

      if (editingId) {
        await updateGoal(token, editingId, goalData);
      } else {
        await createGoal(token, goalData);
      }

      setForm(emptyForm);
      setEditingId(null);

      await loadGoals();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save goal.");
    }
  };

  const handleEdit = (goal: Goal) => {
    setEditingId(goal._id);

    setForm({
      name: goal.name,
      targetAmount: String(goal.targetAmount),
      currentAmount: String(goal.currentAmount),
      targetDate: goal.targetDate?.split("T")[0] || "",
      category: goal.category,
    });
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?",
    );

    if (!confirmed) return;

    try {
      await deleteGoal(token, id);
      await loadGoals();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not delete goal.",
      );
    }
  };

  const getProgress = (goal: Goal) => {
    if (!goal.targetAmount) return 0;

    return Math.min(
      100,
      Math.round((goal.currentAmount / goal.targetAmount) * 100),
    );
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/dashboard"
            className="text-lg font-bold text-white hover:text-indigo-400"
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

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-400">
            Financial Planning
          </p>

          <h1 className="mt-2 text-3xl font-bold">Your Budget Goals</h1>

          <p className="mt-2 text-slate-400">
            Set financial targets and track your progress.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          {/* FORM */}
          <section className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Goal" : "Create Goal"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Goal name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

              <input
                type="number"
                placeholder="Target amount"
                value={form.targetAmount}
                onChange={(e) =>
                  setForm({ ...form, targetAmount: e.target.value })
                }
                required
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

              <input
                type="number"
                placeholder="Current amount"
                value={form.currentAmount}
                onChange={(e) =>
                  setForm({ ...form, currentAmount: e.target.value })
                }
                required
                min="0"
                step="0.01"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

              <input
                type="date"
                value={form.targetDate}
                onChange={(e) =>
                  setForm({ ...form, targetDate: e.target.value })
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
              >
                <option value="savings">Savings</option>
                <option value="debt">Debt</option>
                <option value="investment">Investment</option>
                <option value="purchase">Purchase</option>
                <option value="other">Other</option>
              </select>

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold transition hover:bg-indigo-500"
              >
                {editingId ? "Update Goal" : "Create Goal"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="w-full rounded-lg border border-slate-700 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </section>

          {/* GOALS */}
          <section>
            {loading ? (
              <p className="text-slate-400">Loading goals...</p>
            ) : goals.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                <p className="text-4xl">🎯</p>
                <h2 className="mt-4 text-xl font-semibold">No goals yet</h2>
                <p className="mt-2 text-slate-400">
                  Create your first financial goal to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {goals.map((goal) => {
                  const progress = getProgress(goal);

                  return (
                    <article
                      key={goal._id}
                      className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                            {goal.category}
                          </span>

                          <h2 className="mt-3 text-xl font-semibold">
                            {goal.name}
                          </h2>

                          <p className="mt-1 text-sm text-slate-500">
                            Target:{" "}
                            {new Date(goal.targetDate).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold">{progress}%</p>
                          <p className="text-xs text-slate-500">complete</p>
                        </div>
                      </div>

                      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <div className="mt-3 flex justify-between text-sm">
                        <span className="text-slate-400">
                          ${goal.currentAmount.toLocaleString()} saved
                        </span>

                        <span className="font-medium text-white">
                          ${goal.targetAmount.toLocaleString()} goal
                        </span>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => handleEdit(goal)}
                          className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(goal._id)}
                          className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Goals;
