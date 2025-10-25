// Only import these on server-side
let fs: any, path: any, matter: any;

if (typeof window === 'undefined') {
  // Server-side only
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readTime: string;
  author: string;
  featured: boolean;
  content: string;
  excerpt: string;
}

// SSG: Read from markdown files (server-side only)
const postsDirectory = typeof window === 'undefined' 
  ? path.join(process.cwd(), 'src/data/blog-posts')
  : '';

// Mock data fallback for client-side rendering
const mockPosts: BlogPost[] = [
  {
    id: 'understanding-xss-vulnerabilities',
    title: 'Understanding XSS Vulnerabilities in Modern Web Applications',
    date: '2024-01-15',
    category: 'Security',
    tags: ['XSS', 'Security', 'Web Development'],
    readTime: '8 min read',
    author: 'Santhos Suntharalingam',
    featured: true,
    content: `# Understanding XSS Vulnerabilities in Modern Web Applications

Cross-Site Scripting (XSS) is one of the most common and dangerous web vulnerabilities. In this comprehensive guide, we'll explore the different types of XSS attacks and how to prevent them.

## What is XSS?

XSS occurs when an application takes untrusted data and sends it to a web browser without proper validation or escaping. This allows attackers to execute malicious scripts in the victim's browser.

## Types of XSS Attacks

### 1. Reflected XSS
Reflected XSS occurs when user input is immediately returned by a web application in an error message, search result, or any other response that includes some or all of the input provided by the user.

### 2. Stored XSS
Stored XSS occurs when user input is stored on the target server, such as in a database, message forum, visitor log, comment field, etc.

### 3. DOM-based XSS
DOM-based XSS occurs when the vulnerability exists in client-side code rather than server-side code.

## Prevention Strategies

### Input Validation
- Validate all input on the server side
- Use whitelist validation where possible
- Implement proper encoding

### Output Encoding
- Encode data before sending it to the browser
- Use context-appropriate encoding
- Implement Content Security Policy (CSP)

## Best Practices

1. **Use Framework Protection**: Modern frameworks like React, Angular, and Vue.js provide built-in XSS protection
2. **Implement CSP**: Content Security Policy helps prevent XSS attacks
3. **Regular Security Testing**: Conduct regular security assessments
4. **Keep Dependencies Updated**: Ensure all libraries and frameworks are up to date

## Code Example

\`\`\`javascript
// Bad: Directly inserting user input
document.getElementById('output').innerHTML = userInput;

// Good: Using textContent or proper escaping
document.getElementById('output').textContent = userInput;
\`\`\`

## Conclusion

XSS vulnerabilities can be devastating, but with proper understanding and implementation of security measures, they can be effectively prevented. Always validate and sanitize user input, use appropriate output encoding, and implement security headers like CSP.`,
    excerpt: 'A comprehensive guide to Cross-Site Scripting (XSS) vulnerabilities, their types, and how to prevent them in modern web applications.'
  },
  {
    id: 'react-performance-optimization',
    title: 'React Performance Optimization Techniques',
    date: '2024-01-10',
    category: 'Programming',
    tags: ['React', 'Performance', 'JavaScript'],
    readTime: '12 min read',
    author: 'Santhos Suntharalingam',
    featured: false,
    content: `# React Performance Optimization Techniques

React is a powerful library, but without proper optimization, applications can become slow and unresponsive. Here are the essential techniques to optimize your React applications.

## 1. Code Splitting

Code splitting allows you to split your code into smaller chunks that can be loaded on demand.

\`\`\`javascript
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

## 2. Memoization

Use React.memo, useMemo, and useCallback to prevent unnecessary re-renders.

\`\`\`javascript
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return data.map(item => item.value * 2);
  }, [data]);

  return <div>{processedData}</div>;
});
\`\`\`

## 3. Virtual Scrolling

For large lists, implement virtual scrolling to render only visible items.

## 4. Bundle Analysis

Use tools like webpack-bundle-analyzer to identify large dependencies.

## 5. Image Optimization

Optimize images and use lazy loading for better performance.

\`\`\`javascript
const OptimizedImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    style={{ width: '100%', height: 'auto' }}
  />
);
\`\`\`

## Conclusion

These techniques will significantly improve your React application's performance. Remember to measure before and after implementing optimizations to ensure they're effective.`,
    excerpt: 'Learn advanced techniques to optimize React applications for better performance and user experience.'
  },
  {
    id: 'linux-security-best-practices',
    title: 'Linux Security Best Practices for Developers',
    date: '2024-01-05',
    category: 'Security',
    tags: ['Linux', 'Security', 'DevOps'],
    readTime: '10 min read',
    author: 'Santhos Suntharalingam',
    featured: true,
    content: `# Linux Security Best Practices for Developers

Essential security practices every developer should know when working with Linux systems.

## 1. User Management

### Create Non-Root Users
Always create and use non-root users for daily tasks.

\`\`\`bash
# Create a new user
sudo useradd -m -s /bin/bash username
sudo passwd username

# Add user to sudo group
sudo usermod -aG sudo username
\`\`\`

### Disable Root Login
Disable direct root login via SSH.

\`\`\`bash
# Edit SSH config
sudo nano /etc/ssh/sshd_config

# Set PermitRootLogin no
PermitRootLogin no

# Restart SSH service
sudo systemctl restart ssh
\`\`\`

## 2. Firewall Configuration

### UFW (Uncomplicated Firewall)
\`\`\`bash
# Enable UFW
sudo ufw enable

# Allow SSH
sudo ufw allow ssh

# Allow specific ports
sudo ufw allow 80
sudo ufw allow 443

# Check status
sudo ufw status
\`\`\`

## 3. System Updates

Keep your system updated regularly.

\`\`\`bash
# Update package lists
sudo apt update

# Upgrade packages
sudo apt upgrade

# Remove unnecessary packages
sudo apt autoremove
\`\`\`

## 4. File Permissions

Set proper file permissions for sensitive files.

\`\`\`bash
# Secure SSH keys
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub

# Secure configuration files
chmod 600 /etc/ssh/sshd_config
\`\`\`

## 5. Log Monitoring

Monitor system logs for suspicious activity.

\`\`\`bash
# View authentication logs
sudo tail -f /var/log/auth.log

# View system logs
sudo journalctl -f
\`\`\`

## Conclusion

Implementing these security practices will significantly improve your Linux system's security posture. Regular maintenance and monitoring are key to maintaining a secure environment.`,
    excerpt: 'Essential security practices every developer should know when working with Linux systems.'
  },
  {
    id: 'nextjs-vs-vite-comparison',
    title: 'Next.js vs Vite: A Comprehensive Comparison',
    date: '2024-01-01',
    category: 'Programming',
    tags: ['Next.js', 'Vite', 'React', 'Comparison'],
    readTime: '15 min read',
    author: 'Santhos Suntharalingam',
    featured: false,
    content: `# Next.js vs Vite: A Comprehensive Comparison

Comparing Next.js and Vite for modern React development, including performance, features, and use cases.

## What is Next.js?

Next.js is a React framework that provides server-side rendering, static site generation, and other production-ready features out of the box.

## What is Vite?

Vite is a build tool and development server that focuses on speed and simplicity, using native ES modules for development.

## Performance Comparison

### Development Server
- **Vite**: Extremely fast due to native ES modules
- **Next.js**: Fast with Fast Refresh, but slower than Vite

### Build Time
- **Vite**: Very fast builds with Rollup
- **Next.js**: Optimized builds with Webpack

### Bundle Size
- **Vite**: Smaller bundles with tree-shaking
- **Next.js**: Larger bundles due to framework features

## Feature Comparison

| Feature | Next.js | Vite |
|---------|---------|------|
| SSR | ✅ Built-in | ❌ Manual setup |
| SSG | ✅ Built-in | ❌ Manual setup |
| API Routes | ✅ Built-in | ❌ Not included |
| Image Optimization | ✅ Built-in | ❌ Manual setup |
| Development Speed | ⚡ Fast | ⚡⚡ Very Fast |
| Learning Curve | 📚 Moderate | 📚 Easy |

## When to Use Next.js

- Building full-stack applications
- Need SSR/SSG capabilities
- Want built-in optimizations
- Building production-ready apps

## When to Use Vite

- Building SPAs (Single Page Applications)
- Need maximum development speed
- Want minimal configuration
- Building libraries or tools

## Code Examples

### Next.js API Route
\`\`\`javascript
// pages/api/users.js
export default function handler(req, res) {
  res.status(200).json({ users: [] });
}
\`\`\`

### Vite Configuration
\`\`\`javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
\`\`\`

## Conclusion

Choose Next.js for full-stack applications with SSR/SSG needs, and Vite for fast development of SPAs and libraries.`,
    excerpt: 'Comparing Next.js and Vite for modern React development, including performance, features, and use cases.'
  },
  {
    id: 'python-security-tools',
    title: 'Python Security Tools for Penetration Testing',
    date: '2023-12-28',
    category: 'Security',
    tags: ['Python', 'Security', 'Penetration Testing'],
    readTime: '20 min read',
    author: 'Santhos Suntharalingam',
    featured: false,
    content: `# Python Security Tools for Penetration Testing

A collection of powerful Python tools and libraries for security testing and penetration testing.

## 1. Network Scanning

### Nmap Python Integration
\`\`\`python
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
\`\`\`

### Socket Programming
\`\`\`python
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
\`\`\`

## 2. Web Application Testing

### Requests Library
\`\`\`python
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
\`\`\`

### SQL Injection Testing
\`\`\`python
import requests

def test_sql_injection(url, payloads):
    for payload in payloads:
        response = requests.get(f"{url}?id={payload}")
        if "error" in response.text.lower():
            return True
    return False
\`\`\`

## 3. Password Security

### Hash Cracking
\`\`\`python
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
\`\`\`

## 4. File System Security

### Directory Traversal Detection
\`\`\`python
import os

def check_directory_traversal(path):
    dangerous_patterns = ['../', '..\\', '/etc/passwd', 'C:\\\\Windows\\\\System32']
    
    for pattern in dangerous_patterns:
        if pattern in path:
            return True
    return False
\`\`\`

## 5. Cryptography

### Encryption/Decryption
\`\`\`python
from cryptography.fernet import Fernet

def encrypt_data(data, key):
    f = Fernet(key)
    return f.encrypt(data.encode())

def decrypt_data(encrypted_data, key):
    f = Fernet(key)
    return f.decrypt(encrypted_data).decode()
\`\`\`

## Security Best Practices

1. **Input Validation**: Always validate and sanitize inputs
2. **Error Handling**: Don't expose sensitive information in errors
3. **Logging**: Implement proper logging for security events
4. **Dependencies**: Keep security libraries updated
5. **Testing**: Regular security testing and code reviews

## Conclusion

Python provides excellent tools for security testing. Always use these tools responsibly and with proper authorization.`,
    excerpt: 'A collection of powerful Python tools and libraries for security testing and penetration testing.'
  }
];

