import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SendMoneyPage from "@/app/user/dashboard/sendmoney/page";
import { sendMoney } from "@/lib/api/user/wallet";
import { toast } from "react-toastify";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/lib/api/user/wallet", () => ({
  sendMoney: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

describe("SendMoneyPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("shows required validation error when fields are empty", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SendMoneyPage />);

    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    expect(
      screen.getByText("Mobile number and amount are required.")
    ).toBeInTheDocument();
    expect(sendMoney).not.toHaveBeenCalled();
  });

  it("shows validation for invalid mobile length", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SendMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9800");
    await user.type(screen.getByPlaceholderText("Amount"), "100");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    expect(
      screen.getByText("Mobile number should be 10 digits.")
    ).toBeInTheDocument();
    expect(sendMoney).not.toHaveBeenCalled();
  });

  it("shows validation when amount is zero", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SendMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "0");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    expect(screen.getByText("Amount must be greater than 0.")).toBeInTheDocument();
    expect(sendMoney).not.toHaveBeenCalled();
  });

  it("submits payload and redirects on success", async () => {
    (sendMoney as jest.Mock).mockResolvedValue({
      data: { amount: 250, to: "9812345678", balance: 1200 },
    });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SendMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "250");
    await user.type(screen.getByPlaceholderText("Remarks"), "Lunch");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    await waitFor(() =>
      expect(sendMoney).toHaveBeenCalledWith({
        toMobileNumber: "9812345678",
        amount: 250,
        remarks: "Lunch",
      })
    );
    expect(toast.success).toHaveBeenCalled();

    jest.advanceTimersByTime(401);
    expect(pushMock).toHaveBeenCalledWith("/user/dashboard");
  });

  it("shows backend error message on failure", async () => {
    (sendMoney as jest.Mock).mockRejectedValue(new Error("Receiver wallet not found"));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<SendMoneyPage />);

    await user.type(screen.getByPlaceholderText("Mobile Number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Amount"), "100");
    await user.click(screen.getByRole("button", { name: "PROCEED" }));

    await waitFor(() =>
      expect(screen.getByText("Receiver wallet not found")).toBeInTheDocument()
    );
  });
});

