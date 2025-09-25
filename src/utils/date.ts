import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

/**
 * Format a Unix timestamp (seconds) into a human-readable string
 * @param timestamp Unix timestamp (in seconds)
 * @param format dayjs format string (default: "MMM D, YYYY h:mm A")
 */
export function formatDate(timestamp?: number, format = 'MMM D, YYYY') {
  if (!timestamp) return 'N/A'
  return dayjs.unix(timestamp).format(format)
}
/**
 * Show relative time (e.g., "3 days ago", "in 2 years")
 * @param timestamp Unix timestamp (in seconds)
 */

export function timeAgo(timestamp?: number) {
  if (!timestamp) return 'N/A'
  return dayjs.unix(timestamp).fromNow()
}
