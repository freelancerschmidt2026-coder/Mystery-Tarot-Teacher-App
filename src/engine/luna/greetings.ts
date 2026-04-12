import { LunaProfile, Member } from "../../types/luna";

/**
 * Luna Greeting Logic
 * Handles personalized greetings for members and special greetings for the GateKeeper.
 */

export interface GreetingInput {
  member: Member;
  profile: LunaProfile;
  isGateKeeper?: boolean;
}

export function generateLunaGreeting(input: GreetingInput): string {
  const { member, profile, isGateKeeper } = input;

  // 1. GateKeeper Greeting (Jennifer only)
  if (isGateKeeper) {
    return "Hello, GateKeeper Jennifer. Creator of the Keys. I am here for your every need.";
  }

  const name = member.mysteryName || member.displayName;

  // 2. First-time greeting (hasMetLuna === false)
  if (!member.hasMetLuna) {
    return `Hello, ${name}. Welcome to Mystery Tarot Teacher. My name is Luna, and I will be your trusted teacher, guide, designer, and confidant on your journey with us. How can I help you today?`;
  }

  // 3. Returning greeting (hasMetLuna === true)
  return `Hello again, ${name}. Are you interested in hearing some tarot jargon, a tarot joke, or a little light information on tarot today?`;
}

/**
 * Escalation Line
 * Used when Luna detects something beyond her scope.
 */
export function generateEscalationLine(member: Member): string {
  const name = member.mysteryName || member.displayName;
  return `This feels bigger than what I can hold alone, ${name}. I will call the GateKeeper for you.`;
}
