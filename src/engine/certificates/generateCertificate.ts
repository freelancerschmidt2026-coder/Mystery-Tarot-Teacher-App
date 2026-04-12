export interface CertificateData {
  memberName: string;
  suitName: string;
  masteryPercentage: number;
  completionDate: number;
  lunaSignature: string;
  gatekeeperSignature: string;
  certificateId: string;
}

export const generateCertificate = (
  memberName: string,
  suitName: string,
  masteryPercentage: number
): CertificateData => {
  const timestamp = Date.now();
  const uniqueId = `${timestamp}-${Math.floor(Math.random() * 1000000)}`;

  return {
    memberName,
    suitName,
    masteryPercentage,
    completionDate: timestamp,
    lunaSignature: "Luna ✦",
    gatekeeperSignature: "The Gatekeeper",
    certificateId: uniqueId,
  };
};
