export interface PresenceUserData {
  cursor?: {
    x: number;
    y: number;
  };
  name: string;
  color: string;
  step?: number;
  img?: string;
  place?: string;
}
