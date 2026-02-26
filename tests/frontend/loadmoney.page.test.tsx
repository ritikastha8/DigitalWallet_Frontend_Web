import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoadMoneyPage from "@/app/user/dashboard/loadmoney/page";
import { loadMoney } from "@/lib/api/user/wallet";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/lib/api/user/wallet", () => ({
  loadMoney: jest.fn(),
}));

describe("LoadMoneyPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders key form fields", () => {
    render(<LoadMoneyPage />);
    expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Remarks")).toBeInTheDocument();
  });

  it("sanitizes mobile input to digits only", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<LoadMoneyPage />);

    const mobileInput = screen.getByPlaceholderText("Mobile Number") as HTMLInputElement;
    await user.type(mobileInput, "98ab12!34");

    expect(mobileInput.value).toBe("981234");
  });

  it("submits form with numeric amount", async () => {
    (loadMoney as jest.Mock).mockResolvedValue({ data: { balance: 5000 } });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<LoadMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "450");
    await user.type(screen.getByPlaceholderText("Remarks"), "Top up");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    await waitFor(() =>
      expect(loadMoney).toHaveBeenCalledWith({
        mobileNumber: "9812345678",
        amount: 450,
        remarks: "Top up",
      })
    );
  });

  it("shows success message and redirects", async () => {
    (loadMoney as jest.Mock).mockResolvedValue({ data: { balance: 9000 } });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<LoadMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "300");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    await waitFor(() =>
      expect(screen.getByText("Wallet balance: NPR 9000")).toBeInTheDocument()
    );

    jest.advanceTimersByTime(401);
    expect(pushMock).toHaveBeenCalledWith("/user/dashboard");
  });

  it("shows API error message", async () => {
    (loadMoney as jest.Mock).mockRejectedValue(new Error("Insufficient bank balance"));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<LoadMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "100");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    await waitFor(() =>
      expect(screen.getByText("Insufficient bank balance")).toBeInTheDocument()
    );
  });
});

