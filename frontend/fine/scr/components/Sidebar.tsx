interface NavItem {
  key: string;
  label: string;
}

interface Props {
  title: string;
  subtitle: string;
  items: NavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  userName: string;
  onLogout: () => void;
}

export default function Sidebar({ title, subtitle, items, activeKey, onSelect, userName, onLogout }: Props) {
  const initials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-mark">Ф</div>
        <div>
          <div className="title">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={activeKey === item.key ? "sidebar-link active" : "sidebar-link"}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <span className="avatar">{initials || "U"}</span>
          <span className="name">{userName}</span>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ width: "100%" }} onClick={onLogout}>
          Выйти
        </button>
      </div>
    </aside>
  );
}