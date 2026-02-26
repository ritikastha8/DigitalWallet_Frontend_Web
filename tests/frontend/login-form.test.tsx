import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import { handleLogin } from "@/lib/actions/users/auth-action";

const replaceMock = jest.fn();
const getMock = jest.fn();
const setUserMock = jest.fn();
const setIsAuthenticatedMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: replaceMock }),
  useSearchParams: () => ({ get: getMock }),
}));

jest.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    setUser: setUserMock,
    setIsAuthenticated: setIsAuthenticatedMock,
  }),
}));

jest.mock("@/lib/actions/users/auth-action", () => ({
  handleLogin: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getMock.mockReturnValue(null);
  });

  it("shows zod validation for empty submit", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole("button", { name: "Log In" }));

    expect(screen.getByText("Mobile number must be at least 10 digits")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
    expect(handleLogin).not.toHaveBeenCalled();
  });

  it("sanitizes mobile input to digits", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const mobile = screen.getByPlaceholderText("Enter your mobile number") as HTMLInputElement;
    await user.type(mobile, "98ab12!");
    expect(mobile.value).toBe("9812");
  });

  it("submits and redirects user role to dashboard", async () => {
    (handleLogin as jest.Mock).mockResolvedValue({
      success: true,
      data: { role: "user", name: "A" },
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => expect(handleLogin).toHaveBeenCalled());
    expect(setUserMock).toHaveBeenCalledWith({ role: "user", name: "A" });
    expect(setIsAuthenticatedMock).toHaveBeenCalledWith(true);
    expect(replaceMock).toHaveBeenCalledWith("/user/dashboard");
  });

  it("redirects admin to from path when safe", async () => {
    getMock.mockReturnValue("/admin/users");
    (handleLogin as jest.Mock).mockResolvedValue({
      success: true,
      data: { role: "admin" },
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith("/admin/users"));
  });

  it("shows backend error on login failure", async () => {
    (handleLogin as jest.Mock).mockResolvedValue({
      success: false,
      message: "Invalid credentials",
    });
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.click(screen.getByRole("button", { name: "Log In" }));

    await waitFor(() => expect(screen.getByText("Invalid credentials")).toBeInTheDocument());
  });
});

