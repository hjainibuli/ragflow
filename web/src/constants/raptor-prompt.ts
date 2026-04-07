/**
 * Detects the default RAPTOR summary prompt returned by the backend for
 * `naive` / General chunking (`api/utils/api_utils.py` → `get_parser_config`).
 * When unchanged, the UI should show the locale-specific copy from i18n instead.
 */
export function isBackendDefaultRaptorPrompt(prompt: unknown): boolean {
  if (typeof prompt !== 'string' || !prompt.trim()) {
    return false;
  }
  const compact = prompt.replace(/\s+/g, ' ').trim();
  return (
    compact.includes('Please summarize the following paragraphs') &&
    compact.includes('{cluster_content}') &&
    compact.includes('Be careful with the numbers')
  );
}
