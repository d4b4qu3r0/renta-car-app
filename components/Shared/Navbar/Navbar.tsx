"use client";
import { Button } from "@/components/ui/button";
import { useLovedCars } from "@/hooks/use-loved-cars";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Heart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const { userId } = useAuth();
  const { lovedItems } = useLovedCars();

  return (
    <div className="max-w-5xl py-5 mx-auto">
      <div className="justify-between lg:flex">
        <Link href="/" className="flex items-center justify-center gap-x-2">
          <Image src="/logo.svg" alt="Renta Car" width={50} height={50} />
          <span className="text-xl font-bold">Renta Car</span>
        </Link>

        <div className="flex items-center justify-center gap-x-7">
          <Link href="/cars">Lista de Carros</Link>
          <Link href="/dashboard">Dashboard</Link>
          {userId ? (
            <>
              <Link href="/loved-cars">
                <Heart
                  strokeWidth={1}
                  className={`cursor-pointer ${
                    lovedItems.length > 0 && "fill-black"
                  }`}
                />
              </Link>
              <UserButton />
            </>
          ) : (
            <Link href="/sign-in" className="flex gap-x-3">
              <Button>
                Iniciar sesión
                <User className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}