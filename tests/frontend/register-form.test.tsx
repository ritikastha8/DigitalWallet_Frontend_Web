import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "@/app/(auth)/_components/RegisterForm";
import { handleRegister } from "@/lib/actions/users/auth-action";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("@/lib/actions/users/auth-action", () => ({
  handleRegister: jest.fn(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByText("Mobile number must be at least 10 digits")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();
    expect(screen.getByText("Password must be at least 6 characters")).toBeInTheDocument();
  });

  it("sanitizes mobile input to digits only", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const mobile = screen.getByPlaceholderText("Enter your mobile number") as HTMLInputElement;
    await user.type(mobile, "98ab12!!");
    expect(mobile.value).toBe("9812");
  });

  it("shows password mismatch error", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText("Enter your full name"), "Test User");
    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your email address"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.type(screen.getByPlaceholderText("Enter your Confirm password"), "secret2");
    await user.click(screen.getByLabelText(/I agree to the/i));
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() =>
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument()
    );
  });

  it("submits valid payload and redirects to login", async () => {
    (handleRegister as jest.Mock).mockResolvedValue({ success: true });
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText("Enter your full name"), "Test User");
    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your email address"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.type(screen.getByPlaceholderText("Enter your Confirm password"), "secret1");
    await user.click(screen.getByLabelText(/I agree to the/i));
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() =>
      expect(handleRegister).toHaveBeenCalledWith({
        name: "Test User",
        mobileNumber: "9812345678",
        email: "test@example.com",
        password: "secret1",
        confirmPassword: "secret1",
        terms: true,
      })
    );
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("shows backend error message", async () => {
    (handleRegister as jest.Mock).mockResolvedValue({
      success: false,
      message: "Mobile already exists",
    });
    const user = userEvent.setup();
    render(<RegisterForm />);

    await user.type(screen.getByPlaceholderText("Enter your full name"), "Test User");
    await user.type(screen.getByPlaceholderText("Enter your mobile number"), "9812345678");
    await user.type(screen.getByPlaceholderText("Enter your email address"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Enter your password"), "secret1");
    await user.type(screen.getByPlaceholderText("Enter your Confirm password"), "secret1");
    await user.click(screen.getByLabelText(/I agree to the/i));
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() =>
      expect(screen.getByText("Mobile already exists")).toBeInTheDocument()
    );
  });
});

