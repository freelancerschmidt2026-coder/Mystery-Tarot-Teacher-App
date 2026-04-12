import { Member } from "../types/luna";

export function buildActivationEmail(member: Member) {
  const activationLink = `${window.location.origin}/activate/${member.id}`;
  const subject = `Welcome, ${member.displayName} — Your Journey Begins`;

  const body = `
Hello, ${member.displayName}.
Your path has opened.

Click your Member ID below to enter your Mystery Tarot Teacher App:

Member ID: MTT-${member.id}
Activation link: ${activationLink}

When you enter, Luna will be waiting for you.

— Luna
  `.trim();

  return { subject, body };
}
