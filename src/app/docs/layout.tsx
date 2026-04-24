import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.68c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.83.09-.65.35-1.08.63-1.32-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.33 4.7-4.56 4.95.36.31.68.93.68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SlackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M5.042 14.876c.328 0 .591-.06.79-.18.198-.12.33-.282.397-.486.066-.204.099-.438.099-.701 0-.339-.087-.63-.262-.874-.175-.245-.48-.425-.914-.54l-.733-.198c-.404-.11-.702-.27-.894-.482a1.314 1.314 0 0 1-.339-.765 2.11 2.11 0 0 1 .085-.63c.056-.199.154-.364.294-.496.14-.132.334-.233.584-.303.25-.07.57-.105.96-.105h1.053v-.745c0-.437-.083-.742-.248-.914-.165-.172-.465-.258-.9-.258a3.94 3.94 0 0 0-.765.081 5.45 5.45 0 0 0-.63.18.563.563 0 0 1-.27.09c-.087 0-.165-.043-.236-.129-.07-.086-.106-.21-.106-.373v-.78c0-.122.018-.215.054-.28a.272.272 0 0 1 .135-.117c.059-.027.153-.04.283-.04h.614c.328 0 .574-.062.738-.187.164-.125.246-.345.246-.66v-.68c0-.164-.026-.3-.077-.41-.052-.109-.155-.193-.311-.252-.156-.059-.367-.088-.633-.088-.175 0-.341.017-.497.051-.156.035-.3.083-.43.145-.13.063-.231.131-.303.207-.071.076-.107.144-.107.207 0 .087.026.165.077.236.052.07.123.105.213.105.059 0 .13-.02.213-.061.083-.04.187-.085.311-.135a4.33 4.33 0 0 1 .765-.162 5.52 5.52 0 0 1 1.098-.09c.568 0 .98.116 1.235.347.254.232.382.59.382 1.075v1.94c0 .164-.018.29-.054.378-.036.088-.107.155-.213.202-.106.047-.26.07-.463.07h-.614c-.122 0-.213-.014-.274-.04-.061-.027-.107-.07-.137-.128-.031-.059-.046-.15-.046-.275v-.614h-1.08c-.328 0-.592.06-.79.18-.199.12-.33.282-.397.486-.066.204-.099.438-.099.701 0 .339.087.63.262.874.175.245.48.425.914.54l.733.198c.404.11.702.27.894.482.192.212.288.482.288.81 0 .263-.055.48-.164.65-.11.172-.276.303-.499.396-.223.093-.506.14-.851.14-.32 0-.587-.048-.8-.144a.985.985 0 0 1-.439-.414c-.101-.179-.151-.41-.151-.695 0-.263.046-.479.139-.647.093-.168.2-.313.322-.436.122-.123.236-.246.34-.367.105-.122.163-.233.175-.335a.36.36 0 0 0-.047-.18c-.031-.067-.108-.116-.229-.145l-.851-.233c-.087-.023-.186-.055-.297-.095a5.36 5.36 0 0 1-.351-.157c-.116-.062-.22-.144-.311-.245-.09-.102-.151-.233-.181-.396-.031-.163-.046-.375-.046-.636v-.614h2.157v.745c0 .437.083.742.248.914.165.172.465.258.9.258.273 0 .519-.027.739-.081.22-.055.415-.13.586-.227.171-.097.302-.203.393-.32.091-.117.137-.235.137-.355 0-.087-.026-.165-.077-.236-.052-.07-.123-.105-.213-.105-.059 0-.13.02-.213.061-.083.04-.187.085-.311.135-.124.051-.283.1-.476.149a4.92 4.92 0 0 1-.623.093Zm3.424 2.996c0 .31-.112.572-.338.786-.226.214-.486.321-.78.321-.295 0-.56-.11-.795-.33-.234-.22-.351-.482-.351-.786 0-.305.117-.565.351-.78.235-.215.5-.323.795-.323.294 0 .554.108.78.323.226.215.338.475.338.78Zm2.664 2.765c0 .295-.112.547-.338.757-.226.21-.486.315-.78.315-.294 0-.56-.105-.78-.315-.22-.21-.33-.462-.33-.757 0-.304.11-.56.33-.768.22-.208.486-.312.78-.312.294 0 .554.104.78.312.226.208.338.464.338.768Z" />
      <path d="M14.5 5.044c.328 0 .591.062.79.186.198.125.33.284.397.477.066.193.099.42.099.68 0 .328-.087.61-.262.847-.175.237-.48.412-.914.525l-.733.193c-.404.107-.702.26-.894.46a1.31 1.31 0 0 0-.339.74 2.09 2.09 0 0 0 .09.61c.06.192.16.351.303.477.143.126.343.22.6.28.257.06.58.09.97.09h1.052v.72c0 .424.084.72.252.89.168.17.472.255.914.255.273 0 .517-.03.733-.09.215-.06.407-.14.574-.24.167-.1.297-.208.39-.32.093-.114.14-.228.14-.341 0-.084-.026-.16-.077-.228-.052-.068-.123-.102-.213-.102-.059 0-.13.019-.214.058-.083.039-.19.082-.32.13a4.38 4.38 0 0 1-.779.157 5.46 5.46 0 0 1-1.117.087c-.573 0-.993-.114-1.26-.341-.266-.228-.4-.584-.4-1.067v-1.87c0-.16.018-.283.054-.37.036-.087.106-.15.213-.196.106-.045.258-.068.457-.068h.619c.12 0 .21.014.27.04.06.027.106.068.135.124.03.057.046.145.046.267v.6h1.088c.32 0 .583-.062.78-.186.198-.125.33-.284.397-.477.066-.193.099-.42.099-.68 0-.328-.087-.61-.262-.847-.175-.237-.48-.412-.914-.525l-.733-.193c-.404-.107-.702-.26-.894-.46a1.31 1.31 0 0 0-.339-.74 2.09 2.09 0 0 0-.09-.61 1.58 1.58 0 0 0-.303-.477 1.3 1.3 0 0 0-.6-.28c-.257-.06-.58-.09-.97-.09-.319 0-.585.046-.796.14a.983.983 0 0 0-.44.4c-.103.172-.154.395-.154.67 0 .255.045.466.135.63.09.164.2.31.32.44.122.13.236.257.341.382.105.125.163.238.175.34a.36.36 0 0 1-.048.175c-.03.065-.108.113-.228.144l-.86.226c-.086.023-.184.053-.294.09a4.8 4.8 0 0 1-.356.153 1.48 1.48 0 0 0-.313.238 1.13 1.13 0 0 0-.18.383c-.03.158-.045.363-.045.613v.595h2.167v-.72c0-.424-.084-.72-.252-.89-.168-.17-.472-.255-.914-.255a3.98 3.98 0 0 0-.733.09c-.215.06-.407.14-.574.24-.167.1-.297.208-.39.32-.093.114-.14.228-.14.341 0 .084.026.16.077.228.052.068.123.102.213.102.059 0 .13-.019.214-.058.083-.039.19-.082.32-.13a4.38 4.38 0 0 1 .779-.157 5.46 5.46 0 0 1 1.117-.087c.573 0 .993.114 1.26.341.266.228.4.584.4 1.067v1.87c0 .16-.018.283-.054.37-.036.087-.106.15-.213.196-.106.045-.258.068-.457.068h-.619a.82.82 0 0 1-.27-.04.33.33 0 0 1-.135-.124.5.5 0 0 1-.046-.267v-.6H12.78v.595c0 .312.112.575.338.79.226.215.486.323.78.323.294 0 .554-.108.78-.323.226-.215.338-.478.338-.79a.77.77 0 0 0-.345-.67c-.226-.2-.486-.3-.78-.3-.294 0-.56.1-.78.3a.77.77 0 0 0-.345.67c0 .312.112.575.338.79.226.215.486.323.78.323.294 0 .554-.108.78-.323.226-.215.338-.478.338-.79Z" />
    </svg>
  );
}

