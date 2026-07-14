"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function getResetErrorMessage(message: string) {
  if (/email/i.test(message)) {
    return "올바른 이메일 형식이 아니에요.";
  }
  return "재설정 링크 발송에 실패했어요. 잠시 후 다시 시도해 주세요.";
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsSubmitting(false);

    if (error) {
      setToastMessage(getResetErrorMessage(error.message));
      return;
    }

    setIsSent(true);
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

          {isSent ? (
            <p className="text-sm text-[var(--success)]">
              비밀번호 재설정 링크를 이메일로 보냈어요.
            </p>
          ) : (
            <button
              type="submit"
              disabled={!email.trim() || isSubmitting}
              className="mt-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "발송 중..." : "재설정 링크 발송"}
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link
            href="/login"
            className="font-medium text-[var(--accent)] hover:underline"
          >
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </div>
  );
}
