'use client';

import { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  children: string;
  language?: string;
  showCopy?: boolean;
}

export default function CodeBlock({ children, language = 'text', showCopy = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(children, {
          lang: language,
          theme: 'github-light',
        });
        setHighlightedCode(html);
      } catch (error) {
        console.error('Syntax highlighting error:', error);
        // Fallback to plain code
        setHighlightedCode(`<pre class="font-mono text-sm"><code>${children}</code></pre>`);
      }
    };

    highlightCode();
  }, [children, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {language && (
        <div className="flex items-center justify-between bg-muted/70 px-4 py-2 rounded-t-xl border-b border-border">
          <span className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{language}</span>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div
        className={`code-block ${language ? 'rounded-t-none' : 'rounded-xl'} relative overflow-x-auto bg-card border border-t-0 border-border rounded-b-xl shadow-sm`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
