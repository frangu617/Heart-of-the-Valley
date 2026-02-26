export const GAME_NOTICE_EVENT = "hotv:game-notice";
export const GAME_CONFIRM_EVENT = "hotv:game-confirm";

export type GameNoticeTone = "info" | "success" | "warning" | "error";

export type GameNoticePayload = {
  message: string;
  tone?: GameNoticeTone;
  durationMs?: number;
};

export type GameConfirmPayload = {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  resolve: (confirmed: boolean) => void;
};

export const showGameNotice = (
  message: string,
  options: Omit<GameNoticePayload, "message"> = {},
) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<GameNoticePayload>(GAME_NOTICE_EVENT, {
      detail: {
        message,
        tone: options.tone ?? "info",
        durationMs: options.durationMs ?? 3000,
      },
    }),
  );
};

export const askGameConfirm = (
  message: string,
  options: Omit<GameConfirmPayload, "message" | "resolve"> = {},
) => {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  return new Promise<boolean>((resolve) => {
    window.dispatchEvent(
      new CustomEvent<GameConfirmPayload>(GAME_CONFIRM_EVENT, {
        detail: {
          message,
          confirmLabel: options.confirmLabel,
          cancelLabel: options.cancelLabel,
          resolve,
        },
      }),
    );
  });
};
