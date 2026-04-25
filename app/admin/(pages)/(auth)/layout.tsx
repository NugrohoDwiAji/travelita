/**
 * Admin Auth Layout
 * Renders children full-screen, covering the parent admin sidebar.
 */
export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 top-8 z-9999 overflow-auto"
      style={{ background: "#0d1a4d" }}
    >
      {children}
    </div>
  );
}
