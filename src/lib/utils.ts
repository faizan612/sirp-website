import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-US').format(n)
}

export function staggerDelay(index: number, base = 0.1): string {
  return `${index * base}s`
}

export function glueLastWords(text: string): string {
  return text.replace(/\s+(\S+)$/, ' $1')
}
