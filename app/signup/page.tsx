"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function getSignupErrorMessage(message: string) {
  if (/already registered|already exists/i.test(message)) {
    return "이미 가입된 이메일이에요.";
  }
  if (/password/i.test(message)) {
    return "비밀번호는 6자 이상이어야 해요.";
  }
  if (/email/i.test(message)) {
    return "올바른 이메일 형식이 아니에요.";
  }
  return "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요.";
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const isFormFilled =
    email.trim() !== "" && password !== "" && passwordConfirm !== "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    if (password !== passwordConfirm) {
      setToastMessage("비밀번호가 서로 일치하지 않아요.");
      return;
    }

    setIsSubmitting(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    setIsSubmitting(false);

    if (error) {
      setToastMessage(getSignupErrorMessage(error.message));
      return;
    }

    if (data.user && data.user.identities?.length === 0) {
      setToastMessage("이미 가입된 이메일이에요.");
      return;
    }

    router.push("/");
  }

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-[var(--background)] px-6">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-2xl font-semibold tracking-tight text-[var(--text)]">
            🔗 한입 링크
          </span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호 확인
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              required
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
              className="rounded-[10px] border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[17px] text-[var(--text)] outline-none transition-shadow placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(0,113,227,0.2)]"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          이미 계정이 있으신가요?{" "}
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}
