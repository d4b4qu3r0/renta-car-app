import Image from "next/image";
import Link from "next/link";

export function LogoDashboard() {
  return (
    <Link href="/" className="flex items-center h-20 gap-2 border-b cursor-pointer min--20 px-6">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} priority/>
        <h1 className="text-xl font-bold">Renta Car</h1>
    </Link>
  )
}
