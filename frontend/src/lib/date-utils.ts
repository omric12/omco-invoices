'use client';

import { format, parse } from 'date-fns';

// Format a date string to DD/MM/YY
export function formatToDisplayDate(dateString: string): string {
  try {
    // First parse the ISO date string
    const date = new Date(dateString);
    return format(date, 'dd/MM/yy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString; // Return original string if parsing fails
  }
}

// Parse a DD/MM/YY string to ISO date string
export function parseDisplayDate(dateString: string): string {
  try {
    const parsedDate = parse(dateString, 'dd/MM/yy', new Date());
    return parsedDate.toISOString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString; // Return original string if parsing fails
  }
}
