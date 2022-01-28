export interface ParamsCore {
  ApiUser: string;
  ApiKey: string;
  UserName: string;
  Command: string;
  ClientIp: string;
}

export type Command = "getHosts" | "setHosts";

export interface Domain {
  SLD: string;
  TLD: string;
}

export interface Out {
  ApiResponse: {
    CommandResponse: {
      DomainDNSGetHostsResult: { host: HostOut[] };
    };
  };
}

export interface HostOut {
  "@_HostId": string;
  "@_Name": string;
  "@_Type": RecordType;
  "@_Address": string;
  "@_MXPref": string;
  "@_TTL": string;
  "@_AssociatedAppTitle": string;
  "@_FriendlyName": string;
  "@_IsActive": string;
  "@_IsDDNSEnabled": string;
}

export type RecordType =
  | "A"
  | "AAAA"
  | "ALIAS"
  | "CAA"
  | "CNAME"
  | "MX"
  | "MXE"
  | "NS"
  | "TXT"
  | "URL"
  | "URL301"
  | "FRAME";

export type EmailType =
  | "MXE" // mxe record
  | "MX" // custom ?
  | "FWD" // forward
  | "OX"; // private?

// see https://www.namecheap.com/support/api/methods/domains-dns/set-hosts/
export interface SetHost {
  SLD: string;
  TLD: string;
  EmailType: EmailType;
  Flag?: string;
  Tag?: string;
}

export interface Host {
  HostId: string;
  Name: string;
  Type: RecordType;
  Address: string;
  MXPref: string;
  TTL: string;
  AssociatedAppTitle: string;
  FriendlyName: string;
  IsActive: string;
  IsDDNSEnabled: string;
}

export interface SetHostUnit {
  HostName: string;
  RecordType: RecordType;
  Address: string;
  MXPref: string;
  TTL?: string;
}
