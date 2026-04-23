"use server";

export async function scanUrl(url: string) {
  if (!url) return null;

  try {
    const isHttps = url.toLowerCase().startsWith("https://");
    
    // SSRF Prevention & Localhost Block
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname.toLowerCase();
      
      const isLocal = ['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(hostname);
      const isPrivate = hostname.startsWith('192.168.') || 
                        hostname.startsWith('10.') || 
                        hostname.startsWith('172.16.') || // 172.16.x.x - 172.31.x.x simplified
                        hostname.endsWith('.local');

      if (isLocal || isPrivate) {
        return {
          isHttps: isHttps,
          hasHsts: false,
          hasCsp: false,
          hasXFrame: false,
          hasXContentType: false,
          riskLevel: 'high',
          details: "Scanning of internal or local addresses is strictly prohibited for security reasons."
        };
      }
    } catch {
      throw new Error("Invalid URL provided for scanning.");
    }

    if (!isHttps) {

      return {
        isHttps: false,
        hasHsts: false,
        hasCsp: false,
        hasXFrame: false,
        hasXContentType: false,
        riskLevel: 'high',
        details: "HTTP is not allowed. HTTPS is compulsory for security."
      };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(url, { 
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'BusyLoss-Security-Scanner/1.0'
      }
    });

    clearTimeout(timeout);

    const headers = response.headers;
    const hasHsts = !!headers.get('Strict-Transport-Security');
    const hasCsp = !!headers.get('Content-Security-Policy');
    const hasXFrame = !!headers.get('X-Frame-Options');
    const hasXContentType = !!headers.get('X-Content-Type-Options');

    // Scoring logic
    let score = 0;
    if (hasHsts) score++;
    if (hasCsp) score++;
    if (hasXFrame) score++;
    if (hasXContentType) score++;

    let riskLevel: 'high' | 'middle' | 'no' = 'middle';
    if (score >= 3) riskLevel = 'no';
    else if (score <= 1) riskLevel = 'high';

    return {
      isHttps,
      hasHsts,
      hasCsp,
      hasXFrame,
      hasXContentType,
      riskLevel,
      details: score === 4 
        ? "Excellent security configuration detected." 
        : score >= 2 
          ? "Standard security headers found, but some are missing."
          : "Critical security headers are missing from this site."
    };

  } catch (error: any) {
    console.error("Scanning error:", error);
    return {
      isHttps: url.toLowerCase().startsWith("https://"),
      hasHsts: false,
      hasCsp: false,
      hasXFrame: false,
      hasXContentType: false,
      riskLevel: 'high',
      details: "Could not reach the server. Please check the URL or try again later."
    };
  }
}
