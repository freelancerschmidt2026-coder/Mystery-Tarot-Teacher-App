import { 
  Member, 
  LunaProfile, 
  NotePadPage, 
  BackPocketItem,
  ActivationInfo
} from "../types/luna";

/**
 * GateKeeper CRM API Structure
 * Private API for Jennifer to manage all members.
 */

export class GateKeeperCRM {
  private static instance: GateKeeperCRM;
  private members: Member[] = [];
  private profiles: LunaProfile[] = [];
  private backPocketItems: BackPocketItem[] = [];
  private payments: any[] = []; // Mock payments structure
  private activations: Record<string, ActivationInfo> = {}; // Store activation info

  private constructor() {}

  public static getInstance(): GateKeeperCRM {
    if (!GateKeeperCRM.instance) {
      GateKeeperCRM.instance = new GateKeeperCRM();
    }
    return GateKeeperCRM.instance;
  }

  /**
   * Creating a member
   */
  public async createMember(member: Member): Promise<Member> {
    this.members.push(member);
    return member;
  }

  /**
   * Activating a member
   */
  public async activateMember(memberId: string): Promise<ActivationInfo> {
    const activation: ActivationInfo = {
      activatedAt: new Date().toISOString(),
      activatedByLink: true,
      memberId
    };
    this.activations[memberId] = activation;
    return activation;
  }

  /**
   * Getting activation info
   */
  public async getActivationInfo(memberId: string): Promise<ActivationInfo | undefined> {
    return this.activations[memberId];
  }

  /**
   * Viewing all members
   */
  public async getAllMembers(): Promise<Member[]> {
    try {
      const res = await fetch('/api/gatekeeper/members');
      const data = await res.json();
      if (data.members) {
        // Sync local cache
        this.members = data.members;
        return data.members;
      }
      return this.members;
    } catch (error) {
      console.error('CRM fetch error:', error);
      return this.members;
    }
  }

  /**
   * Viewing a member's NotePad
   */
  public async getMemberNotePad(memberId: string): Promise<NotePadPage[]> {
    const res = await fetch(`/api/members/${memberId}/notepad`);
    return await res.json();
  }

  /**
   * Viewing a member's BackPocket
   */
  public async getMemberBackPocket(memberId: string): Promise<BackPocketItem[]> {
    const res = await fetch(`/api/members/${memberId}/backpocket`);
    return await res.json();
  }

  /**
   * Viewing a member's LunaProfile
   */
  public async getMemberLunaProfile(memberId: string): Promise<LunaProfile | undefined> {
    const res = await fetch(`/api/members/${memberId}/profile`);
    const data = await res.json();
    return data.error ? undefined : data;
  }

  /**
   * Viewing payments
   */
  public async getMemberPayments(memberId: string): Promise<any[]> {
    return this.payments.filter(payment => payment.memberId === memberId);
  }

  /**
   * Adding BackPocket items
   */
  public async addBackPocketItem(memberId: string, label: string, description: string, type: any): Promise<BackPocketItem> {
    const newItem: BackPocketItem = {
      id: `item_${Date.now()}`,
      memberId,
      label,
      description,
      type,
      createdAt: new Date().toISOString(),
      metadata: {}
    };
    this.backPocketItems.push(newItem);
    return newItem;
  }

  /**
   * Adding NotePad pages
   */
  public async addNotePadPage(memberId: string, title: string, content: string, type: any): Promise<NotePadPage> {
    const newPage: NotePadPage = {
      id: `page_${Date.now()}`,
      memberId,
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pageNumber: 0, // In a real app, this would be calculated
      type
    };
    // Logic to add to member's notepad
    return newPage;
  }

  /**
   * Charging members
   */
  public async chargeMember(memberId: string, amount: number, description: string): Promise<any> {
    const payment = {
      id: `payment_${Date.now()}`,
      memberId,
      amount,
      description,
      status: "completed",
      createdAt: new Date().toISOString()
    };
    this.payments.push(payment);
    return payment;
  }
}
