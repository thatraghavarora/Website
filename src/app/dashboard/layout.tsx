export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No Navbar or Footer — dashboard has its own sidebar header
  return <>{children}</>;
}
