import Image from 'next/image';
import Link from 'next/link';

export function EtnLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="etnLogoLink" aria-label="ETN News home">
      <span className="etnRealLogo">
        <Image
          src="/etn_icon.png"
          alt="ETN News"
          width={compact ? 64 : 96}
          height={compact ? 64 : 96}
          priority
          className="etnRealLogoImage"
        />
      </span>
    </Link>
  );
}