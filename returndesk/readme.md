# ReturnDesk: Dead Letter Queue

ReturnDesk is a two-machine Linux lab built around a realistic support portal and an internal archive node. The challenge starts from the externally reachable `returndesk-web` host and leads into the internal-only `archive-node` host through a chained compromise.

The lab focuses on common offensive security themes: exposed release artifacts, leaked application secrets, Flask session forgery, unsafe YAML handling, privilege escalation through a root-run timer job, credential recovery from process memory, internal pivoting, and Sudo PATH hijacking.

## Lab Layout

- `returndesk-web`: public-facing Ubuntu 22.04 host with SSH and HTTP exposed.
- `archive-node`: internal Ubuntu 22.04 host reachable only from `returndesk-web`.
- `artifacts/`: build assets for both machines.
- `build-guide.md`: setup notes, machine details, credentials, and flag locations.
- `walkthrough.md`: intended exploitation path.
- `autopwn.py`: automated validation script for the full chain.

## Flags

Each machine includes a local user flag and a root proof flag:

- Local flags: `/home/<user>/local.txt`
- Root proof flags: `/root/proof.txt`

## Build

The lab can be built with the provided artifact directories. See `build-guide.md` for the exact machine configuration and build steps.

## Notes

This lab is intended for controlled training and review environments only. The vulnerable behaviors are deliberate and should not be reused in production systems.
