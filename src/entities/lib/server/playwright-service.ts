import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { randomUUID } from 'crypto';
import path from 'path';
import fs from 'fs/promises';

interface Session {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  startTime: number;
}

export class PlaywrightService {
  private sessions: Map<string, Session> = new Map();

  async startRecording(
    url: string,
  ): Promise<{ sessionId: string; message: string }> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);

    const sessionId = randomUUID();
    this.sessions.set(sessionId, {
      browser,
      context,
      page,
      startTime: Date.now(),
    });

    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });

    return { sessionId, message: 'Recording started' };
  }

  async stopRecording(
    sessionId: string,
  ): Promise<{ message: string; filePath: string }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const { browser, context, page, startTime } = session;

    // Stop tracing
    const tracePath = path.join(
      process.cwd(),
      'recordings',
      `${sessionId}.zip`,
    );
    await context.tracing.stop({ path: tracePath });

    // Generate a script using codegen
    const scriptPath = path.join(
      process.cwd(),
      'recordings',
      `${sessionId}.js`,
    );
    const events = await context.tracing.export();
    const script = this.generateScript(events);
    await fs.writeFile(scriptPath, script);

    await page.close();
    await context.close();
    await browser.close();

    this.sessions.delete(sessionId);

    return { message: 'Recording stopped', filePath: scriptPath };
  }

  async getRecordingStatus(
    sessionId: string,
  ): Promise<{ status: string; duration: number }> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    const duration = Math.round((Date.now() - session.startTime) / 1000);
    return { status: 'recording', duration };
  }

  private generateScript(events: any[]): string {
    // This is a simplified example. In a real implementation,
    // you would parse the events and generate a proper script.
    let script = `const { chromium } = require('playwright');\n\n`;
    script += `(async () => {\n`;
    script += `  const browser = await chromium.launch();\n`;
    script += `  const page = await browser.newPage();\n`;

    // Add actions based on events
    events.forEach(event => {
      if (event.type === 'click') {
        script += `  await page.click('${event.selector}');\n`;
      } else if (event.type === 'navigate') {
        script += `  await page.goto('${event.url}');\n`;
      }
      // Add more event types as needed
    });

    script += `  await browser.close();\n`;
    script += `})();\n`;

    return script;
  }
}
