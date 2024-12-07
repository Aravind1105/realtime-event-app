export type EventProps = {
  id?: number;
  title: string;
  organizer: string;
  date_time: string;
  duration: number;
  location: string;
  message?: string;
  joiners?: string[];
  isCancelled?: boolean;
};

export enum UserRole {
  CREATOR = "creator",
  JOINER = "joiner",
}

export type User = {
  role: UserRole;
  name: string;
};

export type SocketResponse = {
  event_id: number;
  joiners?: string[];
};
