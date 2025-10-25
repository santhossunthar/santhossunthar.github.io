---
id: "5"
title: "Python Security Tools for Penetration Testing"
date: "2023-12-28"
category: "Security"
tags: ["Python", "Security", "Penetration Testing"]
readTime: "20 min read"
author: "Santhos Suntharalingam"
featured: false
---

# Python Security Tools for Penetration Testing

A collection of powerful Python tools and libraries for security testing and penetration testing.

## 1. Network Scanning

### Nmap Python Integration
```python
import nmap

def scan_ports(target, ports):
    nm = nmap.PortScanner()
    nm.scan(target, ports)
    
    for host in nm.all_hosts():
        print(f"Host: {host}")
        for port in nm[host]['tcp']:
            state = nm[host]['tcp'][port]['state']
            print(f"Port {port}: {state}")

# Usage
scan_ports('192.168.1.1', '1-1000')
```

### Socket Programming
```python
import socket

def port_scanner(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False
```

## 2. Web Application Testing

### Requests Library
```python
import requests
from requests.auth import HTTPBasicAuth

def test_authentication(url, username, password):
    try:
        response = requests.get(
            url, 
            auth=HTTPBasicAuth(username, password),
            timeout=10
        )
        return response.status_code == 200
    except:
        return False
```

### SQL Injection Testing
```python
import requests

def test_sql_injection(url, payloads):
    for payload in payloads:
        response = requests.get(f"{url}?id={payload}")
        if "error" in response.text.lower():
            return True
    return False
```

## 3. Password Security

### Hash Cracking
```python
import hashlib
import itertools
import string

def brute_force_hash(target_hash, max_length=4):
    chars = string.ascii_lowercase + string.digits
    
    for length in range(1, max_length + 1):
        for combo in itertools.product(chars, repeat=length):
            password = ''.join(combo)
            if hashlib.md5(password.encode()).hexdigest() == target_hash:
                return password
    return None
```

## 4. File System Security

### Directory Traversal Detection
```python
import os

def check_directory_traversal(path):
    dangerous_patterns = ['../', '..\\', '/etc/passwd', 'C:\\Windows\\System32']
    
    for pattern in dangerous_patterns:
        if pattern in path:
            return True
    return False
```

## 5. Cryptography

### Encryption/Decryption
```python
from cryptography.fernet import Fernet

def encrypt_data(data, key):
    f = Fernet(key)
    return f.encrypt(data.encode())

def decrypt_data(encrypted_data, key):
    f = Fernet(key)
    return f.decrypt(encrypted_data).decode()
```

## Security Best Practices

1. **Input Validation**: Always validate and sanitize inputs
2. **Error Handling**: Don't expose sensitive information in errors
3. **Logging**: Implement proper logging for security events
4. **Dependencies**: Keep security libraries updated
5. **Testing**: Regular security testing and code reviews

## Conclusion

Python provides excellent tools for security testing. Always use these tools responsibly and with proper authorization.
