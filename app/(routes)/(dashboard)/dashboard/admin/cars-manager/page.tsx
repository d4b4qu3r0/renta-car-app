import { auth } from "@clerk/nextjs/server";
import { ButtonAddCar } from "./components/ButtonAddCar";
import { ListCars } from "./components/ListCars";
import {db} from "@/lib/db"
import { isAdministrator } from "@/lib/isAdministrator";

export default async function CarManagerPage() {
  const { userId } = await auth();
  if (!userId || !isAdministrator(userId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const car = await db.car.findMany({
    where: {
        userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // console.log(car)

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Administrar autos</h2>
        <ButtonAddCar />
      </div>
      <ListCars cars={car}/>
    </div>
  );
}
