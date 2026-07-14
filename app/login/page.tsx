import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            🔗 한입 링크
          </span>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
          >
            로그인
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
