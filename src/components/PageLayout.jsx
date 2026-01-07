export default function PageLayout({ children }) {
  return (
    <main className="page">
      <div className="page-inner">{children}</div>
    </main>
  );
}