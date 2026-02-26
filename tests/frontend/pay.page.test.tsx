import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PayPage from "@/app/pay/page";
import { sendMoney } from "@/lib/api/user/wallet";
import { toast } from "react-toastify";

const getMock = jest.fn();

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: getMock }),
}));

jest.mock("@/lib/api/user/wallet", () => ({
  sendMoney: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { success: jest.fn() },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("PayPage", () => {
  let setTimeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    setTimeoutSpy = jest.spyOn(global, "setTimeout");
    getMock.mockImplementation((key: string) => {
      if (key === "mobile") return "9812345678";
      if (key === "name") return "Receiver%20Name";
      if (key === "amount") return "100";
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    setTimeoutSpy.mockRestore();
    jest.useRealTimers();
  });

  it("prefills values from query params", async () => {
    render(<PayPage />);

    await waitFor(() =>
      expect(screen.getByDisplayValue("9812345678")).toBeInTheDocument()
    );
    expect(screen.getByDisplayValue("100")).toBeInTheDocument();
    expect(screen.getByText("Sending to Receiver Name (9812345678)")).toBeInTheDocument();
  });

  it("shows required validation error", async () => {
    getMock.mockReturnValue("");
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PayPage />);

    await user.click(screen.getByRole("button", { name: "Send money" }));

    expect(
      screen.getByText("Mobile number and amount are required.")
    ).toBeInTheDocument();
  });

  it("shows mobile length validation", async () => {
    getMock.mockImplementation((key: string) => {
      if (key === "mobile") return "9800";
      if (key === "amount") return "100";
      return "";
    });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PayPage />);
    await user.click(screen.getByRole("button", { name: "Send money" }));

    expect(screen.getByText("Mobile number should be 10 digits.")).toBeInTheDocument();
  });

  it("shows amount validation", async () => {
    getMock.mockImplementation((key: string) => {
      if (key === "mobile") return "9812345678";
      if (key === "amount") return "0";
      return "";
    });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PayPage />);
    await user.click(screen.getByRole("button", { name: "Send money" }));

    expect(screen.getByText("Amount must be greater than 0.")).toBeInTheDocument();
  });

  it("submits and redirects on success", async () => {
    (sendMoney as jest.Mock).mockResolvedValue({ data: { amount: 100, balance: 999 } });
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PayPage />);

    await user.type(screen.getByPlaceholderText("Remarks"), "test");
    await user.click(screen.getByRole("button", { name: "Send money" }));

    await waitFor(() =>
      expect(sendMoney).toHaveBeenCalledWith({
        toMobileNumber: "9812345678",
        amount: 100,
        remarks: "test",
      })
    );
    expect(toast.success).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 500);
  });

  it("shows API error when transfer fails", async () => {
    (sendMoney as jest.Mock).mockRejectedValue(new Error("Transfer failed"));
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PayPage />);

    await user.click(screen.getByRole("button", { name: "Send money" }));

    await waitFor(() => expect(screen.getByText("Transfer failed")).toBeInTheDocument());
  });
});
