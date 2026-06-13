export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "32px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🛩 <span className="gradient-text">TokenPilot</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 13,
            color: "var(--text-dim)",
          }}
        >
          <span>
            Built by{" "}
            <a
              href="https://github.com/kushpatel-dev"
              style={{ color: "var(--purple-light)", textDecoration: "none" }}
            >
              Kush Kaneria
            </a>
          </span>
          <a href="#" style={{ color: "var(--text-dim)", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a
            href="https://github.com/kushpatel-dev/TokenPilot"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--text-dim)", textDecoration: "none" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
