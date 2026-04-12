import { 
  LunaReading, 
  NotePadPage, 
  Member,
  LunaProfile
} from "../types/luna";

/**
 * Luna Reading Save + Index System
 * Manages the NotePad and indexing process.
 */

export class LunaService {
  private static instance: LunaService;
  private readings: LunaReading[] = [];
  private pages: NotePadPage[] = [];
  private currentMember: Member = {
    id: "member_123",
    displayName: "Jennifer",
    email: "jennifer@example.com",
    pronouns: "she/her",
    createdAt: new Date().toISOString(),
    lunaProfileId: "profile_123",
    isActivated: true,
    hasMetLuna: false
  };

  private constructor() {}

  public getCurrentMember(): Member {
    return this.currentMember;
  }

  public setMember(member: Member) {
    this.currentMember = member;
  }

  /**
   * Initializing a member's journey
   */
  public async initializeMember(memberId: string) {
    // 1. Create NotePad index (Page 1)
    await this.rebuildIndex(memberId);
    
    // 2. Initialize LunaProfile (this would normally be done in a database)
    // For now, we'll assume it's handled by the evolution engine or similar
  }

  public static getInstance(): LunaService {
    if (!LunaService.instance) {
      LunaService.instance = new LunaService();
    }
    return LunaService.instance;
  }

  /**
   * Saving a reading
   */
  public async saveReading(member: Member, title: string, content: string, summary: string, tags: string[]): Promise<LunaReading> {
    const memberId = member.id;
    
    // Get current pages to determine next page number
    const pages = await this.getPages(memberId);
    const nextPageNumber = pages.length > 0 
      ? Math.max(...pages.map(p => p.pageNumber)) + 1 
      : 2;

    const newReading: LunaReading = {
      id: `reading_${Date.now()}`,
      memberId,
      title,
      summary,
      content,
      createdAt: new Date().toISOString(),
      tags,
      pageNumber: nextPageNumber
    };

    // Save to backend
    await fetch(`/api/members/${memberId}/notepad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content: `Summary: ${summary}\n\n${content}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        pageNumber: nextPageNumber,
        type: "reading",
        linkedReadingId: newReading.id
      })
    });

    return newReading;
  }

  /**
   * Rebuilding the index (Now just fetches or updates)
   */
  public async rebuildIndex(memberId: string): Promise<NotePadPage> {
    const pages = await this.getPages(memberId);
    let indexPage = pages.find(p => p.pageNumber === 1);
    
    // Logic to generate content...
    let indexContent = "# NotePad Index\n\nWelcome to your personal journey index.\n\n";
    pages.filter(p => p.type === 'reading').forEach(p => {
      indexContent += `- Page ${p.pageNumber}: **${p.title}**\n`;
    });

    if (indexPage) {
      // Update existing index
      indexPage.content = indexContent;
    } else {
      // Create new index
      const res = await fetch(`/api/members/${memberId}/notepad`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Journey Index",
          content: indexContent,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          pageNumber: 1,
          type: "index"
        })
      });
      indexPage = await res.json();
    }

    return indexPage!;
  }

  public async getPages(memberId: string): Promise<NotePadPage[]> {
    const res = await fetch(`/api/members/${memberId}/notepad`);
    const pages = await res.json();
    return pages.sort((a: any, b: any) => a.pageNumber - b.pageNumber);
  }

  public async getPage(memberId: string, pageNumber: number): Promise<NotePadPage | undefined> {
    const pages = await this.getPages(memberId);
    return pages.find(p => p.pageNumber === pageNumber);
  }

  public async getProfile(memberId: string): Promise<LunaProfile> {
    const res = await fetch(`/api/members/${memberId}/profile`);
    return await res.json();
  }

  public async markMetLuna(memberId: string): Promise<void> {
    await fetch(`/api/members/${memberId}/met-luna`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    this.currentMember.hasMetLuna = true;
  }

  public async evolveProfile(memberId: string, updates: Partial<LunaProfile>): Promise<LunaProfile> {
    const res = await fetch(`/api/members/${memberId}/profile/evolve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await res.json();
  }
}
