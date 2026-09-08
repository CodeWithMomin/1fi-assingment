import { useState, type FormEvent } from "react";
import { Arrow, BrandLogo } from "../components/BrandLogo";
import backgroundImage from "../../UIdesigns/Background.png";

type LoginPageProps = {
  onBack: () => void;
  onSuccess: () => void;
};

export function LoginPage({ onBack, onSuccess }: LoginPageProps) {
  const [mobile, setMobile] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mobile.length < 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!accepted) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }
    setError(null);
    onSuccess();
  };

  return (
    <main className="login-screen">
      <div className="login-layout">
        <div className="login-visual" style={{ backgroundImage: `url(${backgroundImage})` }} aria-label="Shop today, pay later using mutual funds" />
        <section className="login-form-column">
          <button className="login-back" onClick={onBack} aria-label="Back to home">←</button>
          <div className="login-panel">
            <BrandLogo />
            <p className="eyebrow">WELCOME TO 1FI</p>
            <h1>Mobile Number</h1>
            <p className="login-copy">Enter the number linked to your investments</p>
            <form onSubmit={submitLogin}>
              <label className="phone-input"><span>+91</span><input value={mobile} onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="Enter mobile number" inputMode="numeric" aria-label="Mobile number" /></label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <label className="terms"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} /><span>I agree with <b>Terms</b> and <b>Privacy Policy</b></span></label>
              <button className="primary-button login-button" type="submit">Proceed <Arrow /></button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
