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

export interface workFigma {
  figmaSectionId: string | number;
  sectionUrl: string;
  refreshId: string;
  name: string;
}
