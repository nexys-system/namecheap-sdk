import { XMLParser } from "fast-xml-parser";
import * as U from "./utils";
import * as T from "./type";

export const parser = new XMLParser({ ignoreAttributes: false });

export const parseHosts = (requestOut: string): T.Host[] => {
  const {
    ApiResponse: {
      CommandResponse: {
        DomainDNSGetHostsResult: { host },
      },
    },
  } = parser.parse(requestOut) as T.Out;

  return host.map(U.toHost);
};