export function getAllPostIds(): string[] {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown files
    try {
      if (!fs || !path) {
        console.warn('Server-side modules not available, using mock data');
        return mockPosts.map(post => post.id);
      }
      
      const fileNames = fs.readdirSync(postsDirectory);
      return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
    } catch (error) {
      console.error('Error reading post IDs:', error);
      return mockPosts.map(post => post.id);
    }
  }
  
  // Client-side: Use mock data
  return mockPosts.map(post => post.id);
}

export function getPostData(id: string): BlogPost | null {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown file
    try {
      if (!fs || !path || !matter) {
        console.warn('Server-side modules not available, using mock data');
        return mockPosts.find(post => post.id === id) || null;
      }
      
      const fullPath = path.join(postsDirectory, `${id}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id,
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags,
        readTime: data.readTime,
        author: data.author,
        featured: data.featured,
        content,
        excerpt: data.excerpt
      };
    } catch (error) {
      console.error('Error reading post:', error);
      return mockPosts.find(post => post.id === id) || null;
    }
  }
  
  // Client-side: Use mock data
  return mockPosts.find(post => post.id === id) || null;
}

// SSG: Cache posts data to avoid multiple file system reads
let cachedSortedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    // Server-side: Read from markdown files
    try {
      if (!fs || !path || !matter) {
        console.warn('Server-side modules not available, using mock data');
        return mockPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      }
      
      const fileNames = fs.readdirSync(postsDirectory);
      const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          id,
          title: data.title,
          date: data.date,
          category: data.category,
          tags: data.tags,
          readTime: data.readTime,
          author: data.author,
          featured: data.featured,
          content,
          excerpt: data.excerpt
        };
      });
      
      return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error reading posts:', error);
      return mockPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }
  
  // Client-side: Use cached mock data
  if (cachedSortedPosts === null) {
    cachedSortedPosts = [...mockPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
  
  return cachedSortedPosts;
}

export function getFeaturedPosts(): BlogPost[] {
  if (typeof window === 'undefined') {
    return [];
  }
  return getAllPosts().filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (typeof window === 'undefined') {
    return [];
  }
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  if (typeof window === 'undefined') {
    return [];
  }
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getTopPosts(limit: number = 5): BlogPost[] {
  if (typeof window === 'undefined') {
    return [];
  }
  return getAllPosts().slice(0, limit);
}
