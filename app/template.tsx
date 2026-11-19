/** Re-mounts on every navigation, giving each page a soft entrance (CSS only, so it works without JS). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
