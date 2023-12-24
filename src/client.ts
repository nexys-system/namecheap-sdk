import * as T from "./type";
import * as U from "./utils";
import { parseHosts } from "./parse";

class NamecheapClient {
  paramsWoCommand: Omit<T.ParamsCore, "Command">;
  host: string;
  path: string;

  constructor({
    username,
    apiKey,
    clientIp,
    host = "https://api.namecheap.com",
    path = "/xml.response",
  }: {
    username: string;
    apiKey: string;
    clientIp: string;
    host?: string;
    path?: string;
  }) {
    this.paramsWoCommand = {
      ApiUser: username,
      ApiKey: apiKey,
      UserName: username,
      ClientIp: clientIp,
    };

    this.host = host;
    this.path = path;
  }

  getUrl = (extraParams: { [p: string]: string }): string =>
    U.getUrl(this.host, this.path, { ...this.paramsWoCommand, ...extraParams });

  /**
   * get list of hosts for a domain
   * @param sld
   * @param tld
   * @returns
   */
  getHosts = async ({ SLD, TLD }: T.Domain): Promise<T.Host[]> => {
    const url = this.getUrl({ SLD, TLD, Command: U.getCommand("getHosts") });
    const { body } = await U.request(url);

    return parseHosts(body);
  };

  setHosts = async (
    { SLD, TLD }: T.Domain,
    hosts: T.SetHostUnit[],
    EmailType: T.EmailType = "MX" // by default custom MX
  ): Promise<{ body: string; status: number }> => {
    const params: { [k: string]: string } = {
      SLD,
      TLD,
      EmailType,
      Command: U.getCommand("setHosts"),
    };

    // add suffix to keys and add to the list of params
    hosts.forEach((host, i) =>
      Object.entries(host).map(([k, v]) => {
        params[[k, i + 1].join("")] = String(v);
      })
    );

    // here turn GET into POST?
    // examples are not given
    const url = this.getUrl(params);

    return U.request(url);
  };

  /**
   * add hosts to the existing hosts
   * @param domain
   * @param hosts
   * @returns
   */
  addHosts = async (
    domain: T.Domain,
    hosts: T.SetHostUnit[]
  ): Promise<{ body: string; status: number }> => {
    if (hosts.length === 0) {
      throw Error("hosts must not be empty");
    }

    // fetch existing hosts
    const existingHosts = await this.getHosts(domain);
    const existingHostsFormatted = U.toSetHostUnits(existingHosts);
    // merge existing hosts and new hosts
    const allHosts = [...existingHostsFormatted, ...hosts];

    return this.setHosts(domain, allHosts);
  };

  deleteHosts = async (domain: T.Domain, hostIds: string[]) => {
    if (hostIds.length === 0) {
      throw Error("hosts must not be empty");
    }

    // fetch existing hosts
    const existingHosts = await this.getHosts(domain);

    const hostsToBeReAdded = existingHosts.filter(
      (x) => !hostIds.includes(x.HostId)
    );

    return this.setHosts(domain, U.toSetHostUnits(hostsToBeReAdded));
  };

  updateHosts = async (
    domain: T.Domain,
    hostsToBeUpdated: { [id: string]: T.SetHostUnit }
  ) => {
    const hostIds = Object.keys(hostsToBeUpdated);

    if (hostIds.length === 0) {
      throw Error("hosts must not be empty");
    }

    // fetch existing hosts
    const existingHosts = await this.getHosts(domain);

    const hostsWithUpdate = existingHosts.map((host) => {
      if (hostIds.includes(host.HostId)) {
        return hostsToBeUpdated[host.HostId];
      }

      return U.toSetHostUnit(host);
    });

    return this.setHosts(domain, hostsWithUpdate);
  };
}

export default NamecheapClient;
