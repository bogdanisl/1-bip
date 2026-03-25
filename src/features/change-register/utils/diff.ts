// ---------------------------------------------------------------------------
// Shared LCS engine
// ---------------------------------------------------------------------------

function lcs<T>(a: T[], b: T[], eq: (x: T, y: T) => boolean): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = eq(a[i - 1], b[j - 1])
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

type DiffOp = 'equal' | 'insert' | 'delete';
interface DiffToken {
  op: DiffOp;
  value: string;
}

function backtrack(
  dp: number[][],
  a: string[],
  b: string[],
  i: number,
  j: number,
  result: DiffToken[],
) {
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) {
      result.unshift({ op: 'equal', value: b[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.unshift({ op: 'insert', value: b[j - 1] });
      j--;
    } else {
      result.unshift({ op: 'delete', value: a[i - 1] });
      i--;
    }
  }
}

// ---------------------------------------------------------------------------
// Plain-text word diff (for title / subtitle)
// Returns an array of tokens with op labels so the UI can style them.
// ---------------------------------------------------------------------------

export interface TextDiffToken {
  op: DiffOp;
  value: string;
}

export function diffWords(oldText: string, newText: string): TextDiffToken[] {
  // Split on whitespace, keeping separators so we can re-join
  const splitWords = (s: string) => s.split(/(\s+)/);
  const a = splitWords(oldText);
  const b = splitWords(newText);

  if (a.length > 500 || b.length > 500) {
    // Fallback – too large, just show new text as-is
    return [{ op: 'equal', value: newText }];
  }

  const dp = lcs(a, b, (x, y) => x === y);
  const result: DiffToken[] = [];
  backtrack(dp, a, b, a.length, b.length, result);
  return result;
}

// ---------------------------------------------------------------------------
// HTML token diff (for article content)
// Injects <span> wrappers with inline styles into the HTML string.
// ---------------------------------------------------------------------------

function tokenizeHtml(html: string): string[] {
  const tokens: string[] = [];
  const regex = /(<[^>]*>|[^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(html)) !== null) {
    const s = m[0];
    if (s.startsWith('<')) {
      tokens.push(s);
    } else {
      for (const w of s.split(/(\s+)/)) {
        if (w) tokens.push(w);
      }
    }
  }
  return tokens;
}

export function diffHtml(oldHtml: string, newHtml: string): string {
  const a = tokenizeHtml(oldHtml);
  const b = tokenizeHtml(newHtml);

  if (a.length > 2000 || b.length > 2000) return newHtml;

  const dp = lcs(a, b, (x, y) => x === y);
  const result: string[] = [];
  backtrack(dp, a, b, a.length, b.length, result as any);

  // result is actually DiffToken[] from backtrack cast — redo cleanly
  const tokens: DiffToken[] = [];
  backtrack(dp, a, b, a.length, b.length, tokens);

  return tokens
    .map(({ op, value }) => {
      if (op === 'equal') return value;
      if (op === 'insert') {
        return `<span style="background-color:#dcfce7;color:#166534;">${value}</span>`;
      }
      // delete
      return `<span style="background-color:#fee2e2;color:#991b1b;text-decoration:line-through;">${value}</span>`;
    })
    .join('');
}