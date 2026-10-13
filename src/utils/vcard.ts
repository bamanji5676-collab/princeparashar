import { PROFILE_DATA } from '../data/profileData';
import { ExecutiveProfile } from '../types/profile';

/**
 * Generates an RFC-compliant vCard 3.0 string for Prince Parashar
 */
export function generateVCardString(customProfile?: ExecutiveProfile): string {
  const profile = customProfile || PROFILE_DATA;
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  // Format name for N field (Last;First)
  const nameParts = profile.name.trim().split(' ');
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : profile.name;

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${lastName};${firstName};;;`,
    `FN:${profile.name}`,
    `ORG:${profile.company};Finance & Strategy`,
    `TITLE:${profile.designation}`,
    `EMAIL;type=INTERNET;type=WORK;type=pref:${profile.verifiedEmail}`,
    `EMAIL;type=INTERNET;type=WORK:${profile.secondaryEmail}`,
    `TEL;type=CELL;type=VOICE;type=pref:${profile.phone}`,
    `URL;type=WORK:${profile.website}`,
    `URL;type=LINKEDIN:${profile.linkedInUrl}`,
    `URL;type=TWITTER:${profile.twitterUrl}`,
    `ADR;type=WORK:;;TapMate Technologies;${profile.location};;;India`,
    `NOTE:${profile.designation} at ${profile.company} | "${profile.tagline}" | Digital Executive Identity 2035`,
    `REV:${timestamp}`,
    'END:VCARD',
  ].join('\r\n');
}

/**
 * Initiates the download of the .vcf contact file
 */
export function downloadVCard(customProfile?: ExecutiveProfile): void {
  const profile = customProfile || PROFILE_DATA;
  const vcardText = generateVCardString(profile);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const sanitizedName = profile.name.replace(/\s+/g, '_');
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${sanitizedName}_TapMate_CFO.vcf`);
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
}
