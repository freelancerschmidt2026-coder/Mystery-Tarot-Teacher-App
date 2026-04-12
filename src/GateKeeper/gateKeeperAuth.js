/**
 * GateKeeper Authentication Logic (Temporary for Development)
 */

const GATEKEEPER_PROFILE = {
  name: "Jennifer",
  role: "GateKeeper",
  email: "jennifer@mysterytarot.com",
  passphrase: "luna-gatekeeper-2026"
};

export const authenticateGateKeeper = (name, email, passphrase) => {
  if (
    name === GATEKEEPER_PROFILE.name &&
    email === GATEKEEPER_PROFILE.email &&
    passphrase === GATEKEEPER_PROFILE.passphrase
  ) {
    return { authenticated: true, role: "GateKeeper", profile: GATEKEEPER_PROFILE };
  }
  return { authenticated: false };
};
