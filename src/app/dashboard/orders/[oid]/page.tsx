import Nav from "@/components/nav/nav";
import AddressDetails from "@/components/order-details/address-details";
import CustomerDetails from "@/components/order-details/customer-details";
import InvoiceCard from "@/components/order-details/invoice-card";
import OrderStatus from "@/components/order-details/order-status";
import PaymentDetails from "@/components/order-details/payment-details";
import ProductDetails from "@/components/order-details/product-details";
import { getOrderServer } from "@/lib/api/orders/get-order";
import { formateDate } from "@/lib/utils";
import { notFound } from "next/navigation";

const OrderDetails = async ({ params }: { params: { oid: string } }) => {
  const { order } = await getOrderServer(params.oid).catch((_) => notFound());
  if (!order) notFound();

  return (
    <Nav>
      <div className="@container">
        <div className="grid grid-cols-1 gap-2 @xl:grid-cols-3">
          <div className="col-span-2">
            <InvoiceCard oid={params.oid} />
            <ProductDetails data={order} />
            <OrderStatus
              oid={order.id}
              status={order.status}
              payment_verified={order.payment_verified}
              orderDate={formateDate(order.orderDate)}
              packedDate={
                order.packedDate ? formateDate(order.packedDate) : null
              }
              deliveredDate={
                order.deliveredDate ? formateDate(order.deliveredDate) : null
              }
            />
          </div>
          <div>
            <CustomerDetails data={order.User} />
            <AddressDetails data={order.Address} />
            <PaymentDetails data={order.Payment} />
          </div>
        </div>
      </div>
    </Nav>
  );
};

export default OrderDetails;
