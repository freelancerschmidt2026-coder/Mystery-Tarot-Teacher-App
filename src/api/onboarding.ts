import { Member } from "../types/luna";

export async function apiSignup(payload: {
  email: string;
  password: string;
  displayName: string;
  subscriptionTier: string;
}): Promise<{ member: Member }> {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) throw new Error("Signup failed");
  const data = await res.json();
  
  // After signup, send confirmation email
  await apiSendConfirmationEmail(data.member);
  
  return { member: data.member };
}

export async function apiSendConfirmationEmail(member: Member): Promise<void> {
  const res = await fetch("/api/sendConfirmationEmail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      memberId: member.id,
      email: member.email,
      displayName: member.displayName
    }),
  });
  
  if (!res.ok) throw new Error("Failed to send confirmation email");
}

export async function apiActivateMember(memberId: string): Promise<Member> {
  const res = await fetch(`/api/activateMember/${memberId}`, {
    method: "POST",
  });
  
  if (!res.ok) throw new Error("Activation failed");
  const data = await res.json();
  return data.member;
}
