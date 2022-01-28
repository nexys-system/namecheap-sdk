import * as T from "./type";

export const toHost = (h: T.HostOut) => ({
  HostId: h["@_HostId"],
  Name: h["@_Name"],
  Type: h["@_Type"],
  Address: h["@_Address"],
  MXPref: h["@_MXPref"],
  TTL: h["@_TTL"],
  AssociatedAppTitle: h["@_AssociatedAppTitle"],
  FriendlyName: h["@_FriendlyName"],
  IsActive: h["@_IsActive"],
  IsDDNSEnabled: h["@_IsDDNSEnabled"],
});

export const toSetHostUnit = (x: T.Host): T.SetHostUnit => ({
  HostName: x.Name,
  RecordType: x.Type,
  MXPref: x.MXPref,
  TTL: x.TTL,
  Address: x.Address,
});

export const toSetHostUnits = (r: T.Host[]): T.SetHostUnit[] =>
  r.map(toSetHostUnit);

export const getCommand = (c: T.Command) => "namecheap.domains.dns." + c;

export const getParamsString = (params: { [p: string]: string }) =>
  Object.entries(params)
    .map(([k, v]) => [k, encodeURIComponent(v)].join("="))
    .join("&");

export const getUrl = (
  host: string,
  path: string,
  params: { [p: string]: string }
): string => host + path + "?" + getParamsString(params);
