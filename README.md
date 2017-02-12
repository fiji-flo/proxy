# proxy - route your sub-domains to services + https

## Install

Clone the repository:
```
$ git clone https://github.com/fiji-flo/proxy.git
```

Write a `config.json` with your ssl certificates and routes. See [Configuration](#configuration)

The `install.sh` script will:

* install dependencies (`npm install`)
* create a `proxy.service` file for systemd
* create a symlink to the service for systemd (requires root permissions)

Simply run the script:
```
$ ./install.sh
```

After wards you can start the service via systemd:
```
$ sudo systemctl start proxy.service
```

To see if everything is fine check:
```
$ sudo systemctl status proxy.service
```

In order to start the service automatically after reboot run:
```
$ sudo systemctl enable proxy.service
```

## Configuration

The configuration file has to be placed in the repository directory and named `config.json`.

The content of the file must be a simple JSON object:

```
{
  "rules": {
    "subdomain.example.com": "http://127.0.0.1:8888",
    "external.example.com": "https://www.google.com"
  }.
  "ssl": {
    "key": "/etc/letsencrypt/live/example.com/privkey.pem",
    "cert": "/etc/letsencrypt/live/example.com/fullchain.pem",
    "ca": "/etc/letsencrypt/live/example.com/chain.pem"
  },
  "forceHttps": true
}
```

## TODO

This is just small service I use to orchestrate my sub-domains. I'll try to clean it up a
little more and explain how to set-up https with [Let's Encrypt](https://letsencrypt.org/).

Things I'm aware about:

* add a configurable fallback service (right now 500 + default message)
* make it more robust
* optional logging
* be more verbose when something is missing at startup