const navGroups = [
  {
    title: "Getting Started",
    items: [
      { label: "Quick Introduction", href: "/docs/getting-started" },
      { label: "Use Cases", href: "/docs/getting-started#use-cases" },
    ],
  },
  {
    title: "LLM Evals",
    items: [
      { label: "Concepts", href: "/docs/getting-started#concepts" },
      { label: "End-to-End Evals", href: "/docs/getting-started#e2e-evals" },
      { label: "Unit Testing in CI/CD", href: "/docs/getting-started#ci-cd" },
    ],
  },
  {
    title: "Eval Metrics",
    items: [
      { label: "Introduction", href: "/docs/getting-started#metrics-overview" },
      { label: "Deterministic", href: "/docs/getting-started#deterministic" },
      { label: "Compound", href: "/docs/getting-started#compound" },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--header-bg)]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="go-eval logo" width={28} height={28} className="rounded" />
              <span className="go-logo text-lg font-bold">go-eval</span>
              <span className="text-xs text-[var(--muted)]">Docs</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/" className="px-3 py-2 text-[var(--secondary)] hover:text-[var(--foreground)]">
                Home
              </Link>
              <Link href="/docs/getting-started" className="px-3 py-2 text-[var(--foreground)] font-medium">
                Docs
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://join.slack.com/t/goeval/shared_invite/zt-3vz9qlmpw-uBiyB_oZOFsjntlbP7l0EQ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              <SlackIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Slack</span>
            </a>
            <a
              href="https://github.com/igcodinap/go-eval"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--secondary)] hover:text-[var(--foreground)]"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex gap-8 py-8">
          <aside className="hidden w-48 shrink-0 lg:block">
            <nav className="sticky top-20 text-sm">
              {navGroups.map((group) => (
                <div key={group.title} className="mb-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                    {group.title}
                  </p>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block py-1 text-[var(--secondary)] hover:text-[var(--foreground)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          <main className="min-w-0 flex-1 max-w-3xl">
            {children}
          </main>
        </div>
      </div>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <p className="text-sm text-[var(--muted)]">
            go-eval v0.2 — MIT License —{" "}
            <a href="https://github.com/igcodinap/go-eval" className="text-[var(--accent)]">
              github.com/igcodinap/go-eval
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}