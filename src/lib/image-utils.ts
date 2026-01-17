/**
 * Utility functions for handling images, especially Google Drive links
 */

/**
 * Converts a Google Drive sharing link to a direct image URL
 * 
 * Supported formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * @param url - The Google Drive URL or any image URL
 * @returns Direct image URL that can be used in <img> or Next.js Image component
 */
export function getImageUrl(url: string | null | undefined): string {
  // Return placeholder if no URL provided
  if (!url || url.trim() === '') {
    return '/placeholder-image.jpg'
  }

  // If it's already a local path, return as-is
  if (url.startsWith('/')) {
    return url
  }

  // If it's already a direct googleusercontent link, return as-is
  if (url.includes('googleusercontent.com')) {
    return url
  }

  // Extract file ID from various Google Drive URL formats
  let fileId: string | null = null

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) {
    fileId = fileMatch[1]
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (!fileId && openMatch) {
    fileId = openMatch[1]
  }

  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/)
  if (!fileId && ucMatch) {
    fileId = ucMatch[1]
  }

  // If we found a Google Drive file ID, convert to direct link
  if (fileId) {
    // Using lh3.googleusercontent.com for better compatibility with Next.js Image
    return `https://lh3.googleusercontent.com/d/${fileId}`
  }

  // If it's any other URL (like direct image links), return as-is
  return url
}

/**
 * Check if a URL is a Google Drive link
 */
export function isGoogleDriveUrl(url: string): boolean {
  return url.includes('drive.google.com')
}

/**
 * Get the Google Drive file ID from a URL
 */
export function getGoogleDriveFileId(url: string): string | null {
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (fileMatch) return fileMatch[1]

  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (openMatch) return openMatch[1]

  const ucMatch = url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) return ucMatch[1]

  return null
}
