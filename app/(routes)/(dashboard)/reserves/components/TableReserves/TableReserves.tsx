"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableReservesProps } from "./TableReserves.types";
import { formatPrice } from "@/lib/formatPrice";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function TableReserves(props: TableReservesProps) {
  const { orders } = props;
  const router = useRouter();
  const { toast } = useToast();

  const totalAmount = orders.reduce((acc, booking) => {
    return acc + parseFloat(booking.totalAmount);
  }, 0);

  const deleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`/api/order/${orderId}`);
      toast({
        title: "Reserva cancelada exitosamente",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      toast({
        title: "Error al cancelar la reserva",
        description: "Por favor intente nuevamente",
        variant: "destructive",
      });
    }
  };

  return (
    <Table>
      <TableCaption>Lista de sus reservas recientes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Carro</TableHead>
          <TableHead>Fecha de inicio</TableHead>
          <TableHead>Fecha fin</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Cancelar</TableHead>
          <TableHead className="text-right">Precio</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.carName}</TableCell>
            <TableCell>
              {new Date(order.orderDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {new Date(order.orderEndDate).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="p-2 text-white bg-green-600 rounded-lg w-fit">
                {order.status}
              </div>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => deleteOrder(order.id)}
                className="p-2 text-white bg-red-600 rounded-lg w-fit hover:bg-red-700 transition-colors"
              >
                Cancelar Reserva
              </Button>
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(Number(order.totalAmount))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">
            {formatPrice(totalAmount)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
