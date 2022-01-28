import * as U from "./utils";

test("getCommand", () => {
  expect(U.getCommand("setHosts")).toEqual("namecheap.domains.dns.setHosts");
});
