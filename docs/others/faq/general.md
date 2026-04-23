# General FAQ

## Account

### Q: I cannot login. What should I check first?

- Verify username/password or verification code validity
- Confirm account status is not locked/disabled
- Check SSO binding if enterprise login is enabled

### Q: How do I reset my password?

- Use the `Forgot password` flow (if enabled), or contact admin to reset in admin portal.

## Deployment

### Q: Installation fails due to image pull errors.

- Confirm registry network connectivity
- Verify registry credentials and certificate trust
- Check node DNS and time synchronization (NTP)

## Usage

### Q: Model requests are slow. How to troubleshoot?

- Check resource utilization (GPU/CPU/memory)
- Review request logs and error rate
- Validate concurrency and quota policies
