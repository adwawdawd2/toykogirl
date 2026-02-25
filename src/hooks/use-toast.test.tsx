import * as React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { __toastTestUtils, toast, useToast } from "@/hooks/use-toast";

function HookHarness() {
  useToast();
  return <div>hook</div>;
}

describe("useToast", () => {
  it("keeps a stable listener registration across toast updates", async () => {
    const view = render(<HookHarness />);

    await waitFor(() => {
      expect(__toastTestUtils.getListenersCount()).toBe(1);
    });

    let instance!: ReturnType<typeof toast>;
    await act(async () => {
      instance = toast({ title: "first" });
    });

    await waitFor(() => {
      expect(__toastTestUtils.getListenersCount()).toBe(1);
    });

    await act(async () => {
      instance.update({ id: instance.id, title: "update-1" });
      instance.update({ id: instance.id, title: "update-2" });
    });

    await waitFor(() => {
      expect(__toastTestUtils.getListenersCount()).toBe(1);
    });

    await act(async () => {
      view.unmount();
    });

    await waitFor(() => {
      expect(__toastTestUtils.getListenersCount()).toBe(0);
    });
  });
});
