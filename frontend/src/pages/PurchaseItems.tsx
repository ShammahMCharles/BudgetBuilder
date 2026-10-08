import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  createPurchaseItem,
  deletePurchaseItem,
  getPurchaseItems,
} from "../services/api";

type Purchase = {
  _id: string;
  name: string;
  price: number;
  category: string;
  priority: string;
  monthlyPayment: number;
  downPayment: number;
  purchased: boolean;
  notes: string;
};

function PurchaseItems() {
  const { token } = useAuth();

  const [items, setItems] = useState<Purchase[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "other",
    priority: "medium",
    monthlyPayment: "",
    downPayment: "",
    notes: "",
  });

  const loadItems = async () => {
    if (!token || loading) return;

    try {
      const data = await getPurchaseItems(token);

      setItems(
        Array.isArray(data) ? data : data.purchaseItems || data.items || [],
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not load purchases.",
      );
    }
  };

  useEffect(() => {
    const loadItems = async () => {
      if (!token) return;

      try {
        setLoading(true);

        const data = await getPurchaseItems(token);

        setItems(Array.isArray(data) ? data : data.items || []);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Could not load purchase items.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [token]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) return;

    try {
      setError("");

      await createPurchaseItem(token, {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        priority: form.priority,
        monthlyPayment: Number(form.monthlyPayment || 0),
        downPayment: Number(form.downPayment || 0),
        purchased: false,
        notes: form.notes,
      });

      setForm({
        name: "",
        price: "",
        category: "other",
        priority: "medium",
        monthlyPayment: "",
        downPayment: "",
        notes: "",
      });

      await loadItems();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not create purchase.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    if (!window.confirm("Delete this purchase?")) return;

    try {
      await deletePurchaseItem(token, id);
      await loadItems();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not delete purchase.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="font-bold hover:text-indigo-400">
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
            Purchase Planning
          </p>

          <h1 className="mt-2 text-3xl font-bold">Purchase Planner</h1>

          <p className="mt-2 text-slate-400">
            Plan major purchases before they hit your wallet.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold">Add Purchase</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                required
                placeholder="Purchase name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <input
                required
                type="number"
                min="0"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="car">Vehicle</option>
                <option value="home">Home</option>
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
                <option value="education">Education</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>

              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>

              </select>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Down payment"
                value={form.downPayment}
                onChange={(e) =>
                  setForm({ ...form, downPayment: e.target.value })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Estimated monthly payment"
                value={form.monthlyPayment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    monthlyPayment: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <textarea
                placeholder="Notes"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500"
              >
                Add Purchase
              </button>
            </form>
          </section>

          <section className="space-y-5">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center">
                <p className="text-4xl">🛒</p>

                <h2 className="mt-4 text-xl font-semibold">
                  No planned purchases
                </h2>

                <p className="mt-2 text-slate-400">
                  Add something you're planning to buy.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <article
                  key={item._id}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                        {item.category}
                      </span>

                      <h2 className="mt-3 text-xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        Priority: {item.priority}
                      </p>
                    </div>

                    <p className="text-2xl font-bold">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-slate-800 p-4">
                      <p className="text-xs text-slate-500">Down Payment</p>
                      <p className="mt-1 font-semibold">
                        ${item.downPayment.toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-lg bg-slate-800 p-4">
                      <p className="text-xs text-slate-500">Monthly Payment</p>
                      <p className="mt-1 font-semibold">
                        ${item.monthlyPayment.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {item.notes && (
                    <p className="mt-4 text-sm text-slate-400">{item.notes}</p>
                  )}

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="mt-5 rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </article>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default PurchaseItems;
