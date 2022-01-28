# Namecheap SDK

[![npm version](https://img.shields.io/npm/v/@nexys/namecheap.svg)](https://www.npmjs.com/package/@nexys/namecheap)
[![Build and Test Package](https://github.com/nexys-system/namecheap-sdk/actions/workflows/test.yml/badge.svg)](https://github.com/nexys-system/namecheap-sdk/actions/workflows/test.yml)
[![Publish](https://github.com/nexys-system/namecheap-sdk/actions/workflows/publish.yml/badge.svg)](https://github.com/nexys-system/namecheap-sdk/actions/workflows/publish.yml)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Bundlephobia](https://badgen.net/bundlephobia/min/@nexys/namecheap)](https://bundlephobia.com/result?p=@nexys/namecheap)

## Get Started

```
import NamecheapClient from '@nexys/namecheap';

const username = "xx";
const apiKey = "xx";
const clientIp = "xx";

const c = new NamecheapClient({ username, apiKey, clientIp });

// available methods
c.getHosts()
c.setHosts()
c.addHosts()
c.deleteHosts()
```

## Namecheap official documentation

https://www.namecheap.com/support/api/methods/domains-dns/set-hosts/
